import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import repo from "../../../controllers/roomController";

import onError from "../../../middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.get(repo.allRooms);
handler.post(repo.newRoom);

export default handler;
