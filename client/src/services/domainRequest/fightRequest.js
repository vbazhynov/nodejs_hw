import { get, post } from "../requestHelper";

const entity = "fights";

export const getFighters = async () => {
  return await get(entity);
};

export const createFight = async (body) => {
  return await post(entity, body);
};
