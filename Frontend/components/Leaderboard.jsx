import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../context/context";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {backendUrl} = useContext(Context);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/leaderboard`);
        if (response.data.success) {
          setLeaderboardData(response.data.leaderboard);
        } else {
          console.error("Error fetching leaderboard:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="border-5 bg-[#d67c36] p-4 rounded-2xl h-[80vh] flex flex-col ml-[5%] mt-[2.5%] w-[40%]">
      <div className="h-[10%] w-full flex justify-center items-center">
        <p className="font-['Bebas_Neue'] text-white text-6xl">Leaderboard</p>
      </div>

      <div className="bg-white flex-1 w-full rounded-md mt-[2%] overflow-y-auto">
        {loading ? (
          <p className="text-center text-gray-500 text-xl mt-4">Loading...</p>
        ) : (
          <ul className="p-4">
            {leaderboardData.map((user, index) => (
              <li 
                key={index} 
                className="flex justify-between p-3 border-b border-gray-300 text-xl font-['Bebas_Neue'] text-gray-800"
              >
                <span className="text-[#222]">{index + 1}. {user.user_name}</span>
                <span className="text-blue-600">{user.total_xp} XP</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
