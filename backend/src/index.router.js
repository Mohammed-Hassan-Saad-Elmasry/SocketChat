import { connect } from "../db/connection.js";
import cors from 'cors';

export const bootstarp = (app, express) => {
  app.use(cors());
  app.use(express.json());
  connect();
};
