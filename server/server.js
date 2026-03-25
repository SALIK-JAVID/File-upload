const express = require('express')
const uploadRoutes = require("./routes/uploadRoutes");
const cors = require("cors");


const app = express()
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]

}
));
const port = 3000

app.get('/', (req, res) => {
  res.send('Server is running on port 3000')
})

app.use("/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})