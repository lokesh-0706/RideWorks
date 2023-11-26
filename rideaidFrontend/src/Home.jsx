import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Typography } from "@mui/material";
import "./Home.css";
import "./App.css";
import "./index.css";
import { useNavigate } from "react-router-dom";
import "./fonts/Comfortaa.ttf";

function Home() {
  const [rides, setRides] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getRides = async () => {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const res = await axios.get("http://localhost:3000/users/rides", {
        headers,
      });
      setRides(res.data.rides);
      setUser(res.data.username);
      console.log(res.data.rides);
      console.log(res.data.username);
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
        }}
      >
        <h1>Available Rides</h1>
      </div>
      {rides.map((item) => {
        if (user == item.ridelead) {
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
                <Typography variant="h5" style={{ float: "left", fontFamily: "Comfortaa" }} >
                  <span style={{ color: "#61A3BA", fontWeight: "bold" }}>
                    Pickup:
                  </span>{" "}
                  {item.pickup}
                </Typography>
                <Typography variant="h5" style={{ float: "right",fontFamily: "Comfortaa" }} >
                  <span
                    style={{
                      color: "#61A3BA",
                      fontWeight: "bold",
                      marginLeft: 300,
                    }}
                  >
                    Destination:
                  </span>{" "}
                  {item.destination}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ clear: "left", float: "left", marginTop: 10,fontFamily: "Comfortaa" }}
                  
                >
                  <span style={{ color: "#61A3BA" }}>Ride ID:</span> {item.id}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ float: "right", marginTop: 10,fontFamily: "Comfortaa" }}
                  
                >
                  <span style={{ color: "#61A3BA" }}>Time:</span> {item.time}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ clear: "left", float: "left",fontFamily: "Comfortaa" }}
                  
                >
                  <span style={{ color: "#61A3BA" }}>Ride Lead: </span>
                  {item.ridelead}
                </Typography>
                <Typography variant="h6" style={{ float: "right",fontFamily: "Comfortaa" }}
                >
                  <span style={{ color: "#61A3BA" }}>Available Seats: </span>
                  {item.seats}
                </Typography>
                <Typography variant="h6" style={{ clear: "left",fontFamily: "Comfortaa" }}
                
                >
                  <span style={{ color: "#61A3BA" }}>Description:</span>{" "}
                  {item.description}
                </Typography>
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
                <Typography variant="h5" style={{ float: "left" ,fontFamily:"Comfortaa"}}>
                  <span style={{ color: "#61A3BA", fontWeight: "bold" }}>
                    Pickup:
                  </span>{" "}
                  {item.pickup}
                </Typography>
                <Typography variant="h5" style={{ float: "right" ,fontFamily:"Comfortaa"}}>
                  <span
                    style={{
                      color: "#61A3BA",
                      fontWeight: "bold",
                      marginLeft: 300,
                    }}
                  >
                    Destination:
                  </span>{" "}
                  {item.destination}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ clear: "left", float: "left", marginTop: 10,fontFamily:"Comfortaa" }}
                >
                  <span style={{ color: "#61A3BA" }}>Ride ID:</span> {item.id}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ float: "right", marginTop: 10 ,fontFamily:"Comfortaa"}}
                >
                  <span style={{ color: "#61A3BA" }}>Time:</span> {item.time}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ clear: "left", float: "left",fontFamily:"Comfortaa" }}
                >
                  <span style={{ color: "#61A3BA" }}>Ride Lead: </span>
                  {item.ridelead}
                </Typography>
                <Typography variant="h6" style={{ float: "right",fontFamily:"Comfortaa" }}>
                  <span style={{ color: "#61A3BA" }}>Available Seats: </span>
                  {item.seats}
                </Typography>
                <Typography variant="h6" style={{ clear: "left" ,fontFamily:"Comfortaa"}}>
                  <span style={{ color: "#61A3BA" }}>Description:</span>{" "}
                  {item.description}
                </Typography>

                <Button
                  variant={"contained"}
                  style={{
                    backgroundColor: "#427D9D",
                    color: "white",
                    marginLeft: 430,
                  }}
                  onClick={async () => {
                    const res = await axios.post(
                      "http://localhost:3000/users/rides/" + item.id,
                      {},
                      {
                        headers: {
                          "Content-type": "application/json",
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );
                    alert("Ride Requested Succesfully");
                    navigate("/requestRides");
                  }}
                >
                  Request
                </Button>
              </Card>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Home;
