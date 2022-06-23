import React, { useState, useEffect } from 'react';
import List from "./components/List";
import WithLoadingList from './components/WithLoadingList';
import { deleteFetch, getFetch, postFetch, putFetch } from './components/FetchMethods';
import './App.css';

function App() {
  const LoadingList = WithLoadingList(List);

  const[appStateLoading, setAppStateLoading] = useState(false)
  const[appStateObject, setAppStateObject] = useState(null)

  const[name, setName] = useState("");
  const[message1, setMessage1] = useState("");
  const[refresh, setRefresh] = useState(true);
  const[dirId, setDirId] = useState("");
  const[year, setYear] = useState("");  

  const[nameEdit, setNameEdit] = useState("");
  const[idEdit, setIdEdit] = useState("");
  const[message2, setMessage2] = useState("");
  const[yearEdit, setYearEdit] = useState("");

  const[idDelete, setIdDelete] = useState("");
  const[message3, setMessage3] = useState("");

  useEffect(() => {
    if(refresh){
      setAppStateLoading(true);
      getFetch("movies").then(val => setAppStateObject(val))
      setAppStateLoading(false);
      setRefresh(false);
    }
  }, [setAppStateObject, setAppStateLoading,refresh])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      postFetch("movies", {name: name}, {year: year} - {director_id: dirId}).then(() => {
        setName("");
        setYear("");
        setDirId("");
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
      putFetch(`movies/${idEdit}`, {name: nameEdit} - {year: yearEdit} ).then(() => {
        setNameEdit("");
        setIdEdit("");
        setYearEdit("");
        setMessage2("Editado correctamente")
        setRefresh(true);
      })
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try{
      deleteFetch(`movies/${idDelete}`).then(() =>{
        setIdDelete("");
        setRefresh(true);
        setMessage3("Eliminado correctamente");
      })
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <div style={{borderStyle: "dashed"}}>
        <h2 className='First-Title'>Laboratorio 4</h2>
      </div>      
      <div>
        <LoadingList isLoading={appStateLoading} contents={appStateObject}/>
      </div>

      <br />
      <form onSubmit={handleSubmit}>
        <input 
        type = "text"
        color="E8E9EB"
        value={name}
        placeholder="Nombre de la pelicula"
        onChangeCapture={(e) => setName(e.target.value)}
        />
        <input 
        type = "text"
        color="E8E9EB"
        value={year}
        placeholder="Año de lanzamiento"
        onChange={(e) => setYear(e.target.value)}
        />
        <input 
        type = "text"
        color="E8E9EB"
        value={dirId}
        placeholder="Identificador del director"
        onChange={(e) => setDirId(e.target.value)}
        />
        <div>{message1 ? <p>{message1}</p> : null}</div>
        <button type = "submit" color="F09D51">Crear</button>
      </form>

      <br />
      <form onSubmit={handleEdit}>
        <input
        type="text"
        color= '#E8E9EB'
        value={idEdit}
        placeholder="Identificador"
        onChange={(e) => setIdEdit(e.target.value)}
        />
        <input
        type="text"
        color="E8E9EB"
        value={nameEdit}
        placeholder="Nombre de la pelicula"
        onChange={(e) => setNameEdit(e.target.value)}
        />
        <div>{message2 ? <p>{message2}</p> : null}</div>
        <button type = "submit" color="F09D51">Editar</button>
        </form>

      <br />
      <form onSubmit={handleDelete}>
        <input
          type="text"
          color="E8E9EB"
          value={idDelete}
          placeholder="Identificador"
          onChange={(e) => setIdDelete(e.target.value)}
        />
        <div>{message3 ? <p>{message3}</p> : null}</div>
        <button type="submit" color= '#F09D51' >Eliminar</button>
      </form>

    </div>
  );
}

export default App;
