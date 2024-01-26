import React from 'react'
import "./index.css"
import './App.css'

function Tables({counties}) {
  return (
    <>
<thead>
  <tr>
    <th>County</th>
    <th>SubCounty</th>
    <th>Ward</th>
    <th>Location</th>
  </tr>
</thead>
<tbody>
  {counties.map(county=>{
    return (
      <tr className='tableInfo' key={county.id}>
        <td>{county.name}</td>
        <td>
          <ul>
            {county.subcounties.map((subcounty,index)=>{
          return(
            <>
            <br/>
              <li key={index}>{subcounty.name}</li>
              <br/>
            </>
          )
        }
        )}
          </ul>
        </td>
        <td>
           <ul>
             {county.subcounties.map((subcounty,index)=>{
           return(
            <>
            <br/>
            <ul key={index}>
             {subcounty.wards.map((ward, index) => (
               <li key={index}>{ward.name}</li>
             ))}
            </ul>
            <br/>
          
            </>
           )
         }
         )}
           </ul>
         </td>
         <td>
            <ul>
              {county.subcounties.map((subcounty,)=>{
            return(
             <>
             <br/>
             <ul key={subcounty.id}>
              {subcounty.wards.map((ward) => {
                return(
                  <>
                  <ul key={ward.id}>
                  {ward.locations.map(loc=> {
                     return(<li key={loc.id}>{loc.name}</li>)
                  })
                  }
                  </ul>
                  </>
                )
              })}
             </ul>
             <br/>
           
             </>
            )
          }
          )}
            </ul>
         </td>
      </tr>
    )
  })}
</tbody>
</>
  )
}

export default Tables