import axios from 'axios';
import './App.css';
import { useState } from 'react';

function App() {


  const [movieList, setmovieList] = useState([]);
  let getMovieName = (title = '') => {
    let apiUrl;

    if (title === '') {


      apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`;

    }
    else {

      apiUrl = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${title}`;

    }
    axios.get(apiUrl)
      .then((response) => {
        // console.log( response)

        setmovieList(response.data.results)

      }
      )

  }
  return (
    <div className="bg-blue-300   ">

      <div className='min-h-[100vh]'>
        <h1 className='text-[40px] text-center '>Movie Search App</h1>

        <div className='max-w-[600px] mx-auto'>
          <input type='text' className='w-[100%] h-[50px] mt-5 pl-[10px]' onChange={(event) => { getMovieName(event.target.value) }} />
        </div>

        <div className='max-w-[1320px] mx-auto mt-5 grid grid-cols-4 gap-5'>
          {
            movieList.length >= 1 ?
              movieList.map((items, index) => {

                return (

                  <>
                    <MoviedData data={items} key={index}></MoviedData>
                  </>
                )
              }


              )
              :

              <div className='text-red-500'>
                Data not found
              </div>
          }
        </div>
      </div>

    </div>
  );
}

function MoviedData({ data }) {

  console.log(data)
  return (
    <>
      <div className='shadow-lg bg-white text-center pb-[10px]'>
        <img src={`https://image.tmdb.org/t/p/w1280${data.poster_path}`} />

        <h3 className='text-[20px] font-bold text-center py-[10px]'>{data.original_title}</h3>
        <p>
          Rating {data.vote_average}
        </p>
      </div>
    </>
  )

}

export default App;
