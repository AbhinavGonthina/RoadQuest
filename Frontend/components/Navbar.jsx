import {useContext, useState} from 'react'
import { useNavigate } from "react-router-dom";
import Logo from "../src/assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='border-b-5 w-screen h-20 flex flex-row items-center font-medium bg-[#c87c2c]'>
        <img src={Logo} alt="road" className="w-25 h-25 mb-1 cursor-pointer" onClick={() => navigate("/")}/>
    </div>
  )
}

export default Navbar