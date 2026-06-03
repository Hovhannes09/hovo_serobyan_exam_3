import "dotenv/config";
import express from "express";

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
