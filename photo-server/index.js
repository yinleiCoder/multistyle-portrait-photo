const express = require("express");
const path = require("path");

const app = express();
app.set('secret', 'yinleicoder')

app.use(require("cors")());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

require("./plugins/db")(app);
require("./routes/web")(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});
