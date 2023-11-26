import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./fonts/Comfortaa.ttf";

function Ride() {
  let { rideId } = useParams();
  const [ride, setRide] = useState(null);

  useEffect(() => {
    function callback2(data) {
      setRide(data.ride);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/ridelead/rides/" + rideId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  if (!ride) {
    return (
      <div
        style={{
          height: "100vh",
          justifyContent: "center",
          flexDirection: "column",
        }}
        className="font-face-gm"
      >
        Loading....
      </div>
    );
  }

  return (
    <div className="font-face-gm">
      {/* <GrayTopper title={ride.ridelead} /> */}
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard ride={ride} setRide={setRide} />
        </Grid>
        {/* <Grid item lg={4} md={12} sm={12}>
          <RideCard ride={ride} />
        </Grid> */}
      </Grid>
    </div>
  );
}

// function GrayTopper({ ridelead }) {
//   return (
//     <div
//       style={{
//         height: 250,
//         background: "#212121",
//         top: 0,
//         width: "100vw",
//         zIndex: 0,
//         marginBottom: -250,
//       }}
//     >
//       <div
//         style={{
//           height: 250,
//           display: "flex",
//           justifyContent: "center",
//           flexDirection: "column",
//         }}
//       >
//         <div>
//           <Typography
//             style={{ color: "white", fontWeight: 600 }}
//             variant="h3"
//             textAlign={"center"}
//           >
//             {ridelead}
//           </Typography>
//         </div>
//       </div>
//     </div>
//   );
// }

function UpdateCard({ ride, setRide }) {
  const [ridelead, setRidelead] = useState(ride.ridelead);
  const [description, setDescription] = useState(ride.description);
  const [destination, setDestination] = useState(ride.destination);
  const [time, setTime] = useState(ride.time);
  const [seats, setSeats] = useState(ride.seats);
  const [pickup, setPickup] = useState(ride.pickup);
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100vw" }}>
      <Card varint={"outlined"} style={{ width: "50vw", marginTop: 40 }}>
        <div style={{ padding: 20 }}>
          <Typography
            style={{ marginBottom: 20, fontWeight: "bold", fontSize: 24 }}
          >
            Update Ride Details
          </Typography>
          <TextField
            value={ridelead}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setRidelead(e.target.value);
            }}
            fullWidth={true}
            label="Ride Lead"
            variant="outlined"
          />
          <TextField
            value={pickup}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setPickup(e.target.value);
            }}
            fullWidth={true}
            label="Pickup"
            variant="outlined"
          />
          <TextField
            value={description}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            value={destination}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
            fullWidth={true}
            label="Destination"
            variant="outlined"
          />
          <TextField
            value={time}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            fullWidth={true}
            label="Time"
            variant="outlined"
          />
          <TextField
            value={seats}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setSeats(e.target.value);
            }}
            fullWidth={true}
            label="Available Seats"
            variant="outlined"
          />
          <Button
            variant="contained"
            style={{ marginLeft: "11vw" }}
            onClick={async () => {
              axios.put(
                "http://localhost:3000/ridelead/rides/" + ride.id,
                {
                  ridelead: ridelead,
                  description: description,
                  destination: destination,
                  time: time,
                  seats: seats,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              let updatedRide = {
                id: ride.id,
                ridelead: ridelead,
                description: description,
                destination: destination,
                time: time,
                seats: seats,
              };
              setRide(updatedRide);
              alert("Ride Updated");
              navigate("/rides");
            }}
          >
            {" "}
            Update Ride
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: 20 }}
            onClick={async () => {
              axios.delete("http://localhost:3000/ridelead/rides/" + ride.id, {
                headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              });
              alert("Ride Deleted");
              navigate("/rides");
            }}
          >
            {" "}
            Delete Ride
          </Button>
        </div>
      </Card>
    </div>
  );
}

// function RideCard(props) {
//   const ride = props.ride;
//   return (
//     <div
//       style={{
//         display: "flex",
//         marginTop: 50,
//         justifyContent: "center",
//         width: "100%",
//       }}
//     >
//       <Card
//         style={{
//           margin: 10,
//           width: 350,
//           minHeight: 200,
//           borderRadius: 20,
//           marginRight: 50,
//           paddingBottom: 15,
//           zIndex: 2,
//         }}
//       >
//         <div style={{ marginLeft: 10 }}>
//           <Typography variant="h5">{ride.ridelead}</Typography>
//           <Typography variant="h5">{ride.destination}</Typography>
//           <Typography variant="subtitle2" style={{ color: "gray" }}>
//             Time
//           </Typography>
//           <Typography variant="subtitle1">
//             <b> {ride.time} </b>
//           </Typography>
//         </div>
//       </Card>
//     </div>
//   );
// }

export default Ride;
