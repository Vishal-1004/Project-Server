const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./routers/router");

// Import the database connection function
const connectDB = require("./db/connection");

const PORT = 4002;

app.use(express.json());
app.use(cors());

// Using routes
app.use(router);

// Call the connectDB function and start the server only on successful connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at Port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });
