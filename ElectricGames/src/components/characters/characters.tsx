import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { baseLink } from "../../services/api";
import { Formik } from "formik";
import ProductService from "../../services/game.service";
import GameCharacters from "../../services/character.service";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import ICharacter from "../../interfaces/ICharacter";
import IGame from "../../interfaces/IGame";
const Characters = () => {
  const [show, setShow] = useState<boolean>(false);
  const [characterId, setCharacterId] = useState<number>(0);
  const [selected, setSelected] = useState<number>(0);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [gameData, setGameData] = useState<ICharacter>({
    gameCharacterId: 0,
    name: "",
    imagePath: "",
    gameId: 0,
    characterImage: null,
  });
  const [products, setProducts] = useState<ICharacter[]>([]);
  const [games, setGames] = useState<IGame[]>([]);
  const handleClose = () => setShow(false);
  const handleShow = (value: any) => {
    if (value > 0) {
      getCharacterById(value);
      setShow(true);
    } else {
      setGameData({
        gameCharacterId: 0,
        name: "",
        imagePath: "",
        gameId: selected,
        characterImage: null,
      });
      setShow(true);
    }
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = () => {
    setShowDelete(true);
  };
  const handleCloseDetail = () => {
    setShowDetail(false);
  };
  const handleShowDetail = (id: any) => {
    getCharacterById(id);
    setShowDetail(true);
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("Game Name is  required field"),
  });
  const getAllGameCharacters = () => {
    GameCharacters.getAllGameCharacters().then(
      (response) => {
        setProducts(response.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
  };
  const getAllProducts = () => {
    ProductService.getAllProducts().then(
      (response) => {
        setGames(response.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
  };
  const getGamesByName = (name: any) => {
    GameCharacters.getGameCharacterByName(name).then(
      (response) => {
        setProducts(response.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
  };
  const deleteGameCharacter = (id: any) => {
    GameCharacters.deleteGameCharacter(id).then(
      (response) => {
        if (response?.status === 200) {
          toast.success("Game has been deleted successfully.");
          getAllGameCharacters();
          setCharacterId(0);
          handleCloseDelete();
        }
      },
      (error) => {
        console.log("error", error);
        setCharacterId(0);
      }
    );
  };
  const getCharacterById = (id: any) => {
    GameCharacters.getGameCharacterById(id).then(
      (response) => {
        if (response?.status === 200) {
          setGameData(response.data);
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  };
  useEffect(() => {
    getAllGameCharacters();
    getAllProducts();
  }, []);
  useEffect(() => {
    setSelected(games[0]?.gameId);
  }, [games]);

  return (
    <div className="">
      <div className="row pt-5 pl-5">
        <div className="col-7 offset-2">
          <div className="row mb-4">
            <div className="col-4">
              <input
                type="text"
                name="search"
                placeholder="search by character name"
                id="search"
                className="form-control"
                onChange={(e) => {
                  if (!e.target.value) {
                    getAllGameCharacters();
                  }
                }}
                onKeyPress={(e: any) => {
                  if (e.key === "Enter") {
                    if (!e.target.value) {
                      getAllGameCharacters();
                    } else {
                      getGamesByName(e.target.value);
                    }
                  }
                  console.log("onchange", e);
                }}
              />
            </div>
            <div className="col-2 offset-6 ">
              <div
                className="btn btn-success"
                onClick={() => {
                  handleShow(0);
                }}
                style={{ width: "100%" }}
              >
                Add Character
              </div>
            </div>
          </div>
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Character</th>
                  <th scope="col">Character Title</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((item: any, index: any) => (
                  <tr>
                    <td>
                      {" "}
                      <img
                        // src={require(`${baseLink + "images/" + item?.imagePath}`)}
                        src={`${baseLink + "images/" + item?.imagePath}`}
                        width={"140px"}
                        height={"80px"}
                        alt="Card Images"
                        // className="rounded-circle"
                      />
                    </td>
                    <td>
                      <div className="">{}</div>
                      {item.name}
                    </td>

                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{
                          color: "orange",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleShow(item.gameCharacterId);
                        }}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        style={{
                          color: "orange",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleShowDetail(item.gameCharacterId);
                        }}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          color: "orange",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleShowDelete();
                          setCharacterId(item.gameCharacterId);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Game Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {" "}
          <Formik
            validationSchema={schema}
            initialValues={gameData}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              // Alert the input values of the form that we filled
              if (values.gameCharacterId > 0) {
                GameCharacters.editGameCharacter(values).then(
                  (response) => {
                    if (response?.status === "ok") {
                      toast.success(response.message);
                      getAllGameCharacters();
                      handleClose();
                      resetForm();
                    } else if (response?.status === "exist") {
                      toast.error(response.message);
                    }
                  },
                  (error) => {}
                );
              } else {
                GameCharacters.addGameCharacter(values).then(
                  (response) => {
                    if (response?.status === "ok") {
                      toast.success(response.message);
                      getAllGameCharacters();
                      handleClose();
                      resetForm();
                    } else if (response?.status === "exist") {
                      toast.error(response.message);
                    }
                  },
                  (error) => {}
                );
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <>
                <div className="product p-5">
                  <form noValidate onSubmit={handleSubmit}>
                    {gameData.gameCharacterId > 0 ? (
                      <div className="row p-5">
                        <img
                          // src={require(`${baseLink + "images/" + item?.imagePath}`)}
                          src={`${baseLink + "images/" + values.imagePath}`}
                          width={"130px"}
                          height={"150px"}
                          alt="Card Images"
                          className="d-flex justify-content-center"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="input-group mt-3">
                      <input
                        type="name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Character name"
                        id="name"
                        className="form-control"
                      />
                    </div>
                    <div className="p-error">
                      {errors.name && touched.name && errors.name}
                    </div>

                    <div className="input-group mt-3">
                      <select
                        id="gameId"
                        name="gameId"
                        value={values.gameId > 0 ? values.gameId : selected}
                        className="form-control"
                        onChange={handleChange}
                      >
                        {games?.map((item: any, index: any) => (
                          <option value={item.gameId}>{item.name}</option>
                        ))}
                      </select>
                    </div>

                    {gameData.gameCharacterId === 0 ? (
                      <>
                        <div
                          className="input-group mt-2 border"
                          style={{
                            borderStyle: "solid ",
                            borderColor: "red",
                            borderWidth: "3px",
                          }}
                        >
                          <input
                            type="file"
                            id="characterImage"
                            name="characterImage"
                            onChange={(e: any) => {
                              setFieldValue(
                                "characterImage",
                                e.target.files[0]
                              );
                            }}
                            className="form-control"
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <button
                      className="btn mt-3"
                      style={{
                        backgroundColor: "#83bdf7",
                        color: "white",
                        width: "100%",
                      }}
                      type="submit"
                    >
                      {gameData.gameCharacterId > 0
                        ? "Edit Character"
                        : "Add Character"}
                    </button>
                  </form>
                </div>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      {/* Detail Game Modal */}
      <Modal show={showDetail} onHide={handleCloseDetail}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {" "}
          <Formik
            validationSchema={schema}
            initialValues={gameData}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {}}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <>
                <div className="product p-5">
                  <form noValidate onSubmit={handleSubmit}>
                    <div className="row p-5">
                      <img
                        // src={require(`${baseLink + "images/" + item?.imagePath}`)}
                        src={`${baseLink + "images/" + values.imagePath}`}
                        width={"130px"}
                        height={"150px"}
                        alt="Card Images"
                        className="d-flex justify-content-center"
                      />
                    </div>

                    <div className="input-group mt-3">
                      <input
                        type="name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Character name"
                        id="name"
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="input-group mt-3">
                      <select
                        id="gameId"
                        name="gameId"
                        value={values.gameId}
                        className="form-control"
                        onChange={handleChange}
                        disabled
                      >
                        {games?.map((item: any, index: any) => (
                          <option value={item.gameId}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>
              </>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* Delete Game Modal */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center p-3">
            Are you sure you want to permanently remove this item?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseDelete();
              setCharacterId(0);
            }}
          >
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteGameCharacter(characterId);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Characters;
