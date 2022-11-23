import api from "./api";

const addGameCharacter = (game) => {
  return api({
    method: "post",
    data: game,
    url: "/GameCharacters/AddGameCharacter",
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
};
const editGameCharacter = (game) => {
  return api({
    method: "put",
    data: game,
    url: "/GameCharacters/UpdateGameCharacter",
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
};
const getAllGameCharacters = () => {
  return api.get("/GameCharacters/GetAllGameCharacters");
};
const getGameCharacterByName = (name) => {
  return api.get("/GameCharacters/GetGameCharactersByName/" + name);
};
const getGameCharacterById = (id) => {
  return api
    .get("/GameCharacters/GetGameCharactersById/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
const deleteGameCharacter = (id) => {
  return api
    .delete("/GameCharacters/DeleteGameCharacters/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const GameCharacters = {
  addGameCharacter,
  getAllGameCharacters,
  deleteGameCharacter,
  getGameCharacterById,
  editGameCharacter,
  getGameCharacterByName,
};

export default GameCharacters;
