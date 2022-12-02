import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import repo from "../../../controllers/roomController";

const handler = nc();

dbConnect();

handler.get(repo.allRooms);
handler.post(repo.newRoom);

export default handler;
