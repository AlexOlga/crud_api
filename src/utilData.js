 import { users} from "./users.js";

export function isValidData(data) {
    if (!data.username || typeof data.username !== "string") return false;
    if (!data.age || typeof data.age !== "number") return false;
    if (!data.hobbies) {
      data.hobbies = [];
    }
    if (typeof data.hobbies !== "object") return false;
    let flag = true;
    data.hobbies.forEach((el) => {
      if (typeof el !== "string") flag = false;
    });
    return flag;
  }

  export function validUser(id) {
    return users.find((el) => el.id === id);
  }