import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./fonts/Comfortaa.ttf";

function AddCourse() {
  const [ridelead, setRidelead] = useState("");
  const [description, setDescription] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "80vh",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "Comfortaa"
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        
        <Card
          varint={"outlined"}
          style={{ width: 400, padding: 20, marginTop: 30, height: "100%" }}
        >
          {/* <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setRidelead(e.target.value);
            }}
            fullWidth={true}
            label="ridelead"
            variant="outlined"
          /> */}

          <TextField
            style={{ marginBottom: 10,fontFamily: "Comfortaa" }}
            onChange={(e) => {
              setPickup(e.target.value);
            }}
            fullWidth={true}
            label="Pickup"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10,fontFamily: "Comfortaa" }}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
            fullWidth={true}
            label="Destination"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10,fontFamily: "Comfortaa" }}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            fullWidth={true}
            label="Time"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10,fontFamily: "Comfortaa" }}
            onChange={(e) => {
              setSeats(e.target.value);
            }}
            fullWidth={true}
            label="Available Seats"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10,fontFamily: "Comfortaa" }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <Button
            style={{
              backgroundColor: "#427D9D",
              color: "white",
              marginLeft: 130,
              fontFamily: "Comfortaa"
            }}
            size={"large"}
            variant="contained"
            onClick={async () => {
              await axios.post(
                "http://localhost:3000/ridelead/rides",
                {
                  //   ridelead: ridelead,
                  pickup: pickup,
                  description: description,
                  destination: destination,
                  time: time,
                  seats: seats,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              alert("Added Ride!");
              navigate("/home");
            }}
          >
            {" "}
            Add Ride
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default AddCourse;
