import React, { useState, useEffect } from "react";
import List from "./components/List"
import WithLoadingList from "./components/WithLoadingList";
import './App.css'
import { deleteFetch, getFetch, postFetch, putFetch } from "./components/FetchMethods";

function App() {
  const LoadingList = WithLoadingList(List);

  const [appStateLoading, setAppStateLoading] = useState(false)
  const [appStateObject, setAppStateObject] = useState(null)

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [director_id, setDirector_id] = useState("");
  const [message1, setMessage1] = useState("");


  const [refresh, setRefresh] = useState(true);

  const [idMovieEdit, setIdMovieEdit] = useState("");
  const [nameEdit, setNameEdit] = useState("");
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
      postFetch("movies", {name: name, year: year, director_id: director_id}).then(() => {
        setName("");
        setYear("");
        setDirector_id("");
        setMessage1("La película se creó correctamente");
        setRefresh(true);
        setMessage2("");
        setMessage3("");
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      putFetch(`movies/${idMovieEdit}`, {name: nameEdit}).then(() => {
        setNameEdit("");
        setIdMovieEdit("");
        setMessage2("Película editada correctamente");
        setRefresh(true);
        setMessage1("");
        setMessage3("");
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      deleteFetch(`movies/${idDelete}`).then((e) => {
        setIdDelete("");
        setRefresh(true);
        setMessage3("Película eliminada correctamente");
        setMessage2("");
        setMessage1("");
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <div className="Title">
        <h2 className="First-Title">Lab4-B66142</h2>
      </div>
      <div>
        <LoadingList isLoading={appStateLoading} contents={appStateObject}/>
      </div>

      <br />
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        value={name}
        placeholder="Nombre película"
        onChange={(e) => setName(e.target.value)}
        style={{width: "400px"}}
        required
        />
        <input 
        type="number"
        value={year}
        placeholder="Año de publicación"
        onChange={(e) => setYear(e.target.value)}
        required
        />
        <input 
        type="text"
        value={director_id}
        placeholder="Id del director_id"
        onChange={(e) => setDirector_id(e.target.value)}
        required
        />
        <div>{message1 ? <p>{message1}</p> : null}</div>
        <button type="submit" className="Button-Add">Agregar</button>
      </form>

      <br />
      <form onSubmit={handleEdit}>
        <input 
        type="text"
        value={idMovieEdit}
        placeholder="Identificador"
        onChange={(e) => setIdMovieEdit(e.target.value)}
        required
        />
        <input 
        type="text"
        value={nameEdit}
        placeholder="Nombre película"
        onChange={(e) => setNameEdit(e.target.value)}
        style={{width: "400px"}}
        required
        />
        <div>{message2 ? <p>{message2}</p> : null}</div>
        <button type="submit" className="Button-Edit">Editar</button>
      </form>

      <br />
      <form onSubmit={handleDelete}>
        <input 
        type="text"
        value={idDelete}
        placeholder="Identificador"
        onChange={(e) => setIdDelete(e.target.value)}
        required
        />
        <div>{message3 ? <p>{message3}</p> : null}</div>
        <button type="submit" className="Button-Delete">Eliminar</button>
      </form>
    </div>
  );
}

export default App;
