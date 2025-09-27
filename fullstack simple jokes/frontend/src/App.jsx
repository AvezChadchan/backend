import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])
  useEffect(() => {
    axios.get('/api/jokes')
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  });

  return (
    <>
      <h1>First FullStack</h1>
      <p>JOKES:{jokes.length}</p>
      {
        jokes.map((i, index) => (
          <div key={i.id} style={{
            'display': 'flex',
            'flexDirection': 'column',
            'gap': 2,
            'border': '3px solid white'
          }}>
            <h3>{i.title}</h3>
            <p >{i.joke}</p>
          </div>
        ))
      }
    </>
  )
}

export default App