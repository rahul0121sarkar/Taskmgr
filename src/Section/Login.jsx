import React from "react";
import "../App.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase";
import { useNavigate } from "react-router-dom";
import SignupModal from "../Modal/SignupModal";



const Login = () => {
const navigate = useNavigate();

const [isModal,setModalOpen] = React.useState(false);
const [user,setUser] = React.useState({
  email:"",
  password:""
})

const [error,setError] = React.useState("");

function handleChange(e){
  let {name,value} = e.target;
  setUser((prev)=>({
    ...prev,
    [name]:value
  }))
}

async function handleLogin(e){
  e.preventDefault();
  setError("");

  try{
    await signInWithEmailAndPassword(auth,user.email,user.password);
    alert("Login successfully");
    navigate("/dashboard");
  }
  catch(err){
    alert("Incorrect email or password, please try again later.");
    setError("Incorrect email or password");
    console.error(err)
  }
}


  return (
    <>
  

  <div className="bg-[#f8f6ff] h-screen flex items-center justify-center p-4">
  <div className="max-w-6xl w-full flex gap-10 items-center">
    {/* Illustration */}
    <div className="hidden md:flex w-1/2 bg-white rounded-[5rem] shadow-md p-6  justify-center">
      <img
        src="./Image.png"
        alt="illustrator"
        className="h-[75vh] object-contain "
      />
    </div>

    {/* Login Section */}
    <div className="w-full lg:w-1/2 space-y-4">
      {/* Header */}
      <div className="flex flex-col items-center space-y-2">
        <div className="rounded-full bg-[#FAE150] text-black font-bold w-16 h-16 flex justify-center items-center border border-black text-lg">
          Xplor
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Bizconnect Xplor
        </h1>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-3xl shadow-md w-full">
        <form className="flex flex-col gap-5">
          <div>
            <label className="block text-md font-medium text-gray-700 mb-3">
              Email
            </label>
            <input
              type="email"
              placeholder="your email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-3  border text-sm  border-gray-300 bg-[#F7F5F4] rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700 mb-3">
              Password
            </label>
            <input
              type="password"
              placeholder="your password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border bg-[#F7F5F4] text-sm border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center pt-2 gap-3">
            <button
              type="submit"
              onClick={handleLogin}
              className="px-6 py-2 bg-[#FAE150] rounded-full font-medium hover:cursor-pointer hover:brightness-95 transition"
            >
              Login
            </button>
            <button type="button" className="text-sm text-gray-500 hover:underline hover:cursor-pointer" onClick={()=>setModalOpen(true)}>
              Sign up
            </button>
          <SignupModal  isOpen={isModal} onClose={() => setModalOpen(false)}/>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


    </>
  );
};

export default Login;
