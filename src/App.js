import React, { useState, useEffect } from 'react';
import List from './components/List'
import WithLoadingList from './components/WithLoadingList'
import './App.css'
import { deleteFetch, getFetch, postFetch, putFetch } from './components/FetchMethods'


function App() {

  const LoadingList = WithLoadingList(List)

  const [content, setContent] = useState([])
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [premiereDate, setPremiereDate] = useState('')
  const [directorId, setDirectorId] = useState('')
  const [refresh, setRefresh] = useState(true)
  const [message1, setMessage1] = useState('')

  const [nameEdit, setNameEdit] = useState('')
  const [idEdit, setIdEdit] = useState('')
  const [message2, setMessage2] = useState('')

  const [idDelete, setIdDelete] = useState('')
  const [message3, setMessage3] = useState('')

  useEffect(() => {
    if (!refresh) return
    setLoading(true)
    getFetch('movies/').then((data) => {
      setContent(data)
      setLoading(false)
    })
    setRefresh(false)
  }, [setContent, setLoading, refresh])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      postFetch('movies/', { name: name, premiere_date: premiereDate, director_id: directorId })
        .then((response) => {
          setName('')
          setPremiereDate('')
          setDirectorId('')
          setMessage1('Creado correctamente')
          setRefresh(true)
        })
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async (event) => {
    event.preventDefault()
    try {
      putFetch(`movies/${idEdit}`, { name: nameEdit })
        .then(() => {
          setNameEdit('')
          setIdEdit('')
          setMessage2('Editado correctamente')
          setRefresh(true)
        })
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      deleteFetch(`movies/${idDelete}`)
        .then(() => {
          setIdDelete('')
          setMessage3('Eliminado correctamente')
          setRefresh(true)
        })
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='h-100 d-flex flex-column justify-content-center align-items-center'>
      <h2 className='header'> Primera conexion API Local</h2>
      <LoadingList isLoading={loading} contents={content} />
      <form className='d-flex flex-column w-25' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            value={name}
            className='form-control mb-2'
            placeholder='Nombre de pelicula'
            onChange={(e) => { setName(e.target.value); }} />
        </div>
        <div className='form-group'>
          <input
            type='text'
            value={premiereDate}
            className='form-control mb-2'
            placeholder='Fecha de estreno'
            onChange={(e) => { setPremiereDate(e.target.value); }} />
        </div>
        <div className='form-group'>
          <input
            type='text'
            value={directorId}
            className='form-control mb-2'
            placeholder='Id del director'
            onChange={(e) => { setDirectorId(e.target.value); }} />
        </div>
        <div>{message1 ? <p>{message1}</p> : <br />}</div>
        <button
          className='btn btn-primary m-2 align-self-center'
          type='submit'
        >
          Crear
        </button>
      </form>
      <form className='d-flex flex-column w-25' onSubmit={handleEdit}>
        <div className='form-group'>
          <input
            id='id'
            type='text'
            className='form-control mb-2'
            value={idEdit}
            placeholder='Identificador'
            onChange={(e) => { setIdEdit(e.target.value); }} />
        </div>
        <div className='form-group'>
          <input
            id='id'
            type='text'
            className='form-control mb-2'
            value={nameEdit}
            placeholder='Nombre de pelicula'
            onChange={(e) => { setNameEdit(e.target.value); }} />
        </div>
        <div>{message2 ? <p>{message2}</p> : <br />}</div>
        <button
          className='btn btn-warning m-2 align-self-center'
          type='submit'
        >
          Editar
        </button>
      </form>
      <form className='d-flex flex-column w-25' onSubmit={handleDelete}>
        <div className='form-group'>
          <input
            id='id'
            type='text'
            className='form-control'
            value={idDelete}
            placeholder='Identificador'
            onChange={(e) => { setIdDelete(e.target.value); }} />
          <div>{message3 ? <p>{message3}</p> : <br />}</div>
        </div>
        <button
          className='btn btn-danger m-2 align-self-center'
          type='submit'
        >
          Eliminar
        </button>
      </form>
    </div>
  );
}




export default App;
