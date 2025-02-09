import { useContext, useState } from "react";
import { Context } from "../context/context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const GroupPopup = ({ setVisibility }) => {
    const { backendUrl, token, startLocation, endLocation, user2Email, setUser2Email, user3Email, setUser3Email, user4Email, setUser4Email, user5Email, setUser5Email, setGroupId } = useContext(Context);
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleGoClick = async () => {
        if (!startLocation || !endLocation) {
            toast.error("Start and End locations are required!");
            return;
        }

        setLoading(true);

        try {
            const users = [user2Email, user3Email, user4Email, user5Email].filter(email => email.trim() !== "");
            const response = await axios.post(`${backendUrl}/api/user/createGroup`, {
                token,
                start_location: startLocation,
                end_location: endLocation,
                users
            }, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.data.success) {
                toast.success("Group Created Successfully!");
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
                <p className="text-xl font-bold mb-4">Enter User Emails (Optional)</p>

                <input
                    type="email"
                    value={user2Email}
                    onChange={(e) => setUser2Email(e.target.value)}
                    placeholder="Enter User 2 Email"
                    className="w-full px-4 py-2 border rounded-md mb-4"
                />

                <input
                    type="email"
                    value={user3Email}
                    onChange={(e) => setUser3Email(e.target.value)}
                    placeholder="Enter User 3 Email"
                    className="w-full px-4 py-2 border rounded-md mb-4"
                />

                <input
                    type="email"
                    value={user4Email}
                    onChange={(e) => setUser4Email(e.target.value)}
                    placeholder="Enter User 4 Email"
                    className="w-full px-4 py-2 border rounded-md mb-4"
                />

                <input
                    type="email"
                    value={user5Email}
                    onChange={(e) => setUser5Email(e.target.value)}
                    placeholder="Enter User 5 Email"
                    className="w-full px-4 py-2 border rounded-md mb-4"
                />

                <div className="flex justify-between w-full">
                    <button
                        className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md"
                        onClick={() => setVisibility(false)}
                    >
                        Close
                    </button>

                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={handleGoClick}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Go!"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupPopup;
