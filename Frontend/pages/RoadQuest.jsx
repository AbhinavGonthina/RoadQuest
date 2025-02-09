"use client";

import { useState, useEffect, useContext } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import QuestComponent from "../components/QuestComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Context } from "../context/context";
import { toast } from "react-toastify";

const RoadQuest = () => {
  const { backendUrl, startLocation, endLocation, groupId } = useContext(Context);
  const [quests, setQuests] = useState([]);
  const [displayedQuests, setDisplayedQuests] = useState([]);
  const [more, setMore] = useState(true);
  const [index, setIndex] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuests = async () => {
      if (!startLocation || !endLocation) {
        toast.error("Start and End locations are required!");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${backendUrl}/api/quests/generateFromRoute`,
          { start_location: startLocation, end_location: endLocation },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.success) {
          setQuests(response.data.quests);
          setDisplayedQuests(response.data.quests.slice(0, 5));
          setMore(response.data.quests.length > 5);
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        console.error("Error fetching quests:", error);
        toast.error("Failed to load quests.");
      }

      setLoading(false);
    };

    fetchQuests();
  }, [startLocation, endLocation]);

  const fetchMoreQuests = () => {
    if (index >= quests.length) {
      setMore(false);
      return;
    }

    const newQuests = quests.slice(index, index + 5);
    setDisplayedQuests((prev) => [...prev, ...newQuests]);
    setIndex(index + 5);

    if (index + 5 >= quests.length) {
      setMore(false);
    }
  };

  const handleQuestComplete = (questId) => {
    setDisplayedQuests((prev) => prev.filter((quest) => quest.id !== questId));
    setQuests((prev) => prev.filter((quest) => quest.id !== questId));
  };

  const [zoom, setZoom] = useState(9);
  const [center, setCenter] = useState({ lat: 42.3601, lng: -71.0589 });

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS}>
      <div className="flex h-[100vh] w-screen">
        {/* Left Side - Map */}
        <div className="w-1/2 h-full">
          <Map
            zoom={zoom}
            center={center}
            mapId={import.meta.env.VITE_MAP_ID}
            gestureHandling="greedy"
            disableDefaultUI={false}
            onZoomChanged={(event) => setZoom(event.detail.zoom)}
            onCenterChanged={(event) => setCenter(event.detail.center)}
          />
        </div>

        {/* Right Side - Quest List */}
        <div className="w-1/2 h-full bg-[#485444] flex items-center justify-center">
          <div className="bg-[#d67c36] w-[95%] h-[95%] rounded-2xl flex flex-col px-8 py-6">
            <p className="text-white font-['Bebas_Neue'] underline underline-offset-6 font-bold text-4xl text-center">
              Quests
            </p>

            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-white text-2xl font-['Bebas_Neue']">Loading Quests...</p>
              </div>
            ) : (
              <div
                id="scrollableDiv"
                className="w-full flex flex-col overflow-y-auto gap-6 scrollbar-hide"
                style={{ maxHeight: "80vh" }}
              >
                <InfiniteScroll
                  dataLength={displayedQuests.length}
                  next={fetchMoreQuests}
                  hasMore={more}
                  loader={<h4 className="text-center font-['Bebas_Neue']">Loading...</h4>}
                  endMessage={
                    <p className="text-center text-gray-600 mb-3 font-['Bebas_Neue']">
                      <b>No More Quests!</b>
                    </p>
                  }
                  scrollableTarget="scrollableDiv"
                >
                  {displayedQuests.map((quest) => (
                    <div className="w-full flex justify-center" key={quest.id}>
                      <QuestComponent
                        title={quest.name}
                        description={quest.description}
                        landmark={quest.landmark}
                        reward={quest.reward}
                        questId={quest.id}
                        onComplete={handleQuestComplete}
                      />
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            )}
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

export default RoadQuest;
