import React from 'react'
import { useEffect , useState, useRef} from "react";
import Tables from './Tables';
import "./index.css"

function Options({counties}) {
const [info,setInfo]= useState([])
const [detail,setDetail]= useState()
const [search,setSearch]=useState()
const conRef = useRef(null); 
const seaRef = useRef(null); 


useEffect(()=>{
 setInfo(counties)
},[])


{/* For the County Search*/}

function handleSubmit(e){
  e.preventDefault();
 }

 function Detail(event){
  let value=event.target.value
   setDetail(value)
   }

 useEffect(() => {
  conRef.current.focus();
}, [detail]);

const countyFilter = info.filter((item)=>{
  const nameMatches = !detail || detail === "" || item.name.toLowerCase().includes(detail);
 return nameMatches
    
})

const filtered = countyFilter.map(county => ({
  ...county,
  subcounties: county.subcounties.filter(subcounty => {
    if (!search || search === '') {
      return true;
    } else {
      return subcounty.name.toLowerCase().includes(search);
    }
  }),
}));



console.log(filtered)

{/* For the subCounty Search*/}
function handleSubmit(e){
  e.preventDefault();
 }

 function searchChange(event){
  let value=event.target.value
   setSearch(value)
   }

 useEffect(() => {
  seaRef.current.focus();
}, [detail]);


  return (
    <>
    <form onSubmit={handleSubmit}>
    <input type="search" placeholder="Search county..." value={detail} onChange={Detail} ref={conRef}></input>
    <input type="search" placeholder="Search subCounty..." value={search} onChange={searchChange} ref={seaRef}></input>
   
   </form>
   <Tables counties={filtered} />
    </>
  )
}

export default Options