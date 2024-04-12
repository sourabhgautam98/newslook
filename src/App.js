import React, { useState, useEffect } from 'react'
import Menu from './components/Menu'
import NewsGrid from './components/NewsGrid'

function App() {
const [items, setItems] = useState([])
const [active, setActive] = useState (1)
const [category, setCategory] = useState("general")

useEffect(()=> {  
   
  const fetchData = async () => {
    const data = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=6fe3314f135f46fe998897cbba1c8606`;
     const res =  await fetch(data);
     const weajson = await res.json();
     setItems(weajson.articles);
    
  }
  fetchData();
 
  },[category]);

return (
 <div className='App'>
  <h1 className='title'>News Look</h1>
  <Menu active={active} setActive={setActive} setCategory={setCategory}/>
  <NewsGrid items={items} />
 </div>
)
}

export default App

