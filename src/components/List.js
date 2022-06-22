import React from "react";

const List = (props) => {
    const {contents} = props;

    if (!contents || contents.length === 0) return <h1>No hay películas para mostrar</h1>

    return(
        <ul> 
            <h2 className="Component-Titlle">Estas son las películas disponibles</h2>
            {contents.map((content)=> {
                return (
                    <div style={{margin: "10px"}}>
                        <li key={content.id}>
                            <span className="Component-Title"><b className="Component-Attribute">ID :</b><b>{content.id}</b></span>
                            <br />
                            <span className="Component-Title"><b className="Component-Attribute">Nombre película :</b><b>{content.name}</b></span>
                            <br />
                            <span className="Component-Title"><b className="Component-Attribute">Año :</b><b>{content.year}</b></span>
                            <br />
                            <span className="Component-Title"><b className="Component-Attribute">Nombre director :</b><b>{content.director.first_name}</b></span>
                        </li>
                    </div>
                );
            })}
        </ul>
    );

};
export default List;