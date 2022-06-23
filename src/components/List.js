import React from "react";

const List = (props) => {
    const {contents} = props;

    if (!contents || contents.length === 0) return <h1>No hay películas</h1>

    return (
    <ul>
        <h2>Estas son las películas disponibles</h2>
        {contents.map((content) => {
            return (
                <header class="text">
                    <li key={content.id}>
                        <span>{content.id} <b>Nombre:</b> {content.name} </span>
                        <span><b>Año de publicación:</b> {content.publication_year} </span>
                        <span><b>Nombre director:</b> {content.first_name} {content.last_name} </span>
                    </li>
                </header>
            )
                
        })}
    </ul>
    );
};
export default List;