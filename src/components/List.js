import React from "react";

const List = (props) => {
    const {contents} = props;

    if (!contents || contents.lenght === 0) return <h1>No hay Peliculas</h1>

    return (
        <ul>
            <h2 className="Component-Title">Estas son las Peliculas disponibles</h2>
            {contents.map((content) => {
                return (
					<div className="div-list">
                  	  <li key={content.id}>
                      	  <span className="Component-Title"> <b>Pelicula: </b>{content.name} 
						  <b> | Publicacion: </b>{content.publicationYear} <b> | Director: </b>[ {content.idDirector} ] {content.nameDirector} {content.lastname}</span>
                    	</li>
					</div>
                )
            })}
        </ul>
    )
}
export default List;