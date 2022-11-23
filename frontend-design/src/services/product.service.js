import api from "./api";

const addProduct = (game) => {
  return api({
    method: "post",
    data: game,
    url: "/games/addgame",
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response) => {
      console.log("response", response);
      return response?.data;
    })
    .catch((error) => {
      console.log("error", error);

      return error.response.data;
    });
  // .post(url:"/games/AddGame", game)
  // .then((response) => {
  //   return response?.data;
  // })
  // .catch((error) => {
  //   return error.response.data;
  // });
};
const editGame = (game) => {
  return api({
    method: "put",
    data: game,
    url: "/games/updategame",
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response) => {
      console.log("response", response);
      return response?.data;
    })
    .catch((error) => {
      console.log("error", error);
      return error.response.data;
    });
  // .put("/games/UpdateGame", game)
  // .then((response) => {
  //   return response?.data;
  // })
  // .catch((error) => {
  //   return error.response.data;
  // });
};
const getAllProducts = () => {
  return api.get("/games/getallgames");
};
const getGameByName = (name) => {
  return api.get("/games/GetGameByName/" + name);
};
const getGameById = (id) => {
  return api
    .get("/games/GetGameById/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
const deleteGame = (id) => {
  return api
    .delete("/games/deletegame/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const ProductService = {
  addProduct,
  getAllProducts,
  deleteGame,
  getGameById,
  editGame,
  getGameByName,
};

export default ProductService;
