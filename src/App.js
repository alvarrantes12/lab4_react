import React, {useState, useEffect} from "react";
import List from "./components/List";
import WithLoadingList from "./components/WithLoadingList";
import './App.css';
import {deleteFetch, getFetch, postFetch, putFetch} from "./components/FetchMethods";

function App() {
  const  LoadingList = WithLoadingList(List);
  const [appStateLoading, setAppStateLoading]= useState(false);
  const [appStateObject, setAppStateObject]= useState(null);

  const [name, setName]= useState("");
  const [year, setYear]= useState("");
  const [directorId, setDirectorId]= useState("");
  const [message1, setMessage1]=useState("");
  const[refresh, setRefresh]= useState(true);

  const [nameEdit, setNameEdit]=useState("");
  const [idEdit, setIdEdit]= useState("");
  const [message2, setMessage2]= useState("");

  const [idDelete, setIdDelete]= useState("");
  const [message3, setMessage3]= useState("");


  useEffect(()=>{
    if(refresh){
      setAppStateLoading(true);
      getFetch("movies").then(val => setAppStateObject(val))
      setAppStateLoading(false);
      setRefresh(false);
    }

  }, [setAppStateObject, setAppStateLoading, refresh])

  const handleSubmit=async(e) => {
    e.preventDefault();
    try {
      postFetch("movies",{
        name: name, 
        year: year,
        director_id: directorId}).then(()=> {
        setName("");
        setYear("");
        setDirectorId("");
        setMessage1("Creado correctamente");
        setRefresh(true);
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit= async (e)=>{
    e.preventDefault();
    try {
      putFetch(`movies/ ${idEdit}`, {name: nameEdit}).then(()=>{
        setNameEdit("");
        setIdEdit("");
        setMessage2("Editado correctamente ");
        setRefresh(true);
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async(e) =>{
    e.preventDefault();
    try {
      deleteFetch(`movies/${idDelete}`).then(()=> {
        setIdDelete("");
        setRefresh(true);
        setMessage3("Eliminado correctamente");
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <div className="First-Title">
        <h2 > API Of Movies</h2>
      </div>
      <div style={{margin: "20px"}}> 
        <br/>
        <form onSubmit={handleSubmit } style={{borderStyle:"ridge"}} className="Form_Style">
          <input
            type="text"
            value={name}
            placeholder="MovieName"
            onChange={(e)=> setName(e.target.value)}            
            style={{width: "200px"}}
            className="Input_Style"
          />
          <br/>
          <input
            type="text"
            value={year}
            placeholder="Year"
            onChange={(e)=> setYear(e.target.value)}            
            style={{width: "200px"}}
            className="Input_Style"
          />
          <br/>
          <input
            type="text"
            value={directorId}
            placeholder="Director Id"
            onChange={(e)=> setDirectorId(e.target.value)}            
            style={{width: "200px"}}
            className="Input_Style"
          />

          <div>{message1 ? <p>{message1}</p>: null}</div>
          <br/>
          <button type="submit" className="Button_Style" >Create</button>
        </form>



        <br/>
        <form onSubmit={handleEdit} style={{borderStyle:"ridge"}} className="Form_Style">
          <input
            type="text"
            value={idEdit}
            placeholder="ID"
            onChange={(e)=> setIdEdit(e.target.value)}
            style={{width: "50px"}}
            className="Input_Style"
          />
          <input
            type="text"
            value={nameEdit}
            placeholder="Movie Name"
            onChange={(e)=> setNameEdit(e.target.value)}
            style={{width: "200px"}}
            className="Input_Style"
          />
         <div>{message2 ? <p>{message2}</p>: null}</div>
          <br/>
          <button type="submit" className="Button_Style" >Edit</button>
        </form>

       <br/>
       <form onSubmit={handleDelete}style={{borderStyle:"ridge"}} className="Form_Style">
          <input
            type="text"
            value={idDelete}
            placeholder="Identification"
            onChange={(e)=> setIdDelete(e.target.value)}
            className="Input_Style"
          />
          <div>{message3 ? <p>{message3}</p>: null}</div>
          <br/>
          <button type="submit" className="Button_Style" >Delete</button>
        </form>

      </div>
      

      
      
      
      
      
      <div className="List-Element">  
        <LoadingList isLoading={appStateLoading} contents={appStateObject}/>
        <br/>
        <br/>
      </div>
     
      <br/>
      <br/>
     

    </div>




  );
}

export default App;
