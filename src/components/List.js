import React from "react";

const List = (props) => {
    const { contents } = props;
    if (!contents || contents.length === 0) return <h1>No hay Peliculas</h1>

    return (
        <ul>
            <h2>Peliculas </h2>


            <div>
                <table>
                    <tr>
                        <th>Pelicula</th>
                        <th>Año de lanzamiento</th>
                        <th>Director</th>
                    </tr>
                    {contents.map((content) => {
                        return (
                            <tr>
                                <td>{content.name}</td>
                                <td>{content.year}</td>
                                <td>{content.director_name}</td>
                            </tr>
                        )
                    })}
                </table>

            </div>
        </ul>
    );

}
export default List;