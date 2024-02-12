import htpp from "http";
import { randomUUID } from "crypto";

const PORT = process.env.PORT || 4000;
const users = [
  { id: randomUUID(), username: "James Bond", age: 40, hobbies: ["cars"] },
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
          let newData=JSON.parse(data)
          if (!isValidData(newData)){
            res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              message: "Enter correct data: username — string,  age — number",
            })
          );
          } else {
            const newUser ={id: randomUUID(), username: newData.username, age: newData.age, hobbies: newData.hobbies }
            users.push(newUser);
            res.writeHead(201, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(newUser));
          }
         
          }
        );
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
  const user = validUser(id);
  // user not found
  if (!user) {
    res.writeHead(404, {
      "Content-type": "application/json",
    });
    return res.end(JSON.stringify({ message: "User did not found" }));
  }

  switch (method.toUpperCase().trim()) {
    case "GET":
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      return res.end(JSON.stringify(user));
    case "PUT":
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const { username, age, hobbies } = JSON.parse(data);
        if (isValidData(JSON.parse(data))) {
          user.age = age;
          user.username = username;
          user.hobbies = hobbies;
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(user));
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              message: "Enter correct data: username — string,  age — number",
            })
          );
        }
      });

      break;
    case "DELETE":
       const index = users.findIndex(user=> user.id===id) ;
      if (index !== -1) {  users.splice(index, 1);}
      res.writeHead(204, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "user deleted" }));
    
    default:
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "invalid operation" }));
  }
}

function validUser(id) {
  return users.find((el) => el.id === id);
}

function isValidData(data) {
  if (!data.username || typeof data.username !== "string") return false;
  if (!data.age || typeof data.age !== "number") return false;
  if (!data.hobbies) {
    data.hobbies = [];
  }
  if (typeof data.hobbies !== "object") return false;
  let flag = true;
  data.hobbies.forEach((el) => {
    if (typeof el !== "string") flag = false;
  });
  return flag;
}


