import React, { useState, useEffect } from "react";
import List from "./components/List";
import WithLoadingList from "./components/WithLoadingList";
import './App.css';
import { getFetch, postFetch, putFetch, deleteFetch } from "./components/FetchMethods";

function App() {
  const LoadingList = WithLoadingList(List);
  const [appStateLoading, setAppStateLoading] = useState(false)
  
  const [appStateObject, setAppStateObject] = useState(null)

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [director_id, setDirectorId] = useState("");
  const [message1, setMessage1] = useState("");
  const [refresh, setRefresh] = useState(true);

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
  }, [setAppStateObject, setAppStateLoading])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      postFetch("movies", {name: name}, {year: year}, {director_id: director_id}).then(() => {
        setName("");
        setYear("");
        setDirectorId("");
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
      putFetch(`movies/${idEdit}`, {name: nameEdit}).then(() => {
        setNameEdit("");
        setIdEdit("");
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
      console.log(err)
    }
  } 

  return (
    <div classname="app">
       <div style={{borderStyle: "dashed"}}>
           <h2 classname="First-Title">API peliculas</h2>
       </div>
       <div>
         <LoadingList isLoading={appStateLoading} contents={appStateObject} />
       </div>
 
       <br/>
       <form onSubmit={handleSubmit}>
        <input
         type="text"
         value={name}
         placeholder="Nombre de la pelicula" 
         onChange={(e) => setName(e.target.value)}
         />
         <input
         type="text"
         value={year}
         placeholder="Año" 
         onChange={(e) => setName(e.target.value)}
         />
         <input
         type="text"
         value={directorId}
         placeholder="Identificador" 
         onChange={(e) => setName(e.target.value)}
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
         <div>{message2 ? <p>{message2}</p> : null}</div>
         <button type="submit">Editar</button>
       </form>
 
       <br />
       <form onSubmit={handleDelete}>
         <input
           type="text"
           value={idDelete}
           placeHolder="Identificador"
           onChange={(e) => setIdDelete(e.target.value)}
         />
         <div>{message3 ? <p>{message3}</p> : null}</div>
         <button type="submit">Eliminar</button>
       </form>
    </div> 
   );
 
 }
