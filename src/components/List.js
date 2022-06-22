import React from "react";

const List = (props) => {
    const { contents } = props;

    if (!contents || contents.length === 0) return <h1>No hay contenido</h1>

    return (
        <ul>
            <h2 className="Componente-Title">Lista de peliculas</h2>
            {contents.map((content) => {
                return (
                    <div style={{background: "black", margin: "0px"}}>
                        <li key={content.id}>
                            <span className="Component-Title"> {content.id} <b>Nombre de la pelicula:</b> {content.name}<b> Año de estreno:</b> {content.year} <b>Director: </b> {content.first_name} <b>ID Director: </b> {content.director_id} </span>
                        </li>
                    </div>
                );
            })}
        </ul>
    );
};

export default List;