import {
  getUserById,
  getOrderByUser,
} from "./FetchApi";

export const logout = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("cart");
  localStorage.removeItem("wishList");
  window.location.href = "/";
};

export const fetchData = async (dispatch) => {
  dispatch({ type: "loading", payload: true });
  let userId = JSON.parse(localStorage.getItem("jwt"))
    ? JSON.parse(localStorage.getItem("jwt")).user._id
    : "";
  try {
    let responseData = await getUserById(userId);
    setTimeout(() => {
      if (responseData && responseData.User) {
        dispatch({ type: "userDetails", payload: responseData.User });
        dispatch({ type: "loading", payload: false });
      }
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrderByUser = async (dispatch) => {
  dispatch({ type: "loading", payload: true });
  let userId = JSON.parse(localStorage.getItem("jwt"))
    ? JSON.parse(localStorage.getItem("jwt")).user._id
    : "";
  try {
    let responseData = await getOrderByUser(userId);
    setTimeout(() => {
      if (responseData && responseData.Order) {
        console.log(responseData);
        dispatch({ type: "OrderByUser", payload: responseData.Order });
        dispatch({ type: "loading", payload: false });
      }
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

