import api from "./api";

const addGameCharacter = (game:any) => {
  return api({
    method: "post",
    data: game,
    url: "/Character/AddGameCharacter",
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
const editGameCharacter = (game:any) => {
  return api({
    method: "put",
    data: game,
    url: "/Character/UpdateGameCharacter",
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
  return api.get("/Character/GetAllGameCharacters");
};
const getGameCharacterByName = (name:any) => {
  return api.get("/Character/GetGameCharactersByName/" + name);
};
const getGameCharacterById = (id:any) => {
  return api
    .get("/Character/GetGameCharactersById/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
const deleteGameCharacter = (id:any) => {
  return api
    .delete("/Character/DeleteGameCharacters/" + id)
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
