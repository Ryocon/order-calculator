import fetch from "node-fetch";

// fetch function using node-fetch
// using node-fetch and a node.js server due to CORS and then CORB errors when using vanilla JavaScript fetch functions
// making a local server was a solution to this issue
export async function getData(retries = 3) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("https://fauxdata.codelayer.io/api/orders", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const orders = result.orders;
      let total = 0;
      let customers = 0;

      orders.forEach((order) => {
        let orderTotal = 0;

        order.items.forEach((item) => {
          orderTotal += parseFloat(item.price);
        });

        console.log(
          `Customer: ${order.customer.name}, Total spent: ${orderTotal}`
        );

        total += orderTotal;
        customers++;
      });

      const average = total / customers;
      console.log(`Average amount spent: ${average.toFixed(2)}`);

      return;
    })

    .catch(async (error) => {
      console.error("Something went wrong!");

      if (retries > 0) {
        console.log(`lets try again... (${retries} attempts left)`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        getData(retries - 1);
      } else {
        console.log(`It's dead Jim`);
      }
    });
}
