import React from 'react';



function WithLoadingList(Component) {
  return function WithLoadingList({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />
    return <p>Espere, se esta cargando la informacion</p>
  }
}


export default WithLoadingList