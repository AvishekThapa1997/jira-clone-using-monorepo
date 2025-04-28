import { type UserDto } from "@jira-clone/core/types";

import { IDtoMapper } from "../shared/DtoMapper.js";
import { User } from "@/model/user.js";

export const userDtoMapper: IDtoMapper<User, UserDto> = {
  mapToDto(model) {
    const { id, name, email } = model;
    return {
      id,
      email,
      name,
    };
  },
};
