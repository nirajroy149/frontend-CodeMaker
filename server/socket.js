import { io } from "socket.io-client";

import React from "react";

function socket() {
  return <div>socket</div>;
}

export default io(process.env.REACT_APP.BACKEND);
