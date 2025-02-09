import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-screen flex flex-col">
        <div className="flex w-[50%] h-[10%] mt-[5%] justify-center items-center">
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
  )
}

export default Welcome