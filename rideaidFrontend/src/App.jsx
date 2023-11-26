import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Appbar from "./Appbar";
import Rides from "./Rides";
import Home from "./Home";
import AddCourse from "./AddCourse";
import Ride from "./Ride";
import Received from "./Received";
import Requested from "./Requested";
import "./fonts/Comfortaa.ttf";

function App() {
  return (
    <div style={{ backgroundColor: "#DDF2FD", minHeight: "100vh" }} className="font-face-gm">
      <Router>
        <Appbar></Appbar>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/ride/:rideId" element={<Ride />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddCourse />} />
          <Route path="/requestRides" element={<Requested />} />
          <Route path="/receivedRequest" element={<Received />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
