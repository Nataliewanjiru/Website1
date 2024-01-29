import { useEffect, useState } from 'react'
import './App.css'
import Options from './Options'
import Tables from './Tables'


function App() {
  const [counties, setCounties] = useState([])

  useEffect(()=>{
    fetch('http://127.0.0.1:5685/county')
    .then(res=>res.json())
    .then(data => setCounties(data))
  },[])
    
  return (
    <>
     <Options counties={counties}/>  
    
    </>
  )
}

export default App
