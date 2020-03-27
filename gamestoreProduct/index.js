const express = require("express");
const app = express();

app.use(express.static(process.cwd() + "/public"));
app.get("/*", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(4000, () => console.log("Listening on port 4000"));
