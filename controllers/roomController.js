import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catchAsyncError";
import ApiFeatuers from "../middlewares/apiFeatures";

const Room = require("../models/rooms");

const allRooms = catchAsyncError(async (req, res) => {
  const resPerPage = 4;
  const roomsCount = await Room.countDocuments();

  const apiFeatuers = new ApiFeatuers(Room.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  let rooms = await apiFeatuers.query;

  res.status(200).json({
    success: true,
    roomsCount,
    resPerPage,
    rooms,
  });
});

const newRoom = catchAsyncError(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(200).json({
    success: true,
    room,
  });
});

const getSingleRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }
  res.status(200).json({
    success: true,
    room,
  });
});

const updateRoom = catchAsyncError(async (req, res, next) => {
  let room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

const deleteRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }

  await room.remove();

  res.status(200).json({
    success: true,
    message: "Room is deleted.",
  });
});

const repo = { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
export default repo;
