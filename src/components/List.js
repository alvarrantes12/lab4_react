import React from 'react';

const List = ({ contents }) => {

  if (!contents || contents.length === 0) return <h1>No hay contenido</h1>
  return (
    <div>
      <h4>Estos son los contenidos disponibles</h4>
      {contents.map(({ id, name, premiere_date, director: { firstname, lastname } }) => (
        <div class="card m-2">
          <div class="card-body">
            <h5 className='card-title'>
              <b>Id: </b>
              <span>{id}</span>
            </h5>
            <span>
              <b>Nombre: </b>
              <span>{name}</span>
            </span>
            <br />
            <span>
              <b>Fecha de estreno:  </b>
              <span>{premiere_date}</span>
            </span>
            <br />
            <span>
              <b>Nombre del director: </b>
              <span>{`${firstname} ${lastname}`}</span>
            </span>
            <br />
          </div>
        </div>
      ))
      }
    </div >
  )
}
export default List
