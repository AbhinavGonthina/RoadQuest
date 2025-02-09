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

  return (
    <div className="w-screen flex flex-row">
        <div className="flex flex-col w-[40%] ml-[5%] mr-[5%]">
            <div className="border border-5 font-['Bebas_Neue'] mt-[20%] px-2 py-1 bg-[#d67c36] rounded-lg cursor-pointer">
                <p
                className="text-white text-4xl"
                onClick={() => navigate("/Group")}>
                  Make/Edit Quest Group
                </p>
            </div>
            <div className="border border-5 font-['Bebas_Neue'] mt-[10%] px-2 py-1 bg-[#d67c36] rounded-lg cursor-pointer">
                <p
                className="text-white text-4xl"
                onClick={() => navigate("/RoadQuest")}>
                Start a RoadQuest
                </p>
            </div>
                <div className="bg-black mt-[6.5%] flex flex-row h-[50%] items-center">
                    <div className="bg-blue-500 rounded-lg h-[50%] w-[50%]">
                        <div className="text-white text-xl font-bold flex flex-col">
                            <p className="mt-[10%] mb-[5%] font-['Bebas_Neue']">First Last</p>
                        </div>
                        <div className="px-[1%] pb-[10%]">
                            <img className="rounded-full border-2 border-blue-500" src="https://upload.wikimedia.org/wikipedia/commons/2/21/Solid_black.svg" alt="profile picture" />
                        </div>
                    </div>
                        <div className="font-['Bebas_Neue'] rounded-lg ml-[10%] mr-[25%]">
                            <div className="font-['Bebas_Neue'] bg-[#d67c36] rounded-lg w-70">
                                <p
                                    className="text-white text-4xl">
                                    Username: 
                                </p>
                            </div>
                            <div className="font-['Bebas_Neue'] bg-[#d67c36] rounded-lg">
                                <p
                                    className="text-white text-4xl">
                                    Total Quests:
                                </p>
                            </div>
                            <div className="font-['Bebas_Neue'] bg-[#d67c36] rounded-lg">
                                <p
                                    className="text-white text-4xl">
                                    Total XP Earned:
                                </p>
                            </div>
                        </div>
                </div> 
            </div>       
        <Leaderboard />
    </div>
  )
}

export default Home

