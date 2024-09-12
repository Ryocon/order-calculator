import http from "http";
import { getData } from './script.js'
import inquirer from "inquirer";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello Cake\n");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});


inquirer.prompt([
    {
        type: 'input',
        name: 'run',
        message: 'Press any key to run orders',
        
    },
])
.then(answers => {
    if (answers) {
        getData()
    }
})