import React from "react";

const List = (props) => {
  const { contents } = props;

  if (!contents || contents.length === 0) return <h1>No hay contenido</h1>

  return (
    <ul>
      <h2 className="Component-Title"> Estos son los contenidos disponibles</h2>
      <table className="Movie-Table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Año de estreno</th>
            <th>Director</th>
          </tr>
        </thead>
        {contents.map(({ id, name, age, director: { first_name, last_name } }) => {
          return (
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{age}</td>
                <td><>{first_name} {last_name}</></td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </ul>
  )
}
export default List;