import { appConfig } from "@/config/environment/index.js";

export const isDevEnvironment = () => {
  return appConfig.NODE_ENV === "development";
};
