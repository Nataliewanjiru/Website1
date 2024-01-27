import React from 'react'
import { useEffect , useState, useRef} from "react";
import Tables from './Tables';
import "./index.css"


function Options({counties}) {
const [info,setInfo]= useState([])
const [detail,setDetail]= useState()
const [search,setSearch]=useState()
const [ward,setWard]= useState([])
const [loc,setLoc]=useState([])
const conRef = useRef(null); 
const seaRef = useRef(null); 
const wardRef =useRef((null))
const locRef = useRef((null))


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


{/*Function for filter*/}
const countyFilter = info.filter((item)=>{
  const nameMatches = !detail || detail === "" || item.name.toLowerCase().includes(detail);
 return nameMatches  
})

const subFiltered = countyFilter.map(county => ({
  ...county,
  subcounties: county.subcounties.filter(subcounty => {
    if (!search || search === '') {
      return true;
    } else {
      return subcounty.name.toLowerCase().includes(search);
    }
  }),
}));


const wardfiltered=subFiltered.map(county=>({
  ...county,
  subcounties:county.subcounties.map(subCounty =>({
    ...subCounty,
    wards:subCounty.wards.filter(wardSearch=>{
      if(!ward || ward===""){
        return true
      }else{
        return wardSearch.name.toLowerCase().includes(ward)
      }
    })
  }))
}))


const filtered=wardfiltered.map(county=>({
  ...county,
  subcounties:county.subcounties.map(subCounty =>({
    ...subCounty,
    wards:subCounty.wards.map(ward=>({
      ...ward,
      locations:ward.locations.filter(locSearch=>{
        if (!loc||loc===''){
          return true
        }else{
          return locSearch.name.toLowerCase().includes(loc)
        }
      })
    }))
  }))
}))


{/* For the subCounty Search*/}

 function searchChange(event){
  let value=event.target.value
   setSearch(value)
   }

 useEffect(() => {
  seaRef.current.focus();
}, [search]);


{/* For the ward Search*/}

 function wardChange(event){
  let value=event.target.value
   setWard(value)
   }

 useEffect(() => {
  wardRef.current.focus();
}, [ward]);


{/* For the location Search*/}
function locChange(event){
  let value=event.target.value
   setLoc(value)
   }

 useEffect(() => {
  locRef.current.focus();
}, [loc]);


  return (
    <>
    <form onSubmit={handleSubmit}>
    <input type="search" placeholder="Search county..." value={detail} onChange={Detail} ref={conRef}></input>
    <input type="search" placeholder="Search subCounty..." value={search} onChange={searchChange} ref={seaRef}></input>
    <input type="search" placeholder="Search ward..." value={ward} onChange={wardChange} ref={wardRef}></input>
    <input type="search" placeholder="Search location..." value={loc} onChange={locChange} ref={locRef}></input>
   </form>
   <Tables counties={filtered} />
    </>
  )
}

export default Options