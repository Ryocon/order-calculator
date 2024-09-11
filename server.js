import http from "http";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello Cake\n");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

function getData() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };
  
    fetch("https://fauxdata.codelayer.io/api/orders", requestOptions)
      .then(response => response.text()) 
      .then(result => console.log(result))  
      .catch(error => console.log('error', error));
  }

  getData()