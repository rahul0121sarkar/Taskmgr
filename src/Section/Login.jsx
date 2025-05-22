import React from "react";
import "../App.css";
const Login = () => {
  return (
    <>
      {/* <div className="bg-[#f8f6ff] h-screen p-4">
        <div className="max-w-6xl flex justify-center items-center gap-4">
          <div className="w-1/2 bg-white rounded-xl shadow-md p-6">
            <img
              src="./Image.png"
              alt="illustrator"
              className="h-[75vh] object-contain"
            />
          </div>
          <div className="w-1/2  ">
            <div className="mb-4 flex flex-col justify-center items-center ">
              <div className="rounded-full bg-[#FAE150] text-black font-bold w-14 h-14 flex justify-center items-center border-3 ">
                Xplor
              </div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Bizconnect Xplor
              </h1>
            </div>

            <div className="max-w-4xl bg-white p-4 rounded-xl shadow-md">
              <form action="" className="flex flex-col gap-4">
                <label className="block text-lg font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name=""
                  placeholder="Enter your email"
                  className="w-full px-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  id=""
                />

                <label className="block text-lg font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name=""
                  placeholder="Enter your password"
                  className="w-full px-3 py-1 border rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  id=""
                />

                <div className="flex justify-end gap-3 pr-6">
                    <button type="submit" className="px-5 py-1 border rounded-full bg-[#FAE150]">Login</button>
                    <button>Reset</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}

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
              className="w-full px-4 py-3 border bg-[#F7F5F4] text-sm border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center pt-2 gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-[#FAE150] rounded-full font-medium hover:cursor-pointer hover:brightness-95 transition"
            >
              Login
            </button>
            <button className="text-sm text-gray-500 hover:underline">
              Sign up
            </button>
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
