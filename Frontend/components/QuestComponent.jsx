import { useContext, useState } from "react";
import { Context } from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";

const QuestComponent = ({ title, description, landmark, reward, questId, onComplete }) => {
    const { backendUrl, groupId } = useContext(Context);
    const [completed, setCompleted] = useState(false);

    const handleCompleteQuest = async () => {
        if (!groupId) {
            toast.error("You must be in a group to complete quests!");
            return;
        }

        // Ensure reward is a valid number
        const xpAmount = Number(reward);
        if (isNaN(xpAmount) || xpAmount <= 0) {
            toast.error("Invalid XP reward!");
            return;
        }

        try {
            const response = await axios.post(`${backendUrl}/api/user/updateXP`, {
                group_id: groupId,
                xp: xpAmount
            });

            if (response.data.success) {
                toast.success(`XP increased by ${xpAmount} for all users!`);
                setCompleted(true);

                if (onComplete) {
                    onComplete(questId);
                }
            } else {
                toast.error(response.data.error || "Failed to update XP.");
            }
        } catch (error) {
            console.error("Error updating XP:", error);
            toast.error("Failed to update XP.");
        }
    };

    return (
      <div className="bg-[#002d04] p-6 rounded-2xl w-full h-[25vh] mt-4 flex flex-col">
        <div className="bg-[#65825c] py-3 px-4 rounded-md flex flex-col gap-2">
          <p className="font-['Bebas_Neue'] text-white text-2xl font-bold">{title}</p>
          <div className="flex items-center justify-center">
            <p className="font-['Bebas_Neue'] text-white text-lg">{landmark} </p>
            <p className="font-['Bebas_Neue'] text-white text-lg font-semibold">{reward}</p>
          </div>
        </div>
  
        <div className="bg-[#002d04] flex-1 w-full rounded-md mt-4">
            <p className="font-['Bebas_Neue'] text-white text-lg">{description}</p>
        </div>


            {/* Checkbox for completion */}
            <input
                type="checkbox"
                checked={completed}
                onChange={handleCompleteQuest}
                className="w-6 h-6 cursor-pointer accent-green-500"
                disabled={completed}
            />
      </div>
    );
};

export default QuestComponent;
