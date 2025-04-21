import { type UserDto } from "@jira-clone/core/types";

import { IDtoMapper } from "../shared/DtoMapper.js";
import { users } from "@/schema/users.js";

export const userDtoMapper: IDtoMapper<typeof users.$inferSelect, UserDto> = {
  mapToDto(model) {
    const { id, name, email } = model;
    return {
      id,
      email,
      name,
    };
  },
};
