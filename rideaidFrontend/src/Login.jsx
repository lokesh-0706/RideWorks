import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import logo from "C:/Users/Lokesh Karri/Downloads/logo_final.jpg";
import "./fonts/Comfortaa.ttf";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ width: "100vw", textAlign: "center" }} className="font-face-gm">
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
          }}
        />
      </div>

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
        <Card varint={"outlined"} style={{ width: 350, padding: 30 }}>
          <TextField
            onChange={(evant11) => {
              let elemt = evant11.target;
              setUsername(elemt.value);
            }}
            fullWidth={true}
            label="Username"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />

          <Button
            style={{
              backgroundColor: "#427D9D",
              color: "white",
              marginLeft: 120,
            }}
            size={"large"}
            variant="contained"
            onClick={async () => {
              const res = await axios.post(
                "http://localhost:3000/ridelead/login",
                {},
                {
                  headers: {
                    "Content-type": "application/json",
                    username: username,
                    password: password,
                  },
                }
              );
              const data = res.data;

              localStorage.setItem("token", data.token);
              window.location = "/home";
            }}
          >
            {" "}
            Login
          </Button>
          {/* <br />
          <br />
          <p>
            <p
              onClick={() => {
                navigate("/signup");
              }}
              style={{
                textDecoration: "underline",
              }}
            >
              Sign Up
            </p>
          </p> */}
        </Card>
      </div>
    </div>
  );
}

export default Signin;
