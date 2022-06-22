import React from "react";

const List = (props) => {
    const { contents } = props;

    if (!contents || contents.length === 0) return <h1>No hay peliculas</h1>


    return (
        <ul>
            <h2 className="Component-Title">Estos son los contenidos disponibles</h2>
            {contents.map((content) => {
                return (
                    <div style={{background: "yellow", margin: "10px"}}>
                        <li key={content.id}>
                            <span classname="Component-Title">{content.id}<b>Nombre</b> {content.name}<b>year</b>
                            {content.year} <b>Director</b> {content.director.first_name} {content.director.last_name} </span>
                        </li>
                    </div>
                );
            })}
        </ul>
    );

};