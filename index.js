import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import mongoose from "mongoose";
import getDeals from "./scripts/getDeals.js";
import postOrder from "./scripts/postOrder.js";
import getOrders from "./scripts/getOrders.js";
import updateDB, { getData } from "./scripts/db/updateDB.js";
const port = process.env.PORT || 3000;

const app = express();

const blingAPIKey = process.env.BLING_APIKEY;
const pipedriveAPIKey = process.env.PIPEDRIVE_APIKEY;

mongoose.connect(process.env.MONGO_LINK);

function checkAdded() {
  console.log("Iniciando rotina");
  getOrders(blingAPIKey).then((res) => {
    if (!res.retorno.erros) {
      res.retorno.pedidos.map((order) => {
        alreadyAddedOrders.push(Number(order.pedido.observacoes));
      });
      console.log(`Já foram adicionados os IDs ${alreadyAddedOrders}`);
    } else {
      console.log(res.retorno.erros);
    }
    addNewOnes(alreadyAddedOrders);
  });
}
function addNewOnes(arr) {
  let pendingToDB = [];
  getDeals(pipedriveAPIKey).then((result) => {
    result.data.map((item) => {
      if (item.status == "won" && arr.includes(Number(item.id)) == false) {
        let order = {
          id: item.id,
          client: item.org_id.name,
          value: item.value,
          title: item.title,
          date: {
            year: item.won_time.slice(0, 4),
            month: item.won_time.slice(5, 7),
            day: item.won_time.slice(8, 10),
          },
        };
        postOrder(blingAPIKey, order);
        pendingToDB.push(order);
      }
    });
    setInterval(() => {
      if (pendingToDB[0] == undefined) {
        clearInterval();
      } else {
        updateDB(pendingToDB[0]);
        pendingToDB.shift();
      }
    }, 3000);
  });
  setTimeout(() => {
    console.log("Encerrando rotina");
  }, 500);
}

setInterval(() => {
  alreadyAddedOrders = [];
  console.log(`Realizando a task de rotina`);
  checkAdded();
}, 100000);
let alreadyAddedOrders = [];
checkAdded();

app.get("/dailyreports", (req, res) => {
  getData().then((result) => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log("Backend running on port" + port);
});
