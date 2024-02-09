import htpp from 'http';

const PORT = process.env.PORT || 4000;
const server=htpp.createServer((req, res)=>{
    res.writeHead(200, {
'Content-type': "text/html; charset=utf-8"
    })
res.end('<h1>server working</h1>');
});

server.listen(PORT, ()=>{console.log('server starting')})