import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import { database,auth } from "../database/firebase";

const SignupModal = ({ isOpen, onClose }) => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });


  function handleChange(e) {
    let { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function adddetails(e) {
    e.preventDefault();
    
    try {
       const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    
  await updateProfile(userCredential.user,{
    displayName: user.username,
  })

    const uid = userCredential.user.uid;

     await addDoc(collection(database, "users"), {
      uid,
      username:user.username,
      email:user.email,
      password:user.password,
      createdAt:new Date(),
     });

      alert("user has been added successfully !! ");
      setUser({
        email: "",
        password: "",
        username: "",
      });
      onClose();
    } catch (err) {
      console.error("Error addign document:", err);
    }
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 ">
      <div className="bg-[#F7F5F4] rounded-2xl p-6 w-[500px] shadow-lg relative">
        <div className="flex justify-between items-center ">
          <div>
            <button
              className="absolute top-6.5 right-10 text-gray-500 cursor-pointer"
              onClick={onClose}
            >
              X
            </button>
          </div>
        </div>

        <div className=" p-6">
          <div className="flex flex-col gap-5">
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
                className="w-full px-4 py-3  border text-sm  border-gray-300 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                className="w-full px-4 py-3 border bg-white text-sm border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-3">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border bg-white text-sm border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end items-center pt-2 gap-3">
              <button
                type="button"
                onClick={adddetails}
                className="px-6 py-2 bg-[#FAE150] rounded-full font-medium hover:cursor-pointer hover:brightness-95 transition "
              >
                SignUp
              </button>
              <button
                type="button"
                className="text-sm text-gray-500 hover:underline hover:cursor-pointer"
                   onClick={() =>
                  setUser({ email: "", password: "", username: "" })
                }
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
