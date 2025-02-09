import { useNavigate } from "react-router-dom";
import RoadWhite from "../src/assets/road-white.png";
import Car from "../src/assets/car.png";

const Welcome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative w-screen flex flex-col">
        <div className="flex flex-col w-1/2 ml-[10%]">
            <div className="flex w-[50%] h-[10%] mt-[7%] justify-center items-center">
                <p className="border border-5 border-black rounded-lg p-3 font-['Bebas_Neue'] text-white bg-[#c87c2c] text-8xl">
                Roadquest
                </p>
            </div>
            <div className="flex w-[50%] h-[10%] mt-[3%] justify-center items-center">
                <p className="font-['Bebas_Neue'] text-white text-5xl">Ready to embark on a new quest?</p>
            </div>
            <div className="flex w-[50%] h-[10%] mt-[3%] justify-center items-center">
                <div className="p-4 bg-[#c87c2c] rounded-lg cursor-pointer border border-5">
                    <p className="font-bold font-['Bebas_Neue'] text-white text-4xl"
                    onClick={() => navigate("/SignUp")}>
                    Get Started
                    </p>
                </div>
            </div>
        </div>
        <div className="absolute right-50 top-30">
            <img src={Car} alt="road" className="w-120 h-60 mt-[6.5%]" />
        </div>        
        <img src={RoadWhite} alt="road" className="bg-white bg-auto w-400 h-20 mt-[6.5%]" />
    </div>
    
  )
}

export default Welcome