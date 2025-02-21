import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "./src/app";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT!;
const APP_URL = process.env.APP_URL!;

export default async(req:VercelRequest,res:VercelResponse)=>{
  try {
    await app.ready();
    app.server.emit('request', req, res);
  } catch (error) {
    console.error('Error during request handling:', error);
    res.status(500).send('Internal Server Error');
  }
}
const start = async () => {
  try {
    await app.listen({ port: Number(PORT), host: "0.0.0.0" });
    console.log(`Server is running on ${APP_URL}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};
start();
