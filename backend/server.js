const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Import and use your test route
const testRoutes = require("./routes/testRoutes");
app.use("/api", testRoutes);

app.get("/", (req, res) => {
  res.send("CraftCart AI backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
