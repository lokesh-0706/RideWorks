const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
const secret = "my-xcecret";

// Define mongoose schemas
const riderSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  received: [{ username: String, rideIdRequested: Number, approved: Number }],
  requested: [
    {
      pickup: String,
      destination: String,
      description: String,
      seats: Number,
      time: String,
      ridelead: String,
      id: Number,
      status: String,
    },
  ],
});

const rideSchema = new mongoose.Schema({
  pickup: String,
  destination: String,
  description: String,
  seats: Number,
  time: String,
  ridelead: String,
  id: Number,
});

// Define mongoose models
const Rider = mongoose.model("Rider", riderSchema);
const Rides = mongoose.model("Rides", rideSchema);

app.use(cors());

const authenticateJson = (req, res, next) => {
  console.log("Hi 16");
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
  } else {
    console.log("Hi 17");
    res.status(401).json();
  }
};

mongoose.connect(
  "mongodb+srv://lokeshkarri2002:Ab1%40178237048@cluster0.p7ebq0x.mongodb.net/rides",
  { dbName: "rides" }
);

//verified - Signup component
app.post("/ridelead/signup", (req, res) => {
  const { username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const obj = { username: username, password: password };
      const newRider = new Rider(obj);
      newRider.save();
      const token = jwt.sign({ username, role: "admin" }, secret, {
        expiresIn: "1H",
      });
      res.status(200).json({ message: "Lead Signed up Succesfully", token });
    }
  }
  Rider.findOne({ username }).then(callback);
});

//verified- Login Component
app.post("/ridelead/login", async (req, res) => {
  const { username, password } = req.headers;
  const rider = await Rider.findOne({ username, password });
  if (rider) {
    const token = jwt.sign({ username, role: "admin" }, secret, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

//verified - Appbar Component
app.get("/ridelead/me", authenticateJson, (req, res) => {
  if (req.user.role != "admin") {
    res.status(401).json({ message: "Admin Does not Exist" });
  } else {
    res.status(200).json({ username: req.user.username });
  }
});

//verified- AddRide Component
app.post("/ridelead/rides", authenticateJson, async (req, res) => {
  if (req.user.role != "admin") {
    res.status(401).json({ message: "Admin Does not Exist" });
  } else {
    const ride = new Rides(req.body);
    ride["ridelead"] = req.user.username;
    const allRides = await Rides.find({});
    if (allRides.length > 0) {
      ride["id"] = allRides[allRides.length - 1]["id"] + 1;
    } else {
      ride["id"] = 1;
    }
    await ride.save();
    res.json({ message: "Ride created successfully", courseId: ride.id });
  }
});

//verified- Update Ride- Ride Component
app.put("/ridelead/rides/:rideId", authenticateJson, async (req, res) => {
  if (req.user.role != "admin") {
    res.status(401).json({ message: "Admin Does not Exist" });
  } else {
    const rideId = req.params.rideId;
    const rideIdMon = await Rides.findOne({ id: rideId });
    const ride = await Rides.findByIdAndUpdate(rideIdMon._id, req.body, {
      new: true,
    });
    if (ride) {
      res.json({ message: "Ride updated successfully" });
    } else {
      res.status(404).json({ message: "Ride not found" });
    }
  }
});

app.delete("/ridelead/rides/:rideId", authenticateJson, async (req, res) => {
  // logic to edit a course
  if (req.user.role != "admin") {
    res.status(401).json({ message: "Admin Does not Exist" });
  } else {
    const rideId = req.params.rideId;
    const rideIdMon = await Rides.findOne({ id: rideId });
    const ride = await Rides.findByIdAndDelete(rideIdMon._id);
    const rideIndex = await Rides.findOne({ id: rideId });
    if (!rideIndex) {
      res.status(200).json({ message: "Ride Deleted successfully" });
    }
  }
});

//verified- My Rides- Rides component
app.get("/ridelead/rides", authenticateJson, async (req, res) => {
  const rides = await Rides.find({});
  var filtrides = rides.filter((a) => a.ridelead == req.user.username);
  res.status(200).json({ rides: filtrides });
});

//verified- Ride Edit- Ride Component
app.get("/ridelead/rides/:rideId", authenticateJson, async (req, res) => {
  // logic to edit a course
  if (req.user.role != "admin") {
    res.status(401).json({ message: "Admin Does not Exist" });
  } else {
    const rideId = req.params.rideId;
    const rideIndex = await Rides.findOne({ id: rideId });
    if (rideIndex) {
      res.json({ ride: rideIndex });
    } else {
      res.status(404).json({ message: "Ride not found" });
    }
  }
});

//verified- Available Rides- Home Component
app.get("/users/rides", authenticateJson, async (req, res) => {
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    const rides = await Rides.find({});
    res.status(200).json({ rides: rides, username: req.user.username });
  }
});

app.post("/users/rides/:rideId", authenticateJson, async (req, res) => {
  // logic to purchase a course
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    const rideId = req.params.rideId;
    const rideIndex = await Rides.findOne({ id: rideId }); //leadid
    const userIndex = await Rider.findOne({ username: req.user.username }); //userid
    if (userIndex) {
      if (!userIndex["requested"]) {
        userIndex["requested"] = [];
      }
      const ind = userIndex["requested"].findIndex((a) => a["id"] == rideId);
      if (ind == -1) {
        userIndex["requested"].push({
          pickup: rideIndex.pickup,
          description: rideIndex.description,
          destination: rideIndex.destination,
          time: rideIndex.time,
          seats: rideIndex.seats,
          ridelead: rideIndex.ridelead,
          id: rideIndex.id,
        });
        const newind = userIndex["requested"].findIndex(
          (a) => a["id"] == rideId
        );
        userIndex["requested"][newind]["status"] = "Waiting For Approval";
        const indx = await Rider.findOne({ username: rideIndex.ridelead });
        if (!indx["received"]) {
          indx["received"] = [];
        }
        indx["received"].push({
          username: userIndex.username,
          rideIdRequested: rideId,
          approved: 0,
        });
        await userIndex.save();
        await indx.save();
      }
    }
    res.status(200).json({ message: "Ride requested successfully" });
  }
});

app.get("/users/requestedRides", authenticateJson, async (req, res) => {
  // logic to view purchased courses
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    const userIndex = await Rider.findOne({ username: req.user.username });
    res.status(200).json({ requestedRides: userIndex["requested"] || [] });
  }
});

app.post("/users/approveRide", authenticateJson, async (req, res) => {
  // logic to view purchased courses
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    const username = req.body.username;
    const rideId = req.body.rideId;
    const rideleadname = req.user.username;

    const rideleadIndex = await Rider.findOne({ username: rideleadname });
    const userIndex = await Rider.findOne({ username: username });
    const requestedRide = userIndex["requested"].findIndex(
      (a) => a["id"] == rideId
    );
    // const seatIndex= RIDER[rideleadIndex].findIndex((a)=>a.)

    const requester = rideleadIndex["received"].findIndex(
      (a) => a.username == username && a.rideIdRequested == rideId
    );
    rideleadIndex["received"][requester]["approved"] = 1;
    userIndex["requested"][requestedRide]["status"] = "Approved";
    const seatIndex = await Rides.findOne({ id: rideId });
    seatIndex["seats"] = seatIndex["seats"] - 1;
    await seatIndex.save();
    await rideleadIndex.save();
    await userIndex.save();
    res.status(200).json({ requestedRides: userIndex["requested"] || [] });
  }
});

app.post("/users/rejectRide", authenticateJson, async (req, res) => {
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    const username = req.body.username;
    const rideId = req.body.rideId;
    const rideleadname = req.user.username;
    const rideleadIndex = await Rider.findOne({ username: rideleadname });
    const userIndex = await Rider.findOne({ username: username });
    const requestedRide = userIndex["requested"].findIndex(
      (a) => a["id"] == rideId
    );
    const requester = rideleadIndex["received"].findIndex(
      (a) => a.username == username && a.rideIdRequested == rideId
    );
    rideleadIndex["received"][requester]["approved"] = -1;
    userIndex["requested"][requestedRide]["status"] = "Rejected";
    await rideleadIndex.save();
    await userIndex.save();
    res.status(200).json({ requestedRides: userIndex["requested"] || [] });
  }
});

app.post("/users/cancelRequest", authenticateJson, async (req, res) => {
  // logic to cancel request
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    const rideleadname = req.body.username;
    const rideId = req.body.rideId;
    const username = req.user.username;
    const rideleadIndex = await Rider.findOne({ username: rideleadname });
    const userIndex = await Rider.findOne({ username: username });
    const requestedRide = userIndex["requested"].findIndex(
      (a) => a["id"] == rideId
    );
    const requester = rideleadIndex["received"].findIndex(
      (a) => a.username == username && a.rideIdRequested == rideId
    );
    const seatIndex = await Rides.findOne({ id: rideId });
    if (rideleadIndex["received"][requester]["approved"] == 1) {
      seatIndex["seats"] = seatIndex["seats"] + 1;
      await seatIndex.save();
    }
    rideleadIndex["received"][requester]["approved"] = -2;
    userIndex["requested"][requestedRide]["status"] = "Request Cancelled";
    await rideleadIndex.save();
    await userIndex.save();
    res.status(200).json({ requestedRides: userIndex["requested"] || [] });
  }
});

app.get("/users/receivedRequests", authenticateJson, async (req, res) => {
  // logic to view purchased courses
  if (req.user.role != "admin") {
    res.status(401).json({ message: "User Does not Exist" });
  } else {
    const userIndex = await Rider.findOne({ username: req.user.username });

    res.status(200).json({ receivedRequests: userIndex["received"] || [] });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
