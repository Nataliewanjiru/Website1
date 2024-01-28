import { useEffect, useState } from 'react'
import './App.css'
import Options from './Options'


function App() {
  const [counties, setCounties] = useState([])

  useEffect(()=>{
    fetch('http://127.0.0.1:5679/county')
    .then(res=>res.json())
    .then(data => setCounties(data))
  },[])
    
  console.log(counties)
  return (
    <>
     <Options counties={counties}/>  
   
    </>
  )
}

export default App
