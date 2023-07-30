import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Editor from "../components/Editor";

function EditorPage({}) {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState([
    {
      socketId: 1,
      userName: "Niraj Roy",
    },
    {
      socketId: 2,
      userName: "Ayush Jha",
    },
    {
      socketId: 3,
      userName: "Sushil Roy",
    },
    {
      socketId: 4,
      userName: "Sahul Jha",
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  let { roomId } = useParams();
  // console.log(roomId);

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
