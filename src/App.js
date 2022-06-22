import React, {useState, useEffect} from "react";
import List from "./components/List";
import WithLoadingList from "./components/WithLoadingList";
import "./App.css"
import {getFetch, postFetch, putFetch, deleteFetch} from "./components/FetchMethods";

function App() {
  const LoadingList = WithLoadingList(List);  

  const [appStateLoading, setAppStateLoading] = useState(false);
  const [appStateObject, setAppStateObject] = useState(null);

  const [name, setName] = useState("");
  const [message1, setMessage1] = useState("");
  const [refresh, setRefresh] = useState(true);

  const [nameEdit, setNameEdit] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [message2, setMessage2] = useState("");

  const [idDelete, setIdDelete] = useState("");
  const [message3, setMessage3] = useState("");
  

  useEffect(() => {
    if(refresh){
    setAppStateLoading(true);
    getFetch("movies").then(val => setAppStateObject(val))
    setAppStateLoading(false);
    setRefresh(false);
    }
  }, [setAppStateObject, setAppStateLoading, refresh])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      postFetch("movies", {name:name}).then(() => {
        setName("");
        setMessage1("Creado correctamente");
        setRefresh(true);
      });
    } catch (err){
      console.log(err)
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      putFetch(`movies/${idEdit}`, {name:nameEdit}).then(() => {
        setNameEdit("");
        setIdEdit("")
        setMessage2("Editado correctamente");
        setRefresh(true);
      });
    } catch (err){
      console.log(err)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      deleteFetch(`movies/${idEdit}`).then(() => {
        setIdDelete("");
        setMessage3("Eliminado correctamente");
        setRefresh(true);
      });
    } catch (err){
      console.log(err)
    }
  }

  return(
    <div className = "App">
      <div className="First-Title-Div">
        <h2 className="First-Title">API Local Palículas</h2>
      </div>
      <div>
        <LoadingList isLoading={setAppStateLoading.loading} contents={setAppStateLoading.movies}/>
      </div>

      <br/>

      <form>
        <input
        type = "text"
        className="campos"
        value = {name}
        placeholder = "Nombre de la película"
        onChange = {(e) => setName(e.target.value)}
        />
        <div>{message1 ? <p>{message1}</p> : null}</div>
        <button type = "submit" className="boton"> Crear </button>
      </form>

      <br/>

      <form onSubmit = {handleEdit}>
        <input
        type = "text"
        className="campos"
        value = {idEdit}
        placeholder = "Identificador"
        onChange = {(e) => setIdEdit(e.target.value)}
        />

        <input
        type = "text"
        className="campos"
        value = {nameEdit}
        placeholder = "Nombre de la película"
        onChange = {(e) => setNameEdit(e.target.value)}
        />
        <div>{message2 ? <p>{message2}</p> : null}</div>
        <button type = "submit" className="boton"> Editar </button>
      </form>

      <br/>

      <form onSubmit = {handleDelete}>
        <input 
        type = "text"
        className="campos"
        value = {idDelete}
        placeholder = "Identificador"
        onChange = {(e) => setName(e.target.value)}
        />
        <div>{message3 ? <p>{message3}</p> : null}</div>
        <button type = "submit" className="boton"> Eliminar </button>
      </form>

    </div>
    

  );

}

export default App;