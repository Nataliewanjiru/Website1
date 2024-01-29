import React from 'react'
import { useEffect , useState, useRef} from "react";
import Tables from './Tables';
import "./index.css"


function Options({counties}) {
const [count,setCount]= useState()
const [subCount,setsubCount]=useState()
const [ward,setWard]= useState([])
const [loc,setLoc]=useState([])
const countRef = useRef(null); 
const subCountRef = useRef(null); 
const wardRef =useRef((null))
const locRef = useRef((null))


{/* Sets fetched data from database as Info*/}


{/*Function for filter*/}

{/*County filter*/}
const countyFilter = counties.filter((item) => {
  if (count) {
    {/*Filters county only*/}
    const nameMatches = !count|| count === "" || item.name.toLowerCase().includes(count.toLowerCase());
    return nameMatches;
  } else if (subCount && item.subcounties) {
   {/*Filters county in terms of subcounty*/}
    const nameMatches = item.subcounties.some((sub) => sub.name.toLowerCase().includes(subCount.toLowerCase()));
    return nameMatches;
  } else if(ward) {
    const nameMatches = item.subcounties.some((sub) => {
      return sub.wards.some((wardItem) => {
        return wardItem.name.toLowerCase().includes(ward);
      });
    });
    return nameMatches;
  } else if(loc){
     const nameMatches = item.subcounties.some((sub) => {
      return sub.wards.some((wardItem) => {
        return wardItem.locations.some(locItem=>locItem.name.toLowerCase().includes(loc))
      });
    });
    return nameMatches;
  }
return true;
});


{/*subCounty filter*/}

const subFiltered =countyFilter.map((county) => ({
  ...county,
  subcounties: county.subcounties.filter((subcounty) => {
    if (subCount) {
      {/*Filters subcounty only*/}
      const nameMatches = subcounty.name.toLowerCase().includes(subCount)
       return nameMatches;} 
    else if(ward) {
      {/*Filters subcounty in terms of ward*/}
      const nameMatches = subcounty.wards.some((subward) => subward.name.toLowerCase().includes(ward));
      return nameMatches;
    }else if(loc){
      const nameMatches = subcounty.wards.some((ward) => {
        return ward.locations.some((locItem) => {
          return locItem.name.toLowerCase().includes(loc);
        });
      });
      return nameMatches;
    }
    return true;
  }),
}))


{/*Ward filter*/}
const wardfiltered=subFiltered.map(county=>({
  ...county,
  subcounties:county.subcounties.map(subCounty =>({
    ...subCounty,
    wards:subCounty.wards.filter(wardSearch=>{
      if(ward){
        const nameMatches = wardSearch.name.toLowerCase().includes(ward);
        return nameMatches;
      }else if(loc){
        const nameMatches = wardSearch.locations.some((wardLoc) => wardLoc.name.toLowerCase().includes(loc));
        return nameMatches;
      }
        return true;
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







{/*Functionalities for change of input state */}

{/* For the County Search Input*/}

function handleSubmit(e){
  e.preventDefault();
 }

 function countChange(event){
  let value=event.target.value
   setCount(value)
   }

 useEffect(() => {
  countRef.current.focus();
}, [count]);



{/* For the subCounty Search Input*/}

 function subCountChange(event){
  let value=event.target.value
   setsubCount(value)
   }

 useEffect(() => {
  subCountRef.current.focus();
}, [subCount]);


{/* For the ward Search Input*/}

 function wardChange(event){
  let value=event.target.value
   setWard(value)
   }

 useEffect(() => {
  wardRef.current.focus();
}, [ward]);


{/* For the location Search Input*/}
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
    <input type="search" placeholder="Search county..." value={count} onChange={countChange} ref={countRef}></input>
    <input type="search" placeholder="Search subCounty..." value={subCount} onChange={subCountChange} ref={subCountRef}></input>
    <input type="search" placeholder="Search ward..." value={ward} onChange={wardChange} ref={wardRef}></input>
    <input type="search" placeholder="Search location..." value={loc} onChange={locChange} ref={locRef}></input>
   </form>
   {
    filtered.length > 0 ?<Tables counties={filtered}/>:<Tables counties={counties}/>
   }
  
    </>
  )
}

export default Options