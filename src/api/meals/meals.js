import { request } from "../request";

export const getAllMeals = () => {
  return request({
    url: "/meals.json",
    method: "get",
  });
};
