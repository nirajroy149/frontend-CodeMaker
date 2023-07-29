import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import Profile from "./Profile";
import { AiOutlineCopy } from "react-icons/ai";
import { BiExit } from "react-icons/bi";

function SideBar({ setOpen, open, user }) {
  return (
    <>
      <div
        className={`${
          open ? "w-72" : "w-32"
        } duration-300  min-h-screen p-4 flex flex-col justify-between  relative shadow-lg shadow-white m-auto`}
      >
        {/* open / close button */}
        <div
          className={`absolute -right-4 cursor-pointer rounded-full ${
            open && "rotate-180"
          } duration-600 bg-white p-1 text-gray-800`}
          onClick={() => setOpen(!open)}
        >
          <AiOutlineArrowRight size={25} />
        </div>

        <div className="mb-6">
          {/* heading */}
          <h2
            className={`${
              open ? "text-4xl" : "text-2xl"
            }  font-bold ml-2 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500`}
          >
            Code Maker
          </h2>

          {/* profile with avatar */}
          <Profile user={user} />
        </div>

        {/* button */}
        {open ? (
          <div className={`flex flex-col gap-3 `}>
            <button className="px-6 py-2  bg-white text-gray-900 border-4 border-dashed border-gray-500 font-semibold rounded-lg cursor-copy hover:bg-gray-300 duration-300">
              Copy Room Id
            </button>{" "}
            <button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 duration-300">
              Leave
            </button>
          </div>
        ) : (
          <div className={`flex flex-col gap-3 items-center `}>
            {" "}
            <AiOutlineCopy
              size={35}
              title="Copy room id."
              className="text-blue-500 cursor-pointer"
            />
            <BiExit
              size={35}
              title="Leave room."
              className="text-red-500 cursor-pointer"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default SideBar;
