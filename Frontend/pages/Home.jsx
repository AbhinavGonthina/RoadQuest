import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Leaderboard from "../components/Leaderboard";
import ProfileCard from "../components/ProfileCard";
import LocationPopup from "../components/LocationPopup";
import GroupPopup from "../components/GroupPopup";
import RoadWhite from "../src/assets/road-white.png"
import RoadYellow from "../src/assets/road-yellow.png"

const Home = () => {
    const [groupVisibility, setGroupVisibility] = useState("False");
    const [locationVisibility, setLocationVisibility] = useState("False");
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen overflow-hidden flex flex-row">
            {locationVisibility === "True" && (
                <LocationPopup setVisibility={setLocationVisibility} />
            )}

            {groupVisibility === "True" && (
                <GroupPopup setVisibility={setGroupVisibility} />
            )}

            <div className="flex flex-col w-[40%] ml-[5%] mr-[5%]">
                <div
                    className="border-5 font-['Bebas_Neue'] mt-[20%] px-2 py-1 bg-[#d67c36] rounded-lg cursor-pointer"
                    onClick={() => setGroupVisibility("True")}
                >
                    <p className="text-white text-4xl text-center">
                        Make/Edit Quest Group
                    </p>
                </div>

                <div
                    className="border-5 font-['Bebas_Neue'] mt-[10%] px-2 py-1 bg-[#d67c36] rounded-lg cursor-pointer"
                    onClick={() => setLocationVisibility("True")}
                >
                    <p className="text-white text-4xl text-center">
                        Start a RoadQuest
                    </p>
                </div>
                <ProfileCard />
            </div>
            <Leaderboard />
        </div>
    );
};

export default Home;
