import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen flex flex-col items-center">
        <div className="flex w-[50%] h-[10%] mt-[10%] justify-center items-center">
            <p className="border border-3 rounded-lg p-3 font-['Holtwood_One_SC'] textDarkBrown bg-orange-500 text-8xl">
            Roadquest
            </p>
        </div>
        <div className="flex w-[100%] h-[10%] mt-[10%] justify-center items-center">
            <p className="font-mono textDarkBrown text-4xl">Ready to embark on a new quest?</p>
        </div>
        <div className="flex w-[50%] h-[10%] mt-[10%] justify-center items-center">
            <div className="p-4 backgroundOrange rounded-lg cursor-pointer">
                <p className="font-bold font-mono text-white text-5xl"
                   onClick={() => navigate("/SignUp")}>
                   Get Started
                </p>
            </div>
        </div>
    </div>
  )
}

export default Welcome