import React from "react";
const List = (props) => {
    const { contents } = props;
    if (!contents || contents.length === 0) return <h1>No hay peliculas</h1>
    return (
        <ul>
            <h2 className="Second-Title">Estas son las peliculas disponibles</h2>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Anno</th>
                    <th>Id director</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                </tr>
                <tr>
                    <td>
                    {contents.map((content) => {
                        return (
                            <div >
                                <span className="Component-Title">{content.id}</span>    
                            </div>
                        );
                    })}
                    </td>
                    <td>
                    {contents.map((content) => {
                        return (
                            <div >
                                <span className="Component-Title">{content.name}</span>    
                            </div>
                        );
                    })}
                    </td>
                    <td>
                        {contents.map((content) => {
                            return (
                                <div >
                                    <span className="Component-Title">{content.year}</span>    
                                </div>
                        );
                        })}
                    </td>
                    <td>
                        {contents.map((content) => {
                            return (
                                <div >
                                    <span className="Component-Title">{content.director_id}</span>    
                                </div>
                        );
                        })}
                    </td>
                    <td>
                        {contents.map((content) => {
                            return (
                                <div >
                                    <span className="Component-Title">{content.director_first_name}</span>    
                                </div>
                        );
                        })}
                    </td>
                    <td>
                        {contents.map((content) => {
                            return (
                                <div >
                                    <span className="Component-Title">{content.director_last_name}</span>    
                                </div>
                        );
                        })}
                    </td>
                </tr>  
            </table>
        </ul>
    );

};

export default List;
//const List = (props) => {
  //  const { contents } = props;
    //if (!contents || contents.length === 0) return <h1>No hay peliculas</h1>
//
  //  return (
    //    <ul>
      //      <h2 className="Second-Title">Estas son las peliculas disponibles</h2>
        //    
          //  {contents.map((content) => {
            //    return (
              //      <div style={{background: "yellow", margin: "10px"}}>
                //        <li key={content.id}>
                  //          <span className="Component-Title"><b> Id: </b> {content.id}</span>
                    //        <span className="Component-Title"><b> Nombre: </b> {content.name}</span>
                      //      <span className="Component-Title"><b> Anno: </b> {content.year}</span>
                        //    <span className="Component-Title"><b> Id del director: </b>{content.director_id}</span>
                          //  <span className="Component-Title"><b> Nombre: </b>{content.director_first_name}</span>
                            //<span className="Component-Title"><b> Apellido: </b>{content.director_last_name}</span>
                        //</li>
                    //</div>

                //);
            //})}
        //</ul>
    //);

//};
