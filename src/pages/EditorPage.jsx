import React, { useEffect, useState, useRef } from "react";
import SideBar from "../components/SideBar";
import Loading from "../components/Loading";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { toast } from "react-hot-toast";
import ACTIONS from "../Actions";

function EditorPage() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  // socket
  const socketRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { roomId } = useParams();

  const [user, setUser] = useState([]);

  useEffect(() => {
    const init = async () => {
      // calling a client obj
      socketRef.current = await initSocket();

      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connect failed, try again later.");
        reactNavigator("/");
      }

      // this will run when a client joins
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName,
      }); // a client wants to join

      // Listening from backend for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, userName, socketId }) => {
          if (userName !== location.state?.userName) {
            toast.success(`${userName} joined the room.`);
            console.log(`${userName} has joined`);
          }
          setUser(clients);
        }
      );

      //listening for diconnected users
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, userName }) => {
        toast.success(`${userName} left the room.`);
        //removing the user
        setUser((prev) => {
          return prev.filter((user) => user.socketId !== socketId);
        });
      });
    };
    init();

    // here all on(listner) function should be cleand up =>otherwise leads to memory leak
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  if (loading) return <Loading />;
  else
    return (
      <>
        <div className="flex text-white h-auto min-h-screen w-full bg-gradient-to-br from-black to-blue-950">
          {/* sidebar */}
          <SideBar open={open} setOpen={setOpen} user={user} />

          {/* editor */}
          <div className="pl-7 pt-7 p-7  text-2xl font-semibold flex-1 h-auto linear-gradient(rgb(17, 24, 39), rgb(75, 85, 99))">
            <Editor />
          </div>
        </div>
      </>
    );
}

export default EditorPage;
