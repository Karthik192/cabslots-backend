import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 7000 });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("[Server] Received message: %s", data);
  });

  ws.send(
    JSON.stringify([
      {
        name: "Ola",
        cabsnumber: parseInt(Math.random() * 100)
          .toString()
          .padStart(2, "0"),
        bookingtype: "App Based",
        fare: "App Based",
      },
      {
        name: "Uber",
        cabsnumber: parseInt(Math.random() * 100)
          .toString()
          .padStart(2, "0"),
        bookingtype: "App Based",
        fare: "App Based",
      },
      {
        name: "Ohm",
        cabsnumber: parseInt(Math.random() * 100)
          .toString()
          .padStart(2, "0"),
        bookingtype: "Counter",
        fare: "Starts from Rs 1000 till 20Kms Add’l. 16/- per km.",
      },
      {
        name: "Meeru",
        cabsnumber: parseInt(Math.random() * 100)
          .toString()
          .padStart(2, "0"),
        bookingtype: "Counter",
        fare: "Starts from Rs 1000 till 20Kms Add’l. 16/- per km.",
      },
      {
        name: "Skycab",
        cabsnumber: parseInt(Math.random() * 100)
          .toString()
          .padStart(2, "0"),
        bookingtype: "Counter",
        fare: "Starts from Rs 1000 till 20Kms Add’l. 16/- per km.",
      },
    ])
  );

  const sendDataToClient = (data) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    } else {
      console.log("Client connection is not open, cannot send data");
    }
  };

  var intervalId = setInterval(() => {
    console.log("Updating the data...");
    const newData = [
      {
        name: "Ola",
        cabsnumber: parseInt(Math.random() * 100)
          .toString()
          .padStart(2, "0"),
        bookingtype: "App Based",
        fare: "App Based",
      },
      {
        name: "Uber",
        cabsnumber: parseInt(Math.random() * 100)
          .toString()
          .padStart(2, "0"),
        bookingtype: "App Based",
        fare: "App Based",
      },
      {
        name: "Ohm",
        cabsnumber: parseInt(Math.random() * 100)
          .toString()
          .padStart(2, "0"),
        bookingtype: "Counter",
        fare: "Starts from Rs 1000 till 20Kms Add’l. 16/- per km.",
      },
      {
        name: "Meeru",
        cabsnumber: parseInt(Math.random() * 100)
          .toString()
          .padStart(2, "0"),
        bookingtype: "Counter",
        fare: "Starts from Rs 1000 till 20Kms Add’l. 16/- per km.",
      },
      {
        name: "Skycab",
        cabsnumber: parseInt(Math.random() * 100)
          .toString()
          .padStart(2, "0"),
        bookingtype: "Counter",
        fare: "Starts from Rs 1000 till 20Kms Add’l. 16/- per km.",
      },
    ];
    sendDataToClient(newData);
  }, 10000); // refresh every 10 seconds

  ws.on("close", () => {
    clearInterval(intervalId);
    console.log("connection closed!!!");
  });
});
