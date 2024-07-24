import { WebSocket, WebSocketServer } from "ws";
import sql from "mssql";

const wss = new WebSocketServer({ port: 7000 });

const config = {
  user: "sa",
  password: "Welcome@123",
  server: "localhost", // 224
  database: "cabdev",
  options: {
    encrypt: false,
  },
};

const getUpdatedData = async () => {
  const connection = await sql.connect(config);
  console.log("Connected to db...");

  const query = "SELECT * FROM vehicledetails";

  const result = connection.request().query(query);

  const data = (await result).recordset;

  console.log(data);

  return data;
};

const injectUpdatedData = (data) =>
  data.map((item) => {
    return {
      sno: item["sno"],
      name: item["cabtype"],
      cabsnumber: item["cabcount"].toString().padStart(2, "0"),
      bookingtype: item["bookingtype"],
      fare: item["fare"],
      isactive: item["isactive"],
    };
  });

const getData = async () => {
  return injectUpdatedData(await getUpdatedData());
};

wss.on("connection", async function connection(ws) {
  ws.on("message", function message(data) {
    console.log("[Server] Received message: %s", data);
  });

  console.log(await getData());
  ws.send(JSON.stringify(await getData()));

  const sendDataToClient = (data) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    } else {
      console.log("Client connection is not open, cannot send data");
    }
  };

  setInterval(async () => {
    console.log("Updating the data...");
    const newData = await getData();
    sendDataToClient(newData);
  }, 10000); // refresh every 10 seconds

  ws.on("close", () => {
    console.log("connection closed!!!");
  });
});
// [
//   {
//     name: "Ola",
//     cabsnumber: parseInt(Math.random() * 100)
//       .toString()
//       .padStart(2, "0"),
//     bookingtype: "App Based",
//     fare: "App Based",
//   },
//   {
//     name: "Uber",
//     cabsnumber: parseInt(Math.random() * 100)
//       .toString()
//       .padStart(2, "0"),
//     bookingtype: "App Based",
//     fare: "App Based",
//   },
//   {
//     name: "Ohm",
//     cabsnumber: parseInt(Math.random() * 100)
//       .toString()
//       .padStart(2, "0"),
//     bookingtype: "Counter",
//     fare: "Starts from Rs 1000 till 20Kms Add’l. 16/- per km.",
//   },
//   {
//     name: "Meeru",
//     cabsnumber: parseInt(Math.random() * 100)
//       .toString()
//       .padStart(2, "0"),
//     bookingtype: "Counter",
//     fare: "Starts from Rs 1000 till 20Kms Add’l. 16/- per km.",
//   },
//   {
//     name: "Skycab",
//     cabsnumber: parseInt(Math.random() * 100)
//       .toString()
//       .padStart(2, "0"),
//     bookingtype: "Counter",
//     fare: "Starts from Rs 1000 till 20Kms Add’l. 16/- per km.",
//   },
// ];
``;
