import React from "react";

const List = (props) => {
    const { contents } = props;

    if (!contents || contents.lenght === 0) return <h1>No hay contenidos</h1>

    return (
        <ul>
            <h2 className="Component-Title">Estas películas están disponibles: </h2>
            {contents.map((content) => {
                return (
                    <div style={{ background: "yellow", margin: "10px" }}>
                        <li key={content.id}>
                            <span>{content.id} <b>Nombre: </b> {content.name}</span>
                            <span>{content.id} <b>ID: </b> {content.id}</span>
                            <span>{content.id} <b>Año: </b> {content.year}</span>
                            <span>{content.id} <b>Director: </b> {content.director.first_name}</span>
                        </li>
                    </div>
                );
            })}
        </ul>
    );
};
export default List;