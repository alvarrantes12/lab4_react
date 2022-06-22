import React, { useState, useEffect } from "react";
import List from "./components/List";
import WithLoadingList from "./components/WithLoadingList";
import "./App.css"
import { getFetch, postFetch, putFetch, deleteFetch } from "./components/FetchMethods";

function App() {
  const LoadingList = WithLoadingList(List);

  const [appStateLoading, setAppStateLoading] = useState(false)
  const [appStateObject, setAppStateObject] = useState(null)


  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [directorId, setDirectorId] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [message1, setMessage1] = useState("");

  const [nameEdit, setNameEdit] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [message2, setMessage2] = useState("");

  const [idDelete, setIdDelete] = useState("");
  const [message3, setMessage3] = useState("");

  useEffect(() => {
    if (refresh) {
      setAppStateLoading(true);
      getFetch("movies").then(val => setAppStateObject(val))
      setAppStateLoading(false);
      setRefresh(false);
    }
  }, [appStateObject, appStateLoading, refresh])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      postFetch("movies", { name: name, age: year, director_id: directorId}).then(() => {
        setName("");
        setYear("");
        setDirectorId("");
        setMessage1("Creado correctamente");
        setRefresh(true);
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      putFetch(`movies/${idEdit}`, { name: nameEdit }).then(() => {
        setNameEdit("");
        setIdEdit("");
        setMessage2("Editado correctamente");
        setRefresh(true);
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      deleteFetch(`movies/${idDelete}`).then(() => {
        ;
        setIdDelete("");
        setRefresh(true);
        setMessage3("Eliminado correctamente");
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <div>
        <h2 className="First-Title">  Conexion con API local de peliculas</h2>
      </div>
      <div>
        <LoadingList isLoading={appStateLoading} contents={appStateObject} />
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="css-input"
          value={name}
          placeholder="Nombre de la pelicula"
          onChange={(e) => setName(e.target.value)}
          style={{ width: "400px" }}
<<<<<<< HEAD
        />
        <br />
        <input
          type="text"
          className="css-input"
          value={year}
          placeholder="Año de estreno"
          onChange={(e) => setYear(e.target.value)}
          style={{ width: "400px" }}
        />
        <br />
        <input
          type="text"
          className="css-input"
          value={directorId}
          placeholder="ID del director"
          onChange={(e) => setDirectorId(e.target.value)}
          style={{ width: "400px" }}
        />
        <div className="user-message">{message1 ? <p>{message1}</p> : null}</div>
=======
        />
        <br />
        <input
          type="text"
          className="css-input"
          value={year}
          placeholder="Año de estreno"
          onChange={(e) => setYear(e.target.value)}
          style={{ width: "400px" }}
        />
        <br />
        <input
          type="text"
          className="css-input"
          value={directorId}
          placeholder="ID del director"
          onChange={(e) => setDirectorId(e.target.value)}
          style={{ width: "400px" }}
        />
        <div>{message1 ? <p>{message1}</p> : null}</div>
>>>>>>> 4da95300a119686cb0982a17c5a7785770301bed
        <button type="submit" className="create-button">Crear</button>
      </form>

      <br />
      <form onSubmit={handleEdit}>
        <input
          type="text"
          className="css-input"
          value={idEdit}
          placeholder="Identificador de la pelicula"
          onChange={(e) => setIdEdit(e.target.value)}
        />
        <br />
        <input
          type="text"
          className="css-input"
          value={nameEdit}
          placeholder="Nombre de la pelicula"
          onChange={(e) => setNameEdit(e.target.value)}
        />
<<<<<<< HEAD
        <div className="user-message">{message2 ? <p>{message2}</p> : null}</div>
=======
        <div>{message2 ? <p>{message2}</p> : null}</div>
>>>>>>> 4da95300a119686cb0982a17c5a7785770301bed
        <button type="submit" className="edit-button"> Editar</button>
      </form>

      <br />
      <form onSubmit={handleDelete}>
        <input
          type="text"
          className="css-input"
          value={idDelete}
          placeholder="Identificador de la pelicula"
          onChange={(e) => setIdDelete(e.target.value)}
        />
<<<<<<< HEAD
        <div className="user-message">{message3 ? <p>{message3}</p> : null}</div>
=======
        <div>{message3 ? <p>{message3}</p> : null}</div>
>>>>>>> 4da95300a119686cb0982a17c5a7785770301bed
        <button type="submit" className="delete-button"> Eliminar</button>
      </form>
    </div>
  );

}

export default App;