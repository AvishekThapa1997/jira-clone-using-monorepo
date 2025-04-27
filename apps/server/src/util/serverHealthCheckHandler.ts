import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { requestHandler } from "./requestHandler.js";

export const serverHealtCheckHandler = requestHandler(async () => {
  return {
    status: StatusCodes.OK,
    result: {
      data: ReasonPhrases.OK,
    },
  };
});
