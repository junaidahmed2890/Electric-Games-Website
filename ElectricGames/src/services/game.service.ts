import api from "./api";

const addProduct = (game:any) => {
  return api({
    method: "post",
    data: game,
    url: "/game/addgame",
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
  // .post(url:"/game/AddGame", game)
  // .then((response) => {
  //   return response?.data;
  // })
  // .catch((error) => {
  //   return error.response.data;
  // });
};
const editGame = (game:any) => {
  return api({
    method: "put",
    data: game,
    url: "/game/updategame",
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
  // .put("/game/UpdateGame", game)
  // .then((response) => {
  //   return response?.data;
  // })
  // .catch((error) => {
  //   return error.response.data;
  // });
};
const getAllProducts = () => {
  return api.get("/game/getallgames");
};
const getGameByName = (name:any) => {
  return api.get("/game/GetGameByName/" + name);
};
const getGameById = (id:any) => {
  return api
    .get("/game/GetGameById/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
const deleteGame = (id:any) => {
  return api
    .delete("/game/deletegame/" + id)
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
