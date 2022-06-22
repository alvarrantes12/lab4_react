import React, {useState, useEffect} from "react";
import List from "./components/List";
import WithLoadingList from "./components/WithLoadingList";
import "./App.css"
import { getFetch, postFetch, putFetch, deleteFetch } from "./components/FetchMethods";

function App() {
  const LoadingList = WithLoadingList(List);
  
  const [appStateLoading, setAppStateLoading] = useState(false)
  const [appStateObject, setAppStateObject] = useState(null)


  const [name, setName] = useState("");
  const [year_of_publication, Set_Year_of_publication] = useState("");
  const [director_id, setDirector_id] = useState("");
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
  }, [appStateObject, appStateLoading, refresh])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      postFetch("movies",{name: name, year_of_publication: year_of_publication, director_id: director_id}).then(() => {
        setName("");
        Set_Year_of_publication("");
        setDirector_id("");
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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      deleteFetch(`movies/${idDelete}`).then(() => {;
        setIdDelete("");
        setRefresh(true);
        setMessage3("Eliminado correctamente");
      })
    } catch (err) {
      console.log(err)
    }
  }

  return(
    <div className = "App">
      <div >
        <h2 className= "Component-Title">  Conexión API local</h2>
      </div>
      <div>
        <LoadingList isLoading={appStateLoading} contents={appStateObject}/>
      </div>
      <br/>
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
        value={year_of_publication}
        placeholder="Año de publicación"
        onChange={(e) => Set_Year_of_publication(e.target.value)}
        style={{width: "400px"}}
        />

        <input
        type="text"
        value={director_id}
        placeholder="Id del Director"
        onChange={(e) => setDirector_id(e.target.value)}
        style={{width: "400px"}}
        />


        <div>{message1 ? <p>{message1}</p> : null}</div>
        <button type="submit" className= "Button-Create">Crear</button>
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
          placeholder="Nombre de la película"
          onChange={(e) => setNameEdit(e.target.value)}
          style={{width: "400px"}}
        />
        <div>{message2 ? <p>{message2}</p> : null}</div>
        <button type="submit" className= "Button-Edit"> Editar</button>
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
        <button type="submit" className= "Button-Delete"> Eliminar</button>
      </form>
    </div>
  );

}

export default App;