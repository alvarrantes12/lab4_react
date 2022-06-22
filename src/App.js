import React, {useState, useEffect} from "react";
import List from "./components/List";
import WithLoadingList from "./components/WithLoadingList";
import './App.css';
import { getFetch, postFetch, putFetch, deleteFetch } from "./components/FetchMethods";


function App() {
  const LoadingList = WithLoadingList(List);

  const [appStateLoading, setAppStateLoading] = useState(false);
  const [appStateObject, setAppStateObject] = useState(null);

  const[name, setName] = useState("");
  const[year, setYear] = useState("");
  const[directorId, setId] = useState("");

  const [message1,setMessage1] = useState("");
  const [refresh,setRefresh] = useState(true);

  const[nameEdit, setNameEdit] = useState("");
  const [idEdit,setIdEdit] = useState("");
  const [message2,setMessage2] = useState("");

  const [idDelete,setIdDelete] = useState("");
  const [message3,setMessage3] = useState("");

  useEffect(() => {
    if (refresh){
      setAppStateLoading(true);
      getFetch("movies").then(val => setAppStateObject(val));
      setAppStateLoading(false);
      setRefresh(false);
    }
    
  }, [setAppStateObject, setAppStateLoading,refresh])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      postFetch("movies",{name:name, year:year,director_id:directorId}).then(()=>{
        setName("");
        setYear("");
        setId("");
        setMessage1("Creado correctamente.");
        setRefresh(true);
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async (e) =>{
    e.preventDefault();
    try {
      deleteFetch(`movies/${idDelete}`).then(()=>{
        setIdDelete("");
        setRefresh(true);
        setMessage3("Eliminado correctamente");
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleEdit = async (e) =>{
    e.preventDefault();
    try {
      putFetch(`movies/${idEdit}`,{name:nameEdit}).then(()=>{
        setNameEdit("")
        setIdEdit("");
        setMessage2("Editado Correctamente.");
        setRefresh(true);
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">

        <h1 className="First-Title">Peliculas</h1>

      <div>
        <LoadingList isLoading={appStateLoading} contents={appStateObject} />
      </div>
      <br/>
      <div>
        <form onSubmit={handleSubmit}>
          <h2 className="Second-Title">Agregar pelicula</h2>
          <input
            type="text"
            value={name}
            placeholder= "Nombre de la pelicula"
            onChange={(e)=>setName(e.target.value)}
            style={{width: "400px"}}
          />
          <input
            type="text"
            value={year}
            placeholder= "Año"
            onChange={(e)=>setYear(e.target.value)}
            style={{width: "400px"}}
          />
          <input
          type="text"
          value={directorId}
          placeholder="Identificacion del director"
          onChange={(e)=>setId(e.target.value)}
          style={{width: "400px"}}
        />
          <div>{message1 ? <p>{message1}</p>:null}</div>
          <button type="submit" className="Submit-Button">Crear</button>
        </form>
      </div>
      <br/>
      <div>
        <form onSubmit={handleEdit}>
        <h2 className="Second-Title">Editar pelicula</h2>
        <input
          type="text"
          value={idEdit}
          placeholder="Identificador de la pelicula"
          onChange={(e)=>setIdEdit(e.target.value)}
          style={{width: "400px"}}
        />
        <input
          type="text"
          value={nameEdit}
          placeholder= "Nombre de la pelicula"
          onChange={(e)=>setNameEdit(e.target.value)}
          style={{width: "400px"}}
        />
        <div>{message2 ? <p>{message2}</p>:null}</div>
        <button type="submit" className="Edit-Button">Editar</button>
        </form>
      </div>
      <br/>
      <div>
        <form onSubmit={handleDelete}>
        <h2 className="Second-Title">Eliminar pelicula</h2>
          <input
            type="text"
            value={idDelete}
            placeholder="Identificador de la pelicula"
            onChange={(e)=>setIdDelete(e.target.value)}
            style={{width: "400px"}}
          />
          <div>{message3 ? <p>{message3}</p>:null}</div>
          <button type="submit" className="Delete-Button">Eliminar</button>
        </form>
      </div>
    </div>
  );

}

export default App;
