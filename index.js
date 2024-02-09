import htpp from "http";

const PORT = process.env.PORT || 4000;
const users = [{ id: 0, name: "James Bond", age: 40, hobbie: ["cars"] }];
let lastID = 0;

const server = htpp.createServer((req, res) => {
  const { method, url } = req;

  res.writeHead(200, {
    "Content-type": "application/json",
  });
  res.write('server starting')
  
  
  switch (url){
    case "/api/users":        
        console.log(url);
        res.write('users')
       /* if ( method === "GET") {
            return res.end(JSON.stringify(users));
          }

         if ( method === "POST") {
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
                lastID += 1;
                const newUser = { id: lastID, name, hobby };
                users.push(newUser);        
                res.writeHead(201, { "Content-Type": "application/json" });
                return res.end(JSON.stringify(newUser));
              }
            });
          }*/

    break;
    default:
        console.log(url);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write('<p> Not Found</p>')
       // res.end(JSON.stringify({ message: 'Not Found' }));   
  }

});

server.listen(PORT, () => {
  console.log("server starting");
});
