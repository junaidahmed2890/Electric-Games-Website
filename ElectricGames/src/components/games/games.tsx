import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { baseLink } from "../../services/api";
import { Formik } from "formik";
import ProductService from "../../services/game.service";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import IGame from "../../interfaces/IGame";
const Games = () => {
  const [show, setShow] = useState<boolean>(false);
  const [gameId, setGameId] = useState<number>(0);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [products, setProducts] = useState<IGame[]>([]);
  const [gameData, setGameData] = useState<IGame>({
    gameId: 0,
    name: "",
    platform: "",
    releaseYear: "1940",
    imagePath: "",
    profileImage: null,
  });
  const handleClose = () => setShow(false);
  const handleShow = (value: any) => {
    if (value > 0) {
      getGameById(value);
      setShow(true);
    } else {
      setGameData({
        gameId: 0,
        name: "",
        platform: "",
        releaseYear: "1940",
        imagePath: "",
        profileImage: null,
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
    getGameById(id);
    setShowDetail(true);
  };
  const schema = Yup.object().shape({
    name: Yup.string().required("Game Name is  required field"),
    platform: Yup.string().required("Game Platform is  required field"),
    releaseYear: Yup.string().required("Release year is  required field"),
  });
  const getAllProducts = () => {
    ProductService.getAllProducts().then(
      (response) => {
        setProducts(response.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
  };
  const getGamesByName = (name: any) => {
    ProductService.getGameByName(name).then(
      (response) => {
        setProducts(response.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
  };
  const deleteGame = (id: any) => {
    ProductService.deleteGame(id).then(
      (response) => {
        if (response?.status === 200) {
          toast.success("Game has been deleted successfully.");
          getAllProducts();
          setGameId(0);
          handleCloseDelete();
        }
      },
      (error) => {
        console.log("error", error);
        setGameId(0);
      }
    );
  };
  const getGameById = (id: any) => {
    ProductService.getGameById(id).then(
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
    getAllProducts();
  }, []);

  return (
    <div className="">
      <div className="row pt-5 pl-5">
        <div className="col-7 offset-2">
          <div className="row mb-4">
            <div className="col-4">
              <input
                type="text"
                name="search"
                placeholder="search by game title"
                id="search"
                className="form-control"
                onChange={(e) => {
                  if (!e.target.value) {
                    getAllProducts();
                  }
                }}
                onKeyPress={(e: any) => {
                  if (e.key === "Enter") {
                    if (!e.target.value) {
                      getAllProducts();
                    } else {
                      getGamesByName(e.target.value);
                    }
                  }
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
                Add Game
              </div>
            </div>
          </div>
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Game</th>
                  <th scope="col">Game Title</th>
                  <th scope="col">Platform</th>
                  <th scope="col">Release Year</th>
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
                    <td>{item.platform}</td>
                    <td>{item.releaseYear}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{
                          color: "orange",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleShow(item.gameId);
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
                          handleShowDetail(item.gameId);
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
                          setGameId(item.gameId);
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

              if (values.gameId > 0) {
                ProductService.editGame(values).then(
                  (response) => {
                    if (response?.status === "ok") {
                      toast.success(response.message);
                      getAllProducts();
                      handleClose();
                      resetForm();
                    } else if (response?.status === "exist") {
                      toast.error(response.message);
                    }
                  },
                  (error) => {}
                );
              } else {
                ProductService.addProduct(values).then(
                  (response) => {
                    if (response?.status === "ok") {
                      toast.success(response.message);
                      getAllProducts();
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
                    {gameData.gameId > 0 ? (
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
                        placeholder="Game Title"
                        id="name"
                        className="form-control"
                      />
                    </div>
                    <div className="p-error">
                      {errors.name && touched.name && errors.name}
                    </div>
                    <div className="input-group mt-3">
                      <input
                        type="text"
                        name="platform"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.platform}
                        placeholder="Platform"
                        className="form-control"
                        id="platform"
                      />
                    </div>
                    <div className="p-error">
                      {errors.platform && touched.platform && errors.platform}
                    </div>
                    <div className="input-group mt-3">
                      <select
                        id="releaseYear"
                        name="releaseYear"
                        value={values.releaseYear}
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value="1940">1940</option>
                        <option value="1941">1941</option>
                        <option value="1942">1942</option>
                        <option value="1943">1943</option>
                        <option value="1944">1944</option>
                        <option value="1945">1945</option>
                        <option value="1946">1946</option>
                        <option value="1947">1947</option>
                        <option value="1948">1948</option>
                        <option value="1949">1949</option>
                        <option value="1950">1950</option>
                        <option value="1951">1951</option>
                        <option value="1952">1952</option>
                        <option value="1953">1953</option>
                        <option value="1954">1954</option>
                        <option value="1955">1955</option>
                        <option value="1956">1956</option>
                        <option value="1957">1957</option>
                        <option value="1958">1958</option>
                        <option value="1959">1959</option>
                        <option value="1960">1960</option>
                        <option value="1961">1961</option>
                        <option value="1962">1962</option>
                        <option value="1963">1963</option>
                        <option value="1964">1964</option>
                        <option value="1965">1965</option>
                        <option value="1966">1966</option>
                        <option value="1967">1967</option>
                        <option value="1968">1968</option>
                        <option value="1969">1969</option>
                        <option value="1970">1970</option>
                        <option value="1971">1971</option>
                        <option value="1972">1972</option>
                        <option value="1973">1973</option>
                        <option value="1974">1974</option>
                        <option value="1975">1975</option>
                        <option value="1976">1976</option>
                        <option value="1977">1977</option>
                        <option value="1978">1978</option>
                        <option value="1979">1979</option>
                        <option value="1980">1980</option>
                        <option value="1981">1981</option>
                        <option value="1982">1982</option>
                        <option value="1983">1983</option>
                        <option value="1984">1984</option>
                        <option value="1985">1985</option>
                        <option value="1986">1986</option>
                        <option value="1987">1987</option>
                        <option value="1988">1988</option>
                        <option value="1989">1989</option>
                        <option value="1990">1990</option>
                        <option value="1991">1991</option>
                        <option value="1992">1992</option>
                        <option value="1993">1993</option>
                        <option value="1994">1994</option>
                        <option value="1995">1995</option>
                        <option value="1996">1996</option>
                        <option value="1997">1997</option>
                        <option value="1998">1998</option>
                        <option value="1999">1999</option>
                        <option value="2000">2000</option>
                        <option value="2001">2001</option>
                        <option value="2002">2002</option>
                        <option value="2003">2003</option>
                        <option value="2004">2004</option>
                        <option value="2005">2005</option>
                        <option value="2006">2006</option>
                        <option value="2007">2007</option>
                        <option value="2008">2008</option>
                        <option value="2009">2009</option>
                        <option value="2010">2010</option>
                        <option value="2011">2011</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                      </select>
                    </div>
                    <div className="p-error">
                      {errors.releaseYear &&
                        touched.releaseYear &&
                        errors.releaseYear}
                    </div>
                    {gameData.gameId === 0 ? (
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
                            id="profileImage"
                            name="profileImage"
                            onChange={(e: any) => {
                              setFieldValue("profileImage", e.target.files[0]);
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
                      {gameData.gameId > 0 ? "Edit Game" : "Add Game"}
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
            onSubmit={(values: any, { resetForm }) => {
              // Alert the input values of the form that we filled
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
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
                        placeholder="Game Title"
                        id="name"
                        className="form-control"
                        disabled
                      />
                    </div>

                    <div className="input-group mt-3">
                      <input
                        type="text"
                        name="platform"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.platform}
                        placeholder="Platform"
                        className="form-control"
                        id="platform"
                        disabled
                      />
                    </div>

                    <div className="input-group mt-3">
                      <input
                        type="text"
                        name="releaseYear"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.releaseYear}
                        placeholder="ReleaseYear"
                        className="form-control"
                        id="releaseYear"
                        disabled
                      />
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
              setGameId(0);
            }}
          >
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteGame(gameId);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Games;
