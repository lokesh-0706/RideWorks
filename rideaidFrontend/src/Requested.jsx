import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Typography } from "@mui/material";
import "./fonts/Comfortaa.ttf";
import "./App.css";
import "./index.css";
import "./Home.css";

function Requested() {
  const [rides, setRides] = useState([]);
  useEffect(() => {
    const getRides = async () => {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const res = await axios.get(
        "http://localhost:3000/users/requestedRides",
        {
          headers,
        }
      );
      setRides(res.data.requestedRides);
      console.log(res.data.requestedRides);
    };
    getRides();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        fontFamily: "Comfortaa"
      }}
    >
      <div
        style={{
          width: 1000,
          marginBottom: 20,
          marginTop: 20,
          textAlign: "center",
          fontFamily: "Comfortaa",
        }}
      >
        <h1>Requested Rides</h1>
      </div>
      {rides.map((item) => {
        if (
          item.status == "Approved" ||
          item.status == "Waiting For Approval"
        ) {
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "Comfortaa"
              }}
            >
              <Card
                variant="outlined"
                style={{
                  width: 1000,
                  padding: 20,
                  margin: 5,
                  border: "4px solid #61A3BA",
                  borderRadius: "30px",
                  backgroundColor: "white",
                  fontFamily: "Comfortaa"
                }}
              >
                <Typography variant="h5" style={{ fontFamily: "Comfortaa" }}>
                  <span
                    style={{
                      color: "#61A3BA",
                      fontWeight: "bold",
                      fontFamily: "Comfortaa"
                    }}
                  >
                    Pickup:
                  </span>{" "}
                  {item.pickup}
                </Typography>
                <Typography variant="h5" style={{ fontFamily: "Comfortaa" }}>
                  <span
                    style={{
                      color: "#61A3BA",
                      fontWeight: "bold",
                      fontFamily: "Comfortaa"
                    }}
                  >
                    Destination:
                  </span>{" "}
                  {item.destination}
                </Typography>
                <Typography variant="h6" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA", fontFamily: "Comfortaa" }}>
                    Ride Id:
                  </span>{" "}
                  {item.id}
                </Typography>
                <Typography variant="h6" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA", fontFamily: "Comfortaa" }}>
                    Time:
                  </span>{" "}
                  {item.time}
                </Typography>
                <Typography variant="h6" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA", fontFamily: "Comfortaa" }}>
                    RideLead:{" "}
                  </span>
                  {item.ridelead}
                </Typography>
                <Typography variant="h6" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA", fontFamily: "Comfortaa" }}>
                    Available Seats:{" "}
                  </span>
                  {item.seats}
                </Typography>
                <Typography variant="h6" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA", fontFamily: "Comfortaa" }}>
                    Description:
                  </span>{" "}
                  {item.description}
                </Typography>
                <Typography variant="h6" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA", fontFamily: "Comfortaa" }}>
                    Status:{" "}
                  </span>
                  {item.status}
                </Typography>
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    marginTop: 10,
                  }}
                  variant="contained"
                  onClick={async () => {
                    const res = await axios.post(
                      "http://localhost:3000/users/cancelRequest",
                      {
                        username: item.ridelead,
                        rideId: item.id,
                      },
                      {
                        headers: {
                          "Content-type": "application/json",
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );
                    alert("Request Cancelled");
                    window.location = "/receivedRequest";
                    window.location = "/requestRides";
                  }}
                >
                  Cancel Request
                </Button>
              </Card>
            </div>
          );
        } else {
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                variant="outlined"
                style={{
                  width: 1000,
                  padding: 20,
                  margin: 5,
                  border: "4px solid #61A3BA",
                  borderRadius: "30px",
                  backgroundColor: "white",
                }}
              >
                <Typography variant="h5" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA", fontWeight: "bold",fontFamily: "Comfortaa" }}>
                    Pickup:
                  </span>{" "}
                  {item.pickup}
                </Typography>
                <Typography variant="h5" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA", fontWeight: "bold",fontFamily: "Comfortaa" }}>
                    Destination:
                  </span>{" "}
                  {item.destination}
                </Typography>
                <Typography variant="h6" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA",fontFamily: "Comfortaa" }}>Ride Id:</span> {item.id}
                </Typography>
                <Typography variant="h6" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA",fontFamily: "Comfortaa" }}>Time:</span> {item.time}
                </Typography>
                <Typography variant="h6" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA" ,fontFamily: "Comfortaa"}}>RideLead: </span>
                  {item.ridelead}
                </Typography>
                <Typography variant="h6" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA",fontFamily: "Comfortaa" }}>Available Seats: </span>
                  {item.seats}
                </Typography>
                <Typography variant="h6" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA",fontFamily: "Comfortaa" }}>Description:</span>{" "}
                  {item.description}
                </Typography>
                <Typography variant="h6" style={{ fontFamily: "Comfortaa" }}>
                  <span style={{ color: "#61A3BA",fontFamily: "Comfortaa" }}>Status: </span>
                  <span style={{ color: "orangered",fontFamily: "Comfortaa" }}>{item.status} </span>
                </Typography>
              </Card>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Requested;
