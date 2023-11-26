import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./fonts/Comfortaa.ttf";
import "./Home.css";
import "./App.css";
import "./index.css";

function Received() {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getRides = async () => {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const res = await axios.get(
        "http://localhost:3000/users/receivedRequests",
        {
          headers,
        }
      );
      console.log(res.data);
      setRides(res.data.receivedRequests);
    };
    getRides();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
      className="font-face-gm"
    >
      <div
        style={{
          width: 1000,
          marginBottom: 20,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        <h1>Received Requests</h1>
      </div>
      {rides.map((item) => {
        if (item.approved == 0) {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                variant="outlined"
                style={{ width: 1000, padding: 20, margin: 5 }}
              >
                <Typography variant="h5" style={{ marginBottom: 10, fontFamily:"Comfortaa" }}>
                  Ride requested by:
                  <span style={{ color: "#61A3BA", fontWeight: "bold",fontFamily:"Comfortaa" }}>
                    {item.username}
                  </span>{" "}
                  for Ride ID:
                  <span style={{ color: "#61A3BA", fontWeight: "bold",fontFamily:"Comfortaa" }}>
                    {item.rideIdRequested}{" "}
                  </span>
                </Typography>
                <Button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                  }}
                  variant="contained"
                  onClick={async () => {
                    const res = await axios.post(
                      "http://localhost:3000/users/approveRide",
                      {
                        username: item.username,
                        rideId: item.rideIdRequested,
                      },
                      {
                        headers: {
                          "Content-type": "application/json",
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );
                    alert("Ride Approved");
                    window.location = "/receivedRequest";
                  }}
                >
                  Approve
                </Button>
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    marginLeft: 20,
                  }}
                  variant="contained"
                  onClick={async () => {
                    const res = await axios.post(
                      "http://localhost:3000/users/rejectRide",
                      {
                        username: item.username,
                        rideId: item.rideIdRequested,
                      },
                      {
                        headers: {
                          "Content-type": "application/json",
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );
                    alert("Ride Rejected");
                    window.location = "/receivedRequest";
                  }}
                >
                  Reject
                </Button>
              </Card>
            </div>
          );
        } else if (item.approved == 1) {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                variant="outlined"
                style={{ width: 1000, padding: 20, margin: 5 }}
              >
                <Typography variant="h5" style={{ marginBottom: 10, fontFamily:"Comfortaa" }}>
                  Ride requested by:
                  <span style={{ color: "#61A3BA", fontWeight: "bold" }}>
                    {item.username}
                  </span>{" "}
                  for Ride ID:
                  <span style={{ color: "#61A3BA", fontWeight: "bold" }}>
                    {item.rideIdRequested}{" "}
                  </span>
                </Typography>
                <Button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                  }}
                  variant="contained"
                >
                  Ride Approved
                </Button>
              </Card>
            </div>
          );
        } else if (item.approved == -1) {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                variant="outlined"
                style={{ width: 1000, padding: 20, margin: 5 }}
              >
                <Typography variant="h5" style={{ marginBottom: 10 , fontFamily:"Comfortaa"}}>
                  Ride requested by:
                  <span style={{ color: "#61A3BA", fontWeight: "bold" }}>
                    {item.username}
                  </span>{" "}
                  for Ride ID:
                  <span style={{ color: "#61A3BA", fontWeight: "bold" }}>
                    {item.rideIdRequested}{" "}
                  </span>
                </Typography>
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                  }}
                  variant="contained"
                >
                  Ride Rejected
                </Button>
              </Card>
            </div>
          );
        } else if (item.approved == -2) {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                variant="outlined"
                style={{ width: 1000, padding: 20, margin: 5 }}
              >
                <Typography variant="h5" style={{ marginBottom: 10, fontFamily:"Comfortaa" }}>
                  Ride requested by:
                  <span style={{ color: "#61A3BA", fontWeight: "bold" }}>
                    {item.username}
                  </span>{" "}
                  for Ride ID:
                  <span style={{ color: "#61A3BA", fontWeight: "bold" }}>
                    {item.rideIdRequested}{" "}
                  </span>
                </Typography>
                <Button
                  style={{
                    backgroundColor: "orangered",
                    color: "white",
                  }}
                  variant="contained"
                >
                  Request Cancelled by User
                </Button>
              </Card>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Received;
