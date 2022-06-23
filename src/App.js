import React, { useState, useEffect } from "react";
import List from "./components/List";
import WithLoadingList from "./components/WithLoadingList";
import './App.css';
import { deleteFetch, getFetch, postFetch, putFetch } from "./components/FetchMethods"

function App() {
  const LoadingList = WithLoadingList(List);

  const [appStateLoading, setAppStateLoading] = useState(false)
  const [appStateObject, setAppStateObject] = useState(null)

  const [name, setName] = useState("");
  const [publication_year, setPublication_year] = useState("");
  const [director_id, setDirector_id] = useState("");
  const [message1, setMessage1] = useState("");
  const [refresh, setRefresh] = useState(true);

  const [nameEdit, setNameEdit] = useState("");
  const [publication_yearEdit, setPublication_yearEdit] = useState("");
  const [Director_idEdit, setDirector_idEdit] = useState("")
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
  }, [setAppStateObject, setAppStateLoading, refresh])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      postFetch("movies", { name: name, publication_year: publication_year, director_id: director_id }).then(() => {
        setName("");
        setPublication_year("");
        setDirector_id("");
        setMessage1("Creado correctamente");
        setRefresh(true);
      });
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      putFetch(`movies/${idEdit}`, { name: nameEdit, publication_year: publication_yearEdit, director_id: Director_idEdit }).then(() => {
        setNameEdit("");
        setIdEdit("");
        setPublication_yearEdit("");
        setDirector_idEdit("");
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
      <div style={{ borderStyle: "dashed" }}>
        <h2 class="title">Lista de películas</h2>
      </div>
      <header class="text">
        <LoadingList istLoading={appStateLoading} contents={appStateObject} />
      </header>

      <br />
      <div class="content">
      <div class="left">
      <h3>Crear películas</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            class="text"
            type="text"
            value={name}
            placeholder="Nombre de la película"
            onChange={(e) => setName(e.target.value)}
            style={{ width: "400px" }}
          />
        </p>
        <p>
          <input
            class="text"
            type="text"
            value={publication_year}
            placeholder="Año de publicación"
            onChange={(e) => setPublication_year(e.target.value)}
            style={{ width: "400px" }}
          />
        </p>
        <p>
          <input
            class="text"
            type="text"
            value={director_id}
            placeholder="ID de director"
            onChange={(e) => setDirector_id(e.target.value)}
            style={{ width: "400px" }}
          />
        </p>
        <div>{message1 ? <p>{message1}</p> : null}</div>
        <button type="submit" id="submitNew">Crear</button>
      </form>
      </div>
      <div class="right">
      <h3>Editar películas</h3>
      <form onSubmit={handleEdit}>
        <p>
          <input
            class="text"
            type="text"
            value={idEdit}
            placeholder="ID de película"
            onChange={(e) => setIdEdit(e.target.value)}
            style={{ width: "400px" }}
          />
        </p>
        <p>
          <input
            class="text"
            type="text"
            value={nameEdit}
            placeholder="Nombre de película"
            onChange={(e) => setNameEdit(e.target.value)}
            style={{ width: "400px" }}
          />
        </p>
        <p>
          <input
            class="text"
            type="text"
            value={publication_yearEdit}
            placeholder="Año de publicación"
            onChange={(e) => setPublication_yearEdit(e.target.value)}
            style={{ width: "400px" }}
          />
        </p>
        <p>
          <input
            class="text"
            type="text"
            value={Director_idEdit}
            placeholder="ID de director"
            onChange={(e) => setDirector_idEdit(e.target.value)}
            style={{ width: "400px" }}
          />
        </p>
        <div>{message2 ? <p>{message2}</p> : null}</div>
        <button type="submit" id="submitEdit">Editar</button>
      </form>
      </div>
      <div class="right">
      <h3>Eliminar películas</h3>
      <form onSubmit={handleDelete}>
        <p>
        <input
          class="text"
          type="text"
          value={idDelete}
          placeholder="ID de película"
          onChange={(e) => setIdDelete(e.target.value)}
          style={{ width: "400px" }}
        />
        </p>
        <div>{message3 ? <p>{message3}</p> : null}</div>
        <button type="submit" id="submitDelete">Eliminar</button>
      </form>
      </div>
      </div>
    </div>
  );
}

export default App;
