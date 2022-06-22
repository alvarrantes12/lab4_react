import React from "react";

const List = (props) => {
    const { contents } = props;

    if (!contents || contents.length ===0) return <h1>No hay ningun contenido</h1>

    return (
        <ul>
        <h2 className="Component-Title">Estos son las peliculas disponibles</h2>
        {contents.map((content) => {
            return (
                <div style={{background: "wheat", margin: "10px"}}>
                    <li key={content.id}>
                        <span className="Component-Title"><b>id:</b> {content.id}</span>
                        <span className="Component-Title"><b>pelicula:</b> {content.name}</span>
                        <span className="Component-Title"> <b>Año:</b> {content.year}</span>

                    </li>
                </div>

            );
        })}
    </ul>
    );
};
export default List;