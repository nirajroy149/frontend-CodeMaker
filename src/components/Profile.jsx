import React from "react";
import Avatar from "react-avatar";

function Profile({ user, open }) {
  return (
    <div className="px-2 flex flex-col gap-5">
      <h1 className={`text-gray-400 text-lg`}>Connected</h1>
      <div className="flex flex-wrap gap-5 duration-400 ">
        {user.map((u) => {
          return (
            <div
              key={u.socketId}
              className="cursor-pointer gap-1 flex flex-col items-center hover:scale-110 duration-150"
            >
              <Avatar name={u.userName} size="50" className="rounded-lg" />
              <p className="text-sm text-gray-100 text-left sm:text-center">
                {u.userName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
