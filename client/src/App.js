import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import socketIOClient from "socket.io-client";

const App = () => {
  const [position, setPosition] = useState("start");

  useEffect(() => {
    const socket = socketIOClient("/");
    socket.on("fen update", msg => {
      setPosition(msg);
    });
    socket.emit("set game");
  }, []);

  function setFEN() {
    const socket = socketIOClient("/");
    socket.emit("set fen");
  }

  function getFEN() {
    const socket = socketIOClient("/");
    socket.emit("get fen");
  }

  return (
    <div>
      <Chessboard position={position} transitionDuration={1000} />
      <button onClick={getFEN}>Get Update</button>
      <button onClick={setFEN}>Set Update</button>
    </div>
  );
};

export default App;
