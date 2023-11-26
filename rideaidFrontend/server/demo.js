const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());

// let RIDELEAD = [];
let RIDER = [];
let RIDES = [];

try {
  //   RIDELEAD = JSON.parse(fs.readFileSync(__dirname + "/ridelead.json", "utf-8"));
  RIDER = JSON.parse(fs.readFileSync(__dirname + "/rider.json", "utf-8"));
  RIDES = JSON.parse(fs.readFileSync(__dirname + "/rides.json", "utf-8"));
} catch {
  //   RIDELEAD = [];
  //   console.log("empty");
  RIDER = [];
  RIDES = [];
}
app.use(cors());
const secret = "my-xcecret";

const authenticateJson = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        res.status(403).json();
      }
      req.user = user;
      next();
    });
  }
  res.status(401).json();
};

// Admin routes
app.post("/ridelead/signup", (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  console.log(RIDER);
  const admin = RIDER.find((a) => a.username == username);
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const newAdmin = { username, password };
    RIDER.push(newAdmin);
    console.log(RIDER);
    fs.writeFileSync(__dirname + "/rider.json", JSON.stringify(RIDER));
    const token = jwt.sign({ username, role: "admin" }, secret, {
      expiresIn: "1H",
    });
    res.status(200).json({ message: "Lead Signed up Succesfully", token });
  }
});

app.post("/ridelead/login", (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  const admin = RIDER.find(
    (a) => a.username == username && a.password == password
  );
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, secret, {
      expiresIn: "1H",
    });
    res.status(200).json({ message: "Admin Logged in Succesfully", token });
  } else {
    res.status(403).json({ message: "Admin does not exists" });
  }
});

app.get("/ridelead/me", authenticateJson, (req, res) => {
  if (req.user.role != "admin") {
    res.status(401).json({ message: "Admin Does not Exist" });
  } else {
    res.status(200).json({ username: req.user.username });
  }
});

app.post("/ridelead/rides", authenticateJson, (req, res) => {
  // logic to create a course

  if (req.user.role != "admin") {
    res.status(401).json({ message: "Admin Does not Exist" });
  } else {
    const ride = req.body;
    ride["ridelead"] = req.user.username;
    if (RIDES.length > 0) {
      ride["id"] = RIDES[RIDES.length - 1]["id"] + 1;
    } else {
      ride["id"] = 1;
    }
    RIDES.push(ride);
    fs.writeFileSync(__dirname + "/rides.json", JSON.stringify(RIDES));
    res
      .status(200)
      .json({ message: "Ride created successfully", rideId: ride["id"] });
  }
});

app.put("/ridelead/rides/:rideId", authenticateJson, (req, res) => {
  // logic to edit a course
  if (req.user.role != "admin") {
    res.status(401).json({ message: "Admin Does not Exist" });
  } else {
    const rideId = req.params.rideId;
    const rideIndex = RIDES.findIndex((a) => a["id"] == rideId);
    if (rideIndex > -1) {
      RIDES[rideIndex] = { ...RIDES[rideIndex], ...req.body };
      fs.writeFileSync(__dirname + "/rides.json", JSON.stringify(RIDES));
    }
    console.log(rideId);
    res.status(200).json({ message: "Ride updated successfully" });
  }
});

app.delete("/ridelead/rides/:rideId", authenticateJson, (req, res) => {
  // logic to edit a course
  if (req.user.role != "admin") {
    res.status(401).json({ message: "Admin Does not Exist" });
  } else {
    const rideId = req.params.rideId;
    const rideIndex = RIDES.findIndex((a) => a["id"] == rideId);
    if (rideIndex > -1) {
      RIDES = RIDES.filter((a) => a.id != rideId);
      fs.writeFileSync(__dirname + "/rides.json", JSON.stringify(RIDES));
    }
    res.status(200).json({ message: "Ride Deleted successfully" });
  }
});

app.get("/ridelead/rides", authenticateJson, (req, res) => {
  // logic to get all courses
  if (req.user.role != "admin") {
    res.status(401).json({ message: "Admin Does not Exist" });
  } else {
    console.log(req.user);
    var filtrides = RIDES.filter((a) => a.ridelead == req.user.username);
    res.status(200).json({ rides: filtrides });
  }
});
app.get("/ridelead/rides/:rideId", authenticateJson, (req, res) => {
  // logic to edit a course
  if (req.user.role != "admin") {
    res.status(401).json({ message: "Admin Does not Exist" });
  } else {
    const rideId = req.params.rideId;
    const rideIndex = RIDES.findIndex((a) => a["id"] == rideId);
    if (rideIndex > -1) {
      res.json({ ride: RIDES[rideIndex] });
    }
    console.log(rideId);
    res.status(200).json({ message: "Ride fetched successfully" });
  }
});

// User routes
// app.post("/users/signup", (req, res) => {
//   // logic to sign up user
//   const { username, password } = req.body;
//   const user = RIDER.find((a) => a.username == username);
//   if (user) {
//     res.status(403).json({ message: "User already exists" });
//   } else {
//     const newUser = { username, password };
//     RIDER.push(newUser);
//     fs.writeFileSync(__dirname + "/rider.json", JSON.stringify(RIDER));
//     const token = jwt.sign({ username, role: "admin" }, secret, {
//       expiresIn: "1H",
//     });
//     res.status(200).json({ message: "User Signed up Succesfully", token });
//   }
// });

// app.post("/users/login", (req, res) => {
//   // logic to log in user
//   const { username, password } = req.headers;
//   const user = RIDER.find(
//     (a) => a.username == username && a.password == password
//   );
//   if (user) {
//     const token = jwt.sign({ username, role: "admin" }, secret, {
//       expiresIn: "1H",
//     });
//     res.status(200).json({ message: "User Logged in Succesfully", token });
//   } else {
//     res.status(403).json({ message: "User does not exists" });
//   }
// });

app.get("/users/rides", authenticateJson, (req, res) => {
  // logic to list all courses
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    res.status(200).json({ rides: RIDES, username: req.user.username });
  }
});

app.post("/users/rides/:rideId", authenticateJson, (req, res) => {
  // logic to purchase a course
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    const rideId = req.params.rideId;
    const rideIndex = RIDES.findIndex((a) => a["id"] == rideId); //leadid
    const userIndex = RIDER.findIndex((a) => a.username == req.user.username); //userid
    if (userIndex > -1) {
      if (!RIDER[userIndex]["requested"]) {
        RIDER[userIndex]["requested"] = [];
      }
      const ind = RIDER[userIndex]["requested"].findIndex(
        (a) => a["id"] == rideId
      );
      if (ind == -1) {
        RIDES[rideIndex]["status"] = "Waiting For Approval";
        RIDER[userIndex]["requested"].push(RIDES[rideIndex]);
        const indx = RIDER.findIndex(
          (a) => a["username"] == RIDES[rideIndex].ridelead
        );
        console.log(RIDER[userIndex]);
        console.log(RIDER[indx]);
        if (!RIDER[indx]["received"]) {
          RIDER[indx]["received"] = [];
        }
        RIDER[indx]["received"].push({
          username: RIDER[userIndex].username,
          rideIdRequested: rideId,
          approved: 0,
        });
      }

      fs.writeFileSync(__dirname + "/rider.json", JSON.stringify(RIDER));
    }
    res.status(200).json({ message: "Ride requested successfully" });
  }
});

app.get("/users/requestedRides", authenticateJson, (req, res) => {
  // logic to view purchased courses
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    const userIndex = RIDER.findIndex((a) => a.username == req.user.username);

    res
      .status(200)
      .json({ requestedRides: RIDER[userIndex]["requested"] || [] });
  }
});
app.post("/users/approveRide", authenticateJson, (req, res) => {
  // logic to view purchased courses
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    console.log("entry");
    const username = req.body.username;
    const rideId = req.body.rideId;
    const rideleadname = req.user.username;
    const rideleadIndex = RIDER.findIndex((a) => a.username == rideleadname);
    const userIndex = RIDER.findIndex((a) => a.username == username);
    const requestedRide = RIDER[userIndex]["requested"].findIndex(
      (a) => a["id"] == rideId
    );
    // const seatIndex= RIDER[rideleadIndex].findIndex((a)=>a.)

    const requester = RIDER[rideleadIndex]["received"].findIndex(
      (a) => a.username == username && a.rideIdRequested == rideId
    );
    RIDER[rideleadIndex]["received"][requester]["approved"] = 1;
    RIDER[userIndex]["requested"][requestedRide]["status"] = "Approved";
    const seatIndex = RIDES.findIndex((a) => a.id == rideId);
    RIDES[seatIndex]["seats"] = parseInt(RIDES[seatIndex]["seats"]) - 1;
    fs.writeFileSync(__dirname + "/rider.json", JSON.stringify(RIDER));
    fs.writeFileSync(__dirname + "/rides.json", JSON.stringify(RIDES));
    res
      .status(200)
      .json({ requestedRides: RIDER[userIndex]["requested"] || [] });
  }
});

app.post("/users/rejectRide", authenticateJson, (req, res) => {
  // logic to view purchased courses
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    console.log("entry");
    const username = req.body.username;
    const rideId = req.body.rideId;
    const rideleadname = req.user.username;
    const rideleadIndex = RIDER.findIndex((a) => a.username == rideleadname);
    const userIndex = RIDER.findIndex((a) => a.username == username);
    const requestedRide = RIDER[userIndex]["requested"].findIndex(
      (a) => a["id"] == rideId
    );
    const requester = RIDER[rideleadIndex]["received"].findIndex(
      (a) => a.username == username && a.rideIdRequested == rideId
    );
    RIDER[rideleadIndex]["received"][requester]["approved"] = -1;
    RIDER[userIndex]["requested"][requestedRide]["status"] = "Rejected";
    fs.writeFileSync(__dirname + "/rider.json", JSON.stringify(RIDER));
    res
      .status(200)
      .json({ requestedRides: RIDER[userIndex]["requested"] || [] });
  }
});

app.post("/users/cancelRequest", authenticateJson, (req, res) => {
  // logic to cancel request
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    console.log("Hi");
    const rideleadname = req.body.username;
    const rideId = req.body.rideId;
    const username = req.user.username;
    const rideleadIndex = RIDER.findIndex((a) => a.username == rideleadname);
    const userIndex = RIDER.findIndex((a) => a.username == username);
    const requestedRide = RIDER[userIndex]["requested"].findIndex(
      (a) => a["id"] == rideId
    );
    const requester = RIDER[rideleadIndex]["received"].findIndex(
      (a) => a.username == username && a.rideIdRequested == rideId
    );
    const seatIndex = RIDES.findIndex((a) => a.id == rideId);
    if (RIDER[rideleadIndex]["received"][requester]["approved"] == 1) {
      RIDES[seatIndex]["seats"] = parseInt(RIDES[seatIndex]["seats"]) + 1;
      fs.writeFileSync(__dirname + "/rides.json", JSON.stringify(RIDES));
    }
    RIDER[rideleadIndex]["received"][requester]["approved"] = -2;
    RIDER[userIndex]["requested"][requestedRide]["status"] =
      "Request Cancelled";
    fs.writeFileSync(__dirname + "/rider.json", JSON.stringify(RIDER));
    res
      .status(200)
      .json({ requestedRides: RIDER[userIndex]["requested"] || [] });
  }
});

app.get("/users/receivedRequests", authenticateJson, (req, res) => {
  // logic to view purchased courses
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    const userIndex = RIDER.findIndex((a) => a.username == req.user.username);
    //   const receivedRequests = RIDES.map((a) => RIDER[userIndex]["received"]);

    res
      .status(200)
      .json({ receivedRequests: RIDER[userIndex]["received"] || [] });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
