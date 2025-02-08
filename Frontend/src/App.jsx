import './App.css'
import Welcome from '../pages/Welcome'
import {Routes, Route} from 'react-router-dom';
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className="w-full min-h-screen">
      <ToastContainer />
      <Routes>
          <Route path="/" element={<Welcome />} />
      </Routes>
    </div>
  )
}

export default App
