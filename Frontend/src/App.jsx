import './App.css'
import Welcome from '../pages/Welcome'
import SignUp from "../pages/SignUp"
import Home from "../pages/Home"
import RoadQuest from '../pages/RoadQuest'
import Group from '../pages/Group'
import {Routes, Route} from 'react-router-dom';
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../components/Navbar'

function App() {

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <ToastContainer />
      <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Group" element={<Group />} />
          <Route path="/RoadQuest" element={<RoadQuest />} />
      </Routes>
    </div>
  )
}

export default App
