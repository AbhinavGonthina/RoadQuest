import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../context/context";

const SignIn = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("SignIn");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_name, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const { setToken, backendUrl } = useContext(Context);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "SignIn") {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Successful Login!");
          navigate("/home");
        } else {
          toast.error(response.data.error);
        }
      } else if (currentState === "Create") {
        const response = await axios.post(`${backendUrl}/api/user/create`, {
          first_name,
          last_name,
          user_name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Successfully Created Account!");
          navigate("/home");
        } else {
          toast.error(response.data.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex w-screen  items-center justify-center">
        {currentState === "SignIn" ? (
          <div className="border-8 w-[60%] h-[60%] mt-[7.5%] bg-[#d67c36] rounded-lg flex flex-col items-center justify-center">
            <form
              onSubmit={onSubmitHandler}
              className="w-[100%] h-[90%] bg-backgroundTan rounded-lg flex flex-col justify-center items-center"
            >
              <div className=" rounded-lg flex w-[50%] h-[10%] mt-[5%] justify-center items-center">
                <p className="font-['Bebas_Neue'] text-white text-6xl">Sign In</p>
              </div>
              {/* Email Input */}
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="bg-white rounded-lg p-0.5 text-xl px-[2%] w-[80%] h-[8%] mt-[5%] outline-none"
              ></input>
              {/* Password Input */}
              <div className="bg-white flex justify-between items-center rounded-lg px-[2%] w-[80%] h-[8%] mt-[2%] outline-none">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="w-full text-xl p-0.5 outline-none"
                ></input>
              </div>
              <div className="flex flex-row justify-between w-[80%] mt-[4%]">
                <Link
                  to="/forgot-password"
                  className="bg-white font-['Bebas_Neue'] rounded-lg px-2 py-1 text-[#F97316] p-0.5 text-xl cursor-pointer"
                >
                  Forgot Password?
                </Link>
                <button
                  type="submit"
                  onClick={() => onSubmitHandler}
                  className="bg-white rounded-lg px-2 py-1 text-[#F97316] p-0.5 text-xl cursor-pointer"
                >
                  <p className="font-['Bebas_Neue']">
                  Continue
                  </p>
                </button>
              </div>
              <div className="p-1.5 bg-blue-500 rounded-lg mt-[4%] mb-[4%] cursor-pointer">
                  <p
                  className="text-white p-0.5 text-xl font-['Bebas_Neue']"
                  onClick={() => setCurrentState("Create")}>
                    New? Create your account
                  </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="border-8 w-[60%] h-[60%] mt-[5.5%] bg-[#d67c36] rounded-lg flex flex-col items-center justify-center">
            <form
              onSubmit={onSubmitHandler}
              className="w-[90%] h-[90%] bg-backgroundTan rounded-lg flex flex-col items-center"
            >
              <div className="rounded-lg flex w-[100%] h-[10%] mt-[5%] justify-center items-center">
                <p className="text-white text-6xl font-['Bebas_Neue']">Create Account</p>
              </div>
              {/* Names Input */}
              <div className="flex flex-row w-[80%] h-[8%] mt-[5%] gap-x-3">
                <input
                  type="name"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={first_name}
                  required
                  className="bg-white p-0.5 text-xl rounded-lg px-[2%] w-full h-full outline-none"
                ></input>

                <input
                  type="name"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={last_name}
                  required
                  className="bg-white p-0.5 text-xl rounded-lg px-[2%] w-full h-full outline-none"
                ></input>
              </div>

              {/* Username Input */}
              <input
                type="name"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={user_name}
                required
                className="bg-white p-0.5 text-xl rounded-lg px-[2%] w-[80%] h-[8%] mt-[2%] outline-none"
              ></input>

              {/* Email Input */}
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="bg-white p-0.5 text-xl rounded-lg px-[2%] w-[80%] h-[8%] mt-[2%] outline-none"
              ></input>

              {/* Password Input */}
              <div className="bg-white flex justify-between items-center rounded-lg px-[2%] w-[80%] h-[8%] mt-[2%] outline-none">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="p-0.5 text-xl w-full outline-none"
                ></input>
              </div>

              <div className="font-['Bebas_Neue'] flex flex-row justify-between w-[80%] mt-[4%]">
                <Link
                  to="/forgot-password"
                  className="bg-white rounded-lg px-2 py-1 text-[#F97316] p-0.5 text-xl cursor-pointer"
                >
                  Forgot Password?
                </Link>

                <button
                  type="submit"
                  onClick={() => onSubmitHandler}
                  className="bg-white rounded-lg px-2 py-1 text-[#F97316] p-0.5 text-xl cursor-pointer"
                >
                  Continue
                </button>
              </div>
              <div className="font-['Bebas_Neue'] mt-[4%] mb-[4%] px-2 py-1 bg-blue-500 rounded-xl cursor-pointer">
                  <p
                  className="text-white p-0.5 text-xl"
                  onClick={() => setCurrentState("SignIn")}>
                    Already have an account? Sign in
                  </p>
                </div>
            </form>
          </div>
        )}
    </div>
  );
};

export default SignIn;