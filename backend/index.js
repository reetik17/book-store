const express = require("express");
const app = express();
const PORT = 1000;
const cors = require("cors");
require("./connection/conn");

const bookRoute = require("./routes/booksRoutes");
const userRoute = require("./routes/userRoutes");
app.use(cors());
app.use(express.json());

app.use("/api/v1/", bookRoute);
app.use("/api/v1/", userRoute);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
