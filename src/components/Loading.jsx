import React from "react";

function Loading() {
  return (
    <>
      <div className="flex flex-col gap-7 text-white justify-center items-center w-full h-screen bg-gradient-to-b from-black to-gray-600">
        <div
          className=" inline-block h-24 w-24 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
        <p className="text-2xl">Wait! we are directing you to the room.</p>
      </div>
    </>
  );
}

export default Loading;
