import { appConfig } from "@/config/environment/index.js";
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: appConfig.DATABASE_URL,
});

const query = (() => pool.query.bind(pool))();

export { query, pool };
