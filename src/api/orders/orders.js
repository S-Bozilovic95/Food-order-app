import { request } from "../request";

export const addNewOrder = (userData, orderedItems) => {
  return request({
    url: "/orders.json",
    method: "post",
    data: {
      user: userData,
      orderedItems: orderedItems,
    },
  });
};
