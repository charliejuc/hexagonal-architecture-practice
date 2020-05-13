import 'module-alias/register';

import express from "express";
import { setupAuthRouter } from "@/layered-apps/auth/infraestructure/router";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

setupAuthRouter(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("uncaughtException", function uncaughtException(err) {
  console.log(err);
  process.exit(1);
});

process.on("unhandledRejection", function unhandledRejection(err) {
  console.log(err);
  process.exit(1);
});
