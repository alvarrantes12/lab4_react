import React from "react";
import '../App.css';


const List = (props) => {
    const { contents } = props;

    if (!contents || contents.length === 0) return <h1>No hay contenidos</h1>

    return (
        <ul>
            <h2>Estos son los contenidos disponibles</h2>
            {contents.map((content) => {
                return (
                    <div className="List-Format">
                        <li key={content.id}></li>
                        <span>{content.id} - <b>Nombre: </b> {content.name} - </span>
                        <span><b>Año de publicación: </b> {content.year} - </span>
                        <span><b>Nombre director: </b> {content.director}. </span>
                    </div>
                );
            })}
        </ul>
    );
};

export default List;