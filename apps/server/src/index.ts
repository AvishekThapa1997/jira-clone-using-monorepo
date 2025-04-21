import app from "./app.js";
import { appConfig } from "./config/environment/index.js";
const PORT = appConfig.PORT;
const environment = appConfig.NODE_ENV;
console.log(`Server is starting in ${environment} environment`);
app.listen(PORT, () =>
  console.log(`SERVER STARTED AT PORT ${PORT} for ${environment}`)
);
