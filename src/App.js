import React, { useState, useEffect } from "react";
import { getFetch, postFecth, putFetch, deleteFetch } from "./components/FetchMethods";
import List from "./components/List";
import WithLoadingList from "./components/WithLoadingList";
import './App.css';
function App() {
  const LoadingList = WithLoadingList(List);
  const [AppStateLoading, setAppStateLoading] = useState(false);
  const [appStateObject, setAppstateObject] = useState(null);

  const [movie, setMovie] = useState("");
  const [year, setYear] = useState("");
  const [idDirector, setIdDirector] = useState("");

  const [message1, setMessage1] = useState("");

  const [refresh, setRefresh] = useState(true);

  const [movieEdit, setMovieEdit] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [message2, setMessage2] = useState("");

  const [idDelete, setIdDelete] = useState("");
  const [message3, setMessage3] = useState("");

  useEffect(() => {
    if (refresh) {
      setAppStateLoading(true);
      getFetch("movies").then(val => setAppstateObject(val));
      setAppStateLoading(false);
      setRefresh(false);

      setTimeout(() => {
        setMessage1("");
        setMessage2("");
        setMessage3("");
      }, 1000);
    }
  }, [setAppstateObject, setAppStateLoading, refresh])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      postFecth("movies", { name: movie, year: year, movie_director_id: idDirector }).then(() => {
        setMovie("");
        setIdDirector("");
        setYear("");
        setMessage1("Creado correctamente");

        setRefresh(true);
      })

    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      putFetch(`movies/${idEdit}`, { name: movieEdit }).then(() => {
        setMovieEdit("");
        setIdEdit("");
        setMessage2("Editado correctamente");
        setRefresh(true);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      deleteFetch(`movies/${idDelete}`).then(() => {
        setIdDelete("");
        setMessage3("Borrado correctamente");

        setRefresh(true);
      })
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="App">

      <div>
        <LoadingList isLoading={AppStateLoading} contents={appStateObject} />
      </div>
      <br />
      <div style={{ borderStyle: "dashed" }}>
      </div>
      <h2 className="first-Title">Agregar</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text1"
          value={movie}
          placeholder="Nombre de la Pelicula"
          onChange={(e) => setMovie(e.target.value)}
        />
        <br></br>
        <input
          type="text1"
          value={year}
          placeholder="Año de lanzamiento"
          onChange={(e) => setYear(e.target.value)}
        />
        <br></br>

        <input
          type="text1"
          value={idDirector}
          placeholder="Id del director"
          onChange={(e) => setIdDirector(e.target.value)}
        />


        <div>
          {message1 ? <p>{message1}</p> : null}
        </div>
        <button type="submit" className="button button_green"> Crear</button>
      </form>

      <br></br>
      <h2 className="first-Title">Actualizar</h2>
      <form onSubmit={handleEdit}>
        <input
          type="text2"
          value={idEdit}
          placeholder="id de la pelicula"
          onChange={(e) => setIdEdit(e.target.value)}
        />
        <br></br>
        <input
          type="text2"
          value={movieEdit}
          placeholder="Nuevo nombre de la pelicula"
          onChange={(e) => setMovieEdit(e.target.value)}
        />
        <div>
          {message2 ? <p>{message2}</p> : null}
        </div>
        <button type="submit" className="button button_yellow"> Editar</button>
      </form>
      <br></br>
      <h2 className="first-Title">Borrar</h2>
      <form onSubmit={handleDelete}>
        <input
          type="text3"
          value={idDelete}
          placeholder="Id a eliminar"
          onChange={(e) => setIdDelete(e.target.value)}
        />
        <div>
          {message3 ? <p>{message3}</p> : null}
        </div>
        <button type="submit" className="button button_red"> Eliminar</button>

      </form>


    </div>
  )
}


export default App;
