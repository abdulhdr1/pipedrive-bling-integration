import fetch from "node-fetch";

export default function postOrder(blingAPIKey, order) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <pedido>
     <obs>${order.id}</obs>
     <cliente>
     <nome>${order.client}</nome>
     </cliente>
     <transporte>
     <volumes>
     <volume>
     <servico>Correios</servico>
     <codigoRastreamento></codigoRastreamento>
     </volume>
     </volumes>
     </transporte>
     <itens>
     <item>
     <codigo>${Math.random() * 100}</codigo>
     <descricao>${order.title}</descricao>
     <un>Pç</un>
     <qtde>1</qtde>
     <vlr_unit>${order.value}</vlr_unit>
     </item>
     </itens>
     <parcelas>
     <parcela>
     <vlr>${order.value}</vlr>
     </parcela>
     </parcelas>
    </pedido>`;
  let link = `https://bling.com.br/Api/v2/pedido/json/?apikey=${blingAPIKey}&xml=${xml}`;
  fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(`Successo ao adicionar ao bling, ID ${order.id}`);
    })
    .catch((error) => {
      console.error("Error ao adicionar ao bling:", error);
    });
}
