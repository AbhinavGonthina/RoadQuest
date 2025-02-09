import { Link, useNavigate } from "react-router-dom";
import React from 'react'
import Leaderboard from "../components/Leaderboard";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Context } from "../context/context";

const Home = () => {
    const navigate = useNavigate();

    const [currentState, setCurrentState] = useState("unclicked");

  return (
    <div className="min-h-screen flex flex-row">
        <div className="min-h-screen flex flex-col w-[42%]">
            <div className="border border-8 font-['Holtwood_One_SC'] mt-[20%] px-2 py-1 bg-[#d67c36] rounded-lg cursor-pointer">
                <p
                className="text-white text-4xl"
                onClick={() => navigate("/Group")}>
                  Make/Edit Quest Group
                </p>
            </div>
            {currentState === "unclicked" ? (
                <div className="border border-8 font-['Holtwood_One_SC'] mt-[10%] px-2 py-1 bg-[#d67c36] rounded-lg cursor-pointer">
                    <p
                    className="text-white text-4xl"
                    onClick={() => setCurrentState("clicked")}>
                     Start/Continue a RoadQuest
                    </p>
                </div>
            ) : (
                <div className="border border-8 font-['Holtwood_One_SC'] mt-[10%] px-2 py-1 bg-[#d67c36] rounded-lg">
                    <p
                    className="text-white text-4xl"
                    onClick={() => setCurrentState("clicked")}>
                     Starting Location
                    </p>
                </div>
            )}
            
        </div>
        <Leaderboard />
    </div>
  )
}

export default Home

