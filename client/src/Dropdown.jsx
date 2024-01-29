import React from 'react'
import {useState} from "react";
import Tables from './Tables';


function Dropdown({counties}) {
const [county,setCounty]= useState()
const[subcounty,setSubcounty]=useState()
const[ward,setWard]=useState()
const[location,setLocation]=useState()
const[data,setData]=useState()
  

{/*Option choice for all*/}
const countyChange = (event) => {
    setCounty(event.target.value);
  };
  
const subcountyChange = (event) => {
    setSubcounty(event.target.value);
};

const wardChange = (event) => {
    setWard(event.target.value);
  };

  const locationChange = (event) => {
    setLocation(event.target.value);
  };

  const filterFunction = () => {
    if (county) {
    return counties.filter(count=>{
        if(count.id == county){
            setData(count)
        }
    }
      )
    }  
    return []; 
  };
  


  return (
    <>
     <select value={county} onChange={countyChange}>
     <option  value="Choose">Choose</option>
      {counties.map(county=>{
        return(
        <>
        <option key={county.id} value={county.id}>{county.name}</option>
         </>
        )
      })}
       </select>
 <select value={subcounty} onChange={subcountyChange} >
 <option  value="Choose">Choose</option>
 {data && data.subcounties.map(subcounty => (
  <option key={subcounty.id} value={subcounty.id}>{subcounty.name}</option>  
))}
</select>

<select value={ward} onChange={wardChange}>
<option  value="Choose">Choose</option>
  {data&& data.subcounties.map(subcounty => (
    subcounty.wards.map(ward=>{
            return(
                 <option key={ward.id} value={ward.id}>{ward.name}</option>
            )
    })
  ))}
</select>

<select value={location} onChange={locationChange}>
<option  value="Choose">Choose</option>
  {data&&data.subcounties.map(subcounty => (
    subcounty.wards.map(ward=>{
            return ward.locations.map(location=>{
                return(
                    <option key={location.id} value={location.id}>{location.name}</option>
                )
            })})))}
</select>

<button onClick={filterFunction}>Search</button>
    </>
  )
}

export default Dropdown