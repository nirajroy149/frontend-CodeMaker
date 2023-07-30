import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import Profile from "./Profile";
import { AiOutlineCopy } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SideBar({ setOpen, open, user, roomId }) {
  const reactNavigator = useNavigate();
  // navigator has all the access of microphone, camera etc. present in the browser
  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied!, Share it with your friends.");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.log(err);
    }
  }

  function leaveRoom() {
    reactNavigator("/");
  }

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
            <button
              onClick={copyRoomId}
              className="px-6 py-2  bg-white text-gray-900 border-4 border-dashed border-gray-500 font-semibold rounded-lg cursor-copy hover:bg-gray-300 duration-300"
            >
              Copy Room Id
            </button>{" "}
            <button
              onClick={leaveRoom}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 duration-300"
            >
              Leave
            </button>
          </div>
        ) : (
          <div className={`flex flex-col gap-3 items-center `}>
            {" "}
            <AiOutlineCopy
              onClick={copyRoomId}
              size={35}
              title="Copy room id."
              className="text-blue-500 cursor-pointer"
            />
            <BiExit
              onClick={leaveRoom}
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
