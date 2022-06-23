import React from "react";

const List = (props)=>{
    const{contents} = props;
    if (!contents || contents.length === 0)return <h1>No hay Contenidos</h1>
    return (
        <ul>
            <h2 className="First-Title">List</h2>
            {contents.map((content)=> {
                return (
                    <div style={{margin: "20px"}}>
                        <li key={content.id}>
                            <span><b>ID: </b> {content.id}</span>
                            <span><b>  Nombre: </b> {content.name}</span>
                            <span><b>  Year: </b> {content.year}</span>
                            <span><b>  Director: </b> {content.director}</span>
                        </li>
                    </div>
                    
                );
            })}
        </ul>
    );
}
export default List;