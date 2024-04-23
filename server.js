// server.js

const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

// Serve index.html for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Execute the shell command
app.get('/execute-command', (req, res) => {
  exec('seq 100 | xargs -P 10 -n 1 -I {} curl -s "http://payment-processor.aws.svc.cluster.local:8080/api/pay"', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      res.status(500).send('Internal Server Error');
      return;
    }
    // Send the output of the command to the client
    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
