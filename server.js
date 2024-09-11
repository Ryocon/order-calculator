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


// fetch function
function getData() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };
  
    fetch("https://fauxdata.codelayer.io/api/orders", requestOptions)
      .then(response => response.json()) 
      .then(result => {

        const orders = result.orders
        let total = 0
        let customers = 0

        orders.forEach(order => {
            let orderTotal = 0

            order.items.forEach(item => {
                orderTotal += parseFloat(item.price)
            })

            console.log(`Customer: ${order.customer.name}, Total spent: ${orderTotal}`)

            total += orderTotal
            customers++

            
        })

        const average = total / customers
            console.log(`Average amount spent: ${average.toFixed(2)}`)

        // console.log(result.orders.items)
        // console.log(result)
        // for (let i = 0; i < result.orders.length; i++) {
        //     console.log(result.orders[i].items)
        // }


      } 
    )  

      .catch(error => console.log('error', error)
    
    );
  }

  getData()