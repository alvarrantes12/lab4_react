import React, {useState, useEffect} from "react";
import List from "./components/List";
import WithLoadingList from "./components/WithLoadingList";
import './App.css';
import {deleteFetch, getFetch, postFetch, putFetch} from "./components/FetchMethods";

function App() {
  const LoadingList = WithLoadingList(List);

  const [appStateLoading, setAppStateLoading] = useState(false)
  const [appStateObject, setAppStateObject] = useState(null)
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [idDir, setDir] = useState("");
  const [message1, setMenssage1] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [nameE, setNameE] = useState("");
  const [message2, setMenssage2] = useState("");
  const [idE, setEdit] = useState("");
  const [idD, setDelete] = useState("");
  const [message3, setMenssage3] = useState("");

  useEffect(() => {
    if(refresh){
      setAppStateLoading(true);
      getFetch("movies").then(val => setAppStateObject(val))
      setAppStateLoading(false);
      setRefresh(false);
    }
  }, [setAppStateLoading, setAppStateObject, refresh])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      postFetch("movies", {name: name, year: year, director_id: idDir }).then(() => {
        setName("");
        setYear("");
        setDir("");
        setMenssage1("Creado correctamente");
        setRefresh(true);
      });
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit= async (e) => {
    e.preventDefault();
    try {
      putFetch(`movies/${idE}`, {name: nameE }).then(() => {
        setEdit("");
        setNameE("");
        setMenssage2("Editado correctamente");
        setRefresh(true);
      });
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete= async (e) => {
    e.preventDefault();
    try {
      deleteFetch(`movies/${idD}`).then(() =>{
        setDelete("");
        setMenssage3("Eliminado correctamente");
        setRefresh(true);
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <div>
        <h2 className="First-Title">Conexion API local</h2>
      </div>
      <div>
        <LoadingList isLoading={appStateLoading} contents={appStateObject} />
      </div>

      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Nombre de la película"
          onChange={(e) => setName(e.target.value)}
          style={{width: "500px"}}
        />
        <input
          type="text"
          value={year}
          placeholder="Año de la película"
          onChange={(e) => setYear(e.target.value)}
          style={{width: "500px"}}
        />
        <input
          type="text"
          value={idDir}
          placeholder="Id del director"
          onChange={(e) => setDir(e.target.value)}
          style={{width: "500px"}}
        />
        <div className="Component-Message">{message1 ? <p>{message1}</p> : null}</div>
        <button type="submit">Crear Pelicula</button>
      </form>

      <br />
      <form onSubmit={handleEdit}>
        <input
          type="text"
          value={idE}
          placeholder="Id de la película"
          onChange={(e) => setEdit(e.target.value)}
        />
        <input
          type="text"
          value={nameE}
          placeholder="Nombre de la película"
          onChange={(e) => setNameE(e.target.value)}
          style={{width: "500px"}}
        />
        <div className="Component-Message">{message2 ? <p>{message2}</p> : null}</div>
        <button type="submit">Editar Pelicula</button>
      </form>

      <br />
      <form onSubmit={handleDelete}>
        <input
          type="text"
          value={idD}
          placeholder="Id de la película"
          onChange={(e) => setDelete(e.target.value)}
          style={{width: "500px"}}
        />
        <div className="Component-Message">{message3 ? <p>{message3}</p> : null}</div>
        <button type="submit">Eliminar película</button>
      </form>
    </div>
  );
}

export default App;
