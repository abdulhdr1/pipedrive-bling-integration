import fetch from "node-fetch";
import dotenv from "../node_modules/dotenv/config.js";

export default async function getDeals(pipedriveAPIKey) {
  let link = `https://abdulltda.pipedrive.com/v1/deals?api_token=${pipedriveAPIKey}`;
  const res = await fetch(link);
  const data = res.json();
  console.log("Oportunidades do pipedrive adquiridas");
  return await data;
}
