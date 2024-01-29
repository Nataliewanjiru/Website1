import { useEffect, useState } from 'react'
import './App.css'
import Options from './Options'
import { Route, Routes,Navigate } from 'react-router-dom';
import Dropdown from './Dropdown';



function App() {
  const [counties, setCounties] = useState([])

  useEffect(()=>{
    fetch('http://127.0.0.1:5685/county')
    .then(res=>res.json())
    .then(data => setCounties(data))
  },[])
    
  return (
    <>
    <Routes>
    <Route path="/" exact="true" element={<Options counties={counties}/>}/>
    <Route path="/two" exact="true" element={<Dropdown counties={counties}/>}/>
    </Routes>
    </>
  )
}

export default App
