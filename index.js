import htpp from "http";
import { userOper } from "./src/endpointUserId.js";
import { endpointUsers } from "./src/endpointUsers.js";

const PORT = process.env.PORT || 4000;

const server = htpp.createServer((req, res) => {
  const { method, url } = req;

  switch (url) {
    case "/":
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      return res.end(JSON.stringify({ message: "main page" }));

    case "/api/users":
      endpointUsers(method, req, res);
      break;
    default:
      if (url.startsWith("/api/users/")) {
        const id = url.split("/")[3];
        userOper(method, req, res, id);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Not Found" }));
      }
  }
});

server.listen(PORT, () => {
  console.log("server starting");
});
