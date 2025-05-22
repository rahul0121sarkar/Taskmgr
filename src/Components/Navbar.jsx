import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  return (
    <>
      <div className="">
        <div className="max-w-4xl mx-auto flex justify-between h-12 px-8 m-4 rounded-4xl items-center bg-white shadow-2xl">
          <div className="bg-gray-300 p-0.5 rounded  ">
            <input
              type="text"
              placeholder="Search"
              name=""
              id=""
              className="w-[220px] pl-3"
            />
          </div>
          <div>
            <button className="h-8 w-28 bg-amber-300 rounded-xl border-4 cursor-pointer">
              <FontAwesomeIcon icon={faPlus} className="pr-2" />
              New Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
