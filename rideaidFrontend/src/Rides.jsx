import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Rides() {
  const [rides, setRides] = useState([]);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    function callback2(data) {
      setRides(data.rides);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/ridelead/rides/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  useEffect(() => {
    function callback2(data) {
      if (data.username) {
        setUserEmail(data.username);
      }
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    console.log("token - " + localStorage.getItem("token"));
    fetch("http://localhost:3000/ridelead/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      <div
        style={{
          width: 1000,
          marginBottom: 20,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        <h1>My Rides</h1>
      </div>
      {rides.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();

  return (
    <Card
      style={{
        width: 1000,
        padding: 20,
        margin: 10,
        minHeight: 200,
        border: "4px solid #61A3BA",
        borderRadius: "30px",
        backgroundColor: "white",
      }}
      className="font-face-gm"
    >
      <Typography variant="h5" style={{fontFamily:"Comfortaa"}}>
        <span style={{ color: "#61A3BA", fontWeight: "bold" }}>Pickup:</span>{" "}
        {course.pickup}
      </Typography>
      <Typography variant="h5" style={{fontFamily:"Comfortaa"}}>
        <span style={{ color: "#61A3BA", fontWeight: "bold" }}>
          Destination:
        </span>{" "}
        {course.destination}
      </Typography>
      <Typography variant="h6" style={{fontFamily:"Comfortaa"}}>
        <span style={{ color: "#61A3BA" }}>Ride ID:</span> {course.id}
      </Typography>
      <Typography variant="h6" style={{fontFamily:"Comfortaa"}}>
        <span style={{ color: "#61A3BA" }}>Time:</span> {course.time}
      </Typography>
      <Typography variant="h6" style={{fontFamily:"Comfortaa"}}>
        <span style={{ color: "#61A3BA" }}>Description:</span>{" "}
        {course.description}
      </Typography>
      <Typography variant="h6" style={{fontFamily:"Comfortaa"}}>
        <span style={{ color: "#61A3BA" }}>RideLead: </span>
        {course.ridelead}
      </Typography>
      <Typography variant="h6" style={{fontFamily:"Comfortaa"}}>
        <span style={{ color: "#61A3BA" }}>Available Seats: </span>
        {course.seats}
      </Typography>
      <div style={{ display: "flex", marginTop: 20 }}>
        <Button
          style={{
            backgroundColor: "#427D9D",
            color: "white",
            marginLeft: 450,
          }}
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/ride/" + course.id);
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}

export default Rides;
