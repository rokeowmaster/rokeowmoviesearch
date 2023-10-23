import { useEffect, useState } from 'react';
import './App.css';
import SeachIcon from './search.svg'
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=39941804'

function App() {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`)
    const data = await res.json()

    setMovies(data.Search)
  }

  useEffect(()=>{
    searchMovies('spiderman')
  },[])

  return (
    <div className="App">
      <h1>Movieland</h1>
      <div className='search'>
        <input
          placeholder='Search for Movies'
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />

        <img
          src={SeachIcon}
          alt='Search'
          onClick={()=>searchMovies(searchTerm)}
        />
      </div>
      {
        movies?.length > 0
        ?(
          <div className='container'>
          {movies.map((movie)=>(
            <MovieCard movie={movie}/>
          ))}
          </div>
        ):(
          <div className='empty'>
            <h3>No movies found</h3>
          </div>
        )
      }
    </div>
  );
}

export default App;
