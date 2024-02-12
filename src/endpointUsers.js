import { users } from './users.js'
import { isValidData} from './utilData.js';
import { randomUUID } from "crypto";

export function endpointUsers(method, req, res) {
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

          if (isValidData(JSON.parse(data))) {
            const { username, age, hobbies } = JSON.parse(data);
            const newUser = { id: randomUUID(), username, age, hobbies }
            users.push(newUser)
            res.writeHead(201, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({
              message: "User create",
            }));
          } else {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(
              JSON.stringify({
                message: "Enter correct data: username — string,  age — number",
              })
            );
          }
        });
      }

}