import React, { useState } from "react";
import logo from "../images/white_code.png";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <div className="h-screen w-full overflow-hidden bg-gradient-to-b from-black to-gray-800">
        <div className="max-w-md h-full px-3 m-auto flex flex-col items-center justify-center">
          <Form />
        </div>
      </div>
      <Footer />
    </>
  );
}

function Form() {
  const containerVariants = {
    hidden: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        delay: 0.8,
        stiffness: 90,
      },
    },
  };
  const inputStyle =
    "shadow-sm bg-gray-800 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

  const inputs = [
    { name: "roomId", id: "roomId", placeholder: "ROOM ID", value: "roomId" },
    { name: "userName", id: "userName", placeholder: "USERNAME", value: "" },
  ];

  // creating new room on ancor click
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  function createNewRoom(e) {
    // e.preventDefault();
    const newId = uuidv4();
    setRoomId(newId);
    toast.success("New Room Created!");
  }
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "roomId") {
      setRoomId(value);
    } else {
      setUserName(value);
    }
  }

  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error("ROOM ID & UserName is required!");
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        userName,
      },
    });
  };
  const handleKeyUp = (e) => {
    const keyPressed = e.code; // gives which key is pressed
    if (keyPressed === "Enter") {
      joinRoom();
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col px-4 py-10 pb-3 w-full bg-white rounded-lg"
    >
      <div className="mb-5 h-[240px]">
        <img className="w-60 m-auto rounded" src={logo} alt="profile logo" />
      </div>

      <div>
        <div className="ml-2 mb-4 text-md font-bold text-gray-400 tracking-wider">
          <h2>Paste invitation ROOM ID</h2>
        </div>

        {/* <form aria-readonly> */}
        <div className="mb-4">
          {inputs.map((input, index) => {
            return (
              <div className="mb-3" key={input.id}>
                <input
                  autoComplete="off"
                  type="text"
                  name={input.name}
                  className={inputStyle}
                  placeholder={input.placeholder}
                  value={input.name === "roomId" ? roomId : userName}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                  required
                />
              </div>
            );
          })}
        </div>

        <div className="relative h-10">
          <button
            onClick={joinRoom}
            className=" bg-blue-600 hover:bg-blue-900 text-white  font-bold py-2 px-5 text-sm rounded-md absolute right-1"
          >
            JOIN
          </button>
        </div>
        {/* </form> */}

        <div>
          <h4 className="mt-3 text-center">
            If you don't have an invite then create{" "}
            <button
              className="underline hover:text-blue-950 cursor-pointer text-blue-700 font-bold"
              onClick={createNewRoom}
            >
              new room
            </button>
          </h4>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
