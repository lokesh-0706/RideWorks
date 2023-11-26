import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

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

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
          zIndex: 0,
          backgroundColor: "#164863",
        }}
        className="font-face-gm"
      >
        <div style={{ marginLeft: 10 }}>
          {/* <Typography
            style={{ color: "white" }}
            onClick={() => {
              navigate("/home");
            }}
            variant={"h6"}
          >
            HOME
          </Typography> */}
          <img
            src="/images/logo_final.jpg"
            style={{
              width: 130,
              height: 35,
              border: "solid 2px #0076A8",
              borderRadius: 5,
            }}
            onClick={() => {
                navigate("/home");
              }}
          />
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button
                style={{ color: "white" }}
                onClick={() => {
                  navigate("/add");
                }}
              >
                Add Ride
              </Button>
            </div>

            <div style={{ marginRight: 10 }}>
              <Button
                style={{ color: "white" }}
                onClick={() => {
                  navigate("/rides");
                }}
              >
                My Rides
              </Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button
                style={{ color: "white" }}
                onClick={() => {
                  navigate("/requestRides");
                }}
              >
                Requested Rides
              </Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button
                style={{ color: "white" }}
                onClick={() => {
                  navigate("/receivedRequest");
                }}
              >
                Received Requests
              </Button>
            </div>
            <Button
              style={{
                backgroundColor: "#427D9D",
                color: "white",
              }}
              variant={"contained"}
              onClick={() => {
                localStorage.setItem("token", null);
                window.location = "/";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
          zIndex: 0,
          backgroundColor: "#164863",
        }}
      >
        <div style={{ color: "white", marginLeft: 10 }}>
          <Typography variant={"h6"}>RideWorks</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              style={{
                backgroundColor: "#427D9D",
                color: "white",
              }}
              variant={"contained"}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </Button>
          </div>
          <div>
            <Button
              style={{
                backgroundColor: "#427D9D",
                color: "white",
              }}
              variant={"contained"}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Appbar;
