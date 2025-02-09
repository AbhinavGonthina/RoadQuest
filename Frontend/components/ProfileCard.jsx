import { useContext } from "react";
import { Context } from "../context/context";

const ProfileCard = () => {
    const { userDetails } = useContext(Context);

    return (
      <div className="w-full flex justify-center mt-[10%]">
        <div className="bg-[#d67c36] w-full rounded-lg p-6 border-5">
          
          <div className="text-white text-4xl font-['Bebas_Neue'] text-center">
            <p>{userDetails ? `${userDetails.first_name} ${userDetails.last_name}` : "Loading..."}</p>
          </div>
  
          <div className="flex justify-center my-3">
            <p className="px-4 py-1 bg-blue-500 text-white text-lg font-['Bebas_Neue'] rounded-lg">
              {userDetails ? userDetails.user_name : "Loading..."}
            </p>
          </div>
  
          <div className="flex justify-center my-4">
            <img
              className="rounded-full border-4 border-blue-500 w-40 h-40 object-cover"
              src={userDetails?.profile_picture || "https://upload.wikimedia.org/wikipedia/commons/2/21/Solid_black.svg"}
              alt="Profile"
            />
          </div>
  
          <div className="text-white text-xl font-['Bebas_Neue'] text-center bg-blue-500 py-2 rounded-lg">
            <p>{userDetails ? `${userDetails.total_xp} XP` : "Loading..."}</p>
          </div>
        </div>
      </div>
    );
};

export default ProfileCard;
