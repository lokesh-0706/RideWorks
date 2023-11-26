import { Button, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import "./fonts/Comfortaa.ttf";

function Signup() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  return (
    <div>
      <div
        style={{ width: "100vw", textAlign: "center" }}
        className="font-face-gm"
      >
        {" "}
        <img
          src="/images/logo_final.jpg"
          alt=""
          srcset=""
          style={{
            width: 410,
            height: 100,
            marginTop: "6vh",
            marginBottom: 30,
            border: "2px solid #61A3BA",
            borderRadius: 5,
            // marginLeft: 538,
            // display: "flex",
            // justifyContent: "center",
          }}
        />
      </div>
      {/* <div
        style={{ display: "flex", justifyContent: "center", paddingTop: 50 }}
      >
        <Typography variant="h5">Welcome to RideWorks.</Typography>
      </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url("/images/bg1_blue.jpg")`,
          backgroundSize: "contain",
          width: 500,
          // height: 300,
          padding: 50,
          marginLeft: 330,
        }}
      >
        <Card variant="outlined">
          <div
            style={{
              width: 350,
              padding: 30,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              fullWidth
              onChange={(e) => [setUsername(e.target.value)]}
              value={username}
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => [setPassword(e.target.value)]}
            />
            <br />
            <br />
            <Button
              style={{
                backgroundColor: "#427D9D",
                color: "white",
                marginLeft: 120,
              }}
              variant="contained"
              onClick={async () => {
                try {
                  const res = await axios.post(
                    "http://localhost:3000/ridelead/signup",
                    {
                      username,
                      password,
                    }
                  );
                  // localStorage.setItem("token", res.data.token);
                  setPassword("");
                  setUsername("");
                  alert("User Signed Up Succesfully. Please Login to continue");
                  window.location = "/login";
                } catch (error) {
                  console.log(error.message);
                }
              }}
            >
              Register
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
