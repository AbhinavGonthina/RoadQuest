import { useContext, useState } from "react";
import { Context } from "../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LocationPopup = ({ setVisibility }) => {
    const { backendUrl, token, startLocation, setStartLocation, endLocation, setEndLocation, user2Email, user3Email, user4Email, user5Email, setGroupId} = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreateGroup = async () => {
        if (!startLocation || !endLocation) {
            toast.error("Start and End locations are required!");
            return;
        }

        setLoading(true);

        try {
            const users = [user2Email, user3Email, user4Email, user5Email].filter(email => email && email.trim() !== "");

            const response = await axios.post(`${backendUrl}/api/user/createGroup`, {
                token,
                start_location: startLocation,
                end_location: endLocation,
                users
            }, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.data.success) {
                toast.success("Group Created!");
                navigate("/RoadQuest");
                setGroupId(response.data.group_id)
                setVisibility(false);
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            console.error("Error creating group:", error);
            toast.error("Failed to create group.");
        }

        setLoading(false);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="bg-white w-[40%] p-6 rounded-lg flex flex-col items-center border-5">
                <p className="text-xl font-bold mb-4">Choose Your Trip Location</p>

                <input
                    type="text"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    placeholder="Enter Start Location"
                    className="w-full px-4 py-2 border rounded-md mb-4"
                />

                <input
                    type="text"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    placeholder="Enter End Location"
                    className="w-full px-4 py-2 border rounded-md mb-4"
                />

                <div className="flex flex-row justify-between w-full">
                    <button className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md" onClick={() => setVisibility(false)}>Close</button>

                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={handleCreateGroup}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Go!"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocationPopup;
