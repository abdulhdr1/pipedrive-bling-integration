import fetch from "node-fetch";

export default async function getOrders(blingAPIKey) {
  let res = await fetch(
    `https://bling.com.br/Api/v2/pedidos/json&apikey=${blingAPIKey}`
  );
  let data = await res.json();
  console.log("Pedidos do bling adquiridos");
  return await data;
}
