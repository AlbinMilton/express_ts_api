import dotenv from "dotenv";
import { createApp } from "./app";
import { pool } from "./config/db";

dotenv.config();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const app = createApp();
pool
  .connect()
  .then(() => {
    console.log("✅ DB Connected");
  })
  .catch((e) => {
    console.error(e);
  });
app.listen(PORT, () => {
  console.log(`🚀✅Server is running on http://localhost:${PORT}`);
});
