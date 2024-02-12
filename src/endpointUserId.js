import { isValidData, validUser } from "./utilData.js";
import { users } from "./users.js";

export function userOper(method, req, res, id) {
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
        if (isValidData(JSON.parse(data))) {
          const { username, age, hobbies } = JSON.parse(data);
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
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        users.splice(index, 1);
      }
      res.writeHead(204, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "user deleted" }));

    default:
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "invalid operation" }));
  }
}
