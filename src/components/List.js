import React from "react";

const List = (props) => {
  const {contents} = props;

  if(!contents || contents.length === 0) return <h1>No hay contenido</h1>

  return (
    <ul>
      <h2 className= "Component-Title"> Estos son los contenidos disponibles</h2>
      {contents.map((content) =>{
        return (
          <div style={{background: "yellow", margin: "10px"}}>
              <li key={content.id}> 
                <span className="Component-Title">{content.id}<b>Id:</b> {content.id}</span>
                <span className="Component-Title">{content.id}<b>Nombre Pelicula:</b> {content.name}</span>
                <span className="Component-Title">{content.id}<b>Año de publicación:</b> {content.year_of_publication}</span>
                <span className="Component-Title">{content.id}<b>Director:</b> {content.director.name}</span>
              </li>
          </div>
        
        );
      })}
    </ul>
  );
};
export default List;
