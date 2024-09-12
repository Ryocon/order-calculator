import http from "http";
import { getData } from "./script.js";
import inquirer from "inquirer";

// server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello Cake\n");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// delay for prompt looping
// set to two seconds to allow for retries making sure it appears below the API output each time
let delay = 2000;

// user prompt using inquirer to allow repeated use of the API in the terminal
function promptUser() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "run",
        message: "Fetch orders?",
      },
    ])
    .then((answers) => {
      if (answers.run) {
        getData().then(() => {
          setTimeout(function () {
            promptUser();
          }, delay);
        });
      } else {
        console.log("Goodbye!");
      }
    });
}

promptUser();
