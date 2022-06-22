import React from "react";
//WithLoadingList
function WithLoadingList(Component){
	return function WithLoadingList({isLoading, ...props}){
		if(!isLoading) return <Component {...props} />

		return(
			<p>Espere, se esta cargando la información</p>
		);
	};
}
export default WithLoadingList;
