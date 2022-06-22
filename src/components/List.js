import React from "react";

const List = (props) => {
    const {movies} = props;

    if (!movies || movies.lenght === 0) return <h1>No hay películas</h1>

    return (
        <ul>
            <h2>Estas son las películas disponibles</h2>
            {movies.map((movies) => {
                return (
                    <li key={movies.id}>
                        <span>{movies.id} <b>Nombre: </b>{movies.name}</span>
                    </li>
                )
            })}
        </ul>
    )
}
export default List;