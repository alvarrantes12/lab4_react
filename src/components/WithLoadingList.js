import React, { Component } from "react";
function WithLoadingList(Component){
    return function WithLoadingList({isLoading, ...props}){
        if (!isLoading) return <Component {...props}/>

        return (
            <p>Wait we are uploading the information...</p>
        );
    }; 
}
export default WithLoadingList;