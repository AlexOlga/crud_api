import htpp from "http";
import { randomUUID } from "crypto";

const PORT = process.env.PORT || 4000;
const users = [
  { id: randomUUID(), name: "James Bond", age: 40, hobbie: ["cars"] },
];

const server = htpp.createServer((req, res) => {
  const { method, url } = req;

  switch (url) {
    case "/":
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      return res.end(JSON.stringify({ message: "main page" }));
      break;
    case "/api/users":
      if (method === "GET") {
        res.writeHead(200, {
          "Content-type": "application/json",
        });
        return res.end(JSON.stringify(users));
      }

      if (method === "POST") {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          const { name, age, hobbie } = JSON.parse(data);
          if (!name || !age) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ message: "Name and email are required fields" })
            );
          } else {
            const hobby = hobbie || [];
            const newUser = { id: randomUUID(), name, hobby };
            users.push(newUser);
            res.writeHead(201, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(newUser));
          }
        });
      }
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

function userOper(method, req, res, id) {
  switch (method.toUpperCase().trim()) {
    case "GET":
      const user = validUser(id);
      if (user) {
        res.writeHead(200, {
          "Content-type": "application/json",
        });
        return res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, {
          "Content-type": "application/json",
        });
        return res.end(JSON.stringify({ message: "User did not found" }));
      }
      break;
    case "PUT":
      break;
    case "DELETE":
      break;
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "invalid operation" }));
    default:
  }
}

function validUser(id) {
  return users.find((el) => el.id === id);
}
