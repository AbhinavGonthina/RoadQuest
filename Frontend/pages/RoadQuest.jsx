"use client";

import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
} from "@vis.gl/react-google-maps";
import QuestComponent from "../components/QuestComponent";
import InfiniteScroll from "react-infinite-scroll-component";

// Function to generate fake quests
const generateFakeQuests = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `Quest ${i + 1}`,
    description: `This is a description for Quest ${i + 1}.`,
    landmark: `Landmark ${i + 1}`,
    reward: `${Math.floor(Math.random() * 100)} Points`,
  }));
};

const RoadQuest = () => {
  const [quests, setQuests] = useState([]);
  const [displayedQuests, setDisplayedQuests] = useState([]);
  const [more, setMore] = useState(true);
  const [index, setIndex] = useState(5);

  useEffect(() => {
    const fakeQuests = generateFakeQuests(50);
    setQuests(fakeQuests);
    setDisplayedQuests(fakeQuests.slice(0, 5));
  }, []);

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

  const [zoom, setZoom] = useState(9);
  const [center, setCenter] = useState({ lat: 53.54, lng: 10 });

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
            <p className="bg-[#d67c36] text-white font-['Bebas_Neue'] underline underline-offset-6 font-bold text-4xl text-center">
              Quests
            </p>

            {/* Scrollable Quest List */}
            <div
              id="scrollableDiv"
              className="w-full flex flex-col overflow-y-auto gap-6 scrollbar-hide"
              style={{ maxHeight: "80vh" }} // Ensures proper scrolling space
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
                {displayedQuests.map((quest, index) => (
                  <div className="w-full flex justify-center" key={index}>
                    <QuestComponent
                      title={quest.name}
                      description={quest.description}
                      landmark={quest.landmark}
                      reward={quest.reward}
                    />
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

export default RoadQuest;