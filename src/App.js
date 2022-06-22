import React, { useState, useEffect } from "react";
import List from "./components/List";
import WithLoadingList from "./components/WithLoadingList";
import './App.css';
import { deleteFetch, getFetch, postFetch, putFetch } from "./components/FetchMethods"

function App() {
  const LoadingList = WithLoadingList(List);

  const [appStateLoading, setAppStateLoading] = useState(false);
  const [appStateObject, setAppStateObject] = useState(null);

  const [name, setName] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [director_id, setDirector_id] = useState("");


  const [message1, setMessage1] = useState("");
  const [refresh, setRefresh] = useState(true);

  const [nameEdit, setNameEdit] = useState("");
  const [publicationYearEdit, setPublicationYearEdit] = useState("");
  const [director_idEdit, setDirector_idEdit] = useState("");

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
      postFetch("movies", { name: name, publicationYear: publicationYear, director_id: director_id }).then(() => {
        setName("");
        setPublicationYear("");
        setDirector_id("");
        console.log(name);
        console.log(publicationYear);
        setMessage1("Creado correctamente");
        setRefresh(true);
      });
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (refresh) {
      setAppStateLoading(true);
      getFetch("movies").then(val => setAppStateObject(val))
      setAppStateLoading(false);
      setRefresh(false);
    }
  }, [setAppStateObject, setAppStateLoading, refresh])

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      putFetch(`movies/${idEdit}`, {name: nameEdit, publicationYear: publicationYearEdit, director_id: director_idEdit}).then(() => {
        setNameEdit("");
        setIdEdit("");
        setPublicationYearEdit("");
        setDirector_idEdit("");
        setMessage2("Editado correctamente");
        setRefresh(true);
      })

    } catch (err) {
      console.log(err)
    }

  }

  //arrow function
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      deleteFetch(`movies/${idDelete}`).then(() => {
        setIdDelete("");
        setRefresh(true);
        setMessage3("Eliminado correctamente");
      })
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="App">
      <div className="div-titulo">
        <h2 className="First-Title">Cartelera de Peliculas</h2>
      </div>
      <div>
        <LoadingList isLoading={appStateLoading} contents={appStateObject} />
      </div>

      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Nombre de la pelicula"
          onChange={(e) => setName(e.target.value)}
          style={{width: "400px"}}
        />
        <input
          type="text"
          value={publicationYear}
          placeholder="Año de publicacion"
          onChange={(e) => setPublicationYear(e.target.value)}
          style={{width: "400px"}}
        />
        <input
          type="text"
          value={director_id}
          placeholder="ID Director"
          onChange={(e) => setDirector_id(e.target.value)}
          style={{width: "400px"}}
        />
        <div>{message1 ? <p>{message1}</p> : null}</div>
        <button type="submit">Crear</button>
      </form>

      <br />
      <form onSubmit={handleEdit}>
        <input 
          type="text"
          value={idEdit}
          placeholder="Identificador"
          onChange={(e) => setIdEdit(e.target.value)}
        />
        <input 
          type="text"
          value={nameEdit}
          placeholder="Nombre de la pelicula"
          onChange={(e) => setNameEdit(e.target.value)}
          style={{width: "400px"}}
        />
        <input 
          type="text"
          value={publicationYearEdit}
          placeholder="Año de Publicacion"
          onChange={(e) => setPublicationYearEdit(e.target.value)}
          style={{width: "400px"}}
        />
        <input 
          type="text"
          value={director_idEdit}
          placeholder="ID Director"
          onChange={(e) => setDirector_idEdit(e.target.value)}
          style={{width: "400px"}}
       />
      <div>{message2 ? <p>{message2}</p> : null}</div>
      <button type="submit">Editar</button>
    </form>

    <br />
    <form onSubmit={handleDelete}>
      <input 
        type="text"
        value={idDelete}
        placeholder="Identificador"
        onChange={(e) => setIdDelete(e.target.value)}
      />
      <div>{message3 ? <p>{message3}</p> : null}</div>
      <button type="submit">Eliminar</button>
    </form>
  </div>
);

}

export default App;

