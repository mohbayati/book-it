const dbConnect = require("../config/dbConnect");
const rooms = require("../data/rooms");
const Room = require("../models/rooms");
dbConnect();

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Rooms are deleted");

    await Room.insertMany(rooms);
    console.log("Rooms are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};
seedRooms();
