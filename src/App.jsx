import React, { useEffect, useState, Suspense, lazy } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'

const LazyLaunch = lazy(() => import('./components/LaunchItem'));

function Loading() {
  return(
  <div className="sk-cont">
    <div class="sk-chase">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>
  </div>
  )
}

function App() {
  
  const [launches, setLaunches] = useState([]);
  const [loadedLaunches, setloadedLaunches] = useState(5);
  const [totalLaunches, setTotalLaunches] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      fetch("https://api.spacexdata.com/v4/launches/")
      .then(response => response.json())
      .then(data => {
        
        setTotalLaunches(data.length)

        setLaunches(
        data.map(
          launch => {
            return {
              flight_number: launch["flight_number"],
              mission_name: launch["name"],
              details: launch["details"],
              year: launch["date_utc"].substr(0,4),
              patch_img: launch["links"]["patch"]["large"]
            }
          }
        )
        )
      }
      )
    },[])

  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.querySelector(".launch-cont").offsetHeight - 384;
      if (isNearBottom && loadedLaunches < totalLaunches) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadedLaunches, totalLaunches]);


  const loadMore = () => {
        if (!isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setloadedLaunches(prevloadedLaunches => prevloadedLaunches + 4);
        setIsLoading(false);
      }, 1000);
    }
  };

  const displayLaunches = () => {
    if (launches.length !== 0) {
      return (
        <Suspense fallback={<Loading/>}>
          {[...Array(loadedLaunches)].map((_, index) => (
            <React.Fragment key={index}>
              {index < launches.length ? (
                <LazyLaunch key={index} launchInfo={launches[index]} />
              ) : (
                <span>No more data follows</span>
              )}
            </React.Fragment>
            ))}
        </Suspense>
      )
    } else {
      return(
        <Loading/>
      )
    }
  }
  
  return (
    <div className='app'>
      <SearchBar/>

      <section className='launch-cont'>
        {displayLaunches()}
        {/* {<Suspense fallback={<div>Loading...</div>}>
          {[...Array(loadedLaunches)].map((_, index) => (
            <LazyLaunch key={index} prop={launches[index]?.value} />
            ))}

          {loadedLaunches < totalIterations && (
            <button onClick={loadMore}>Load More</button>
          )}
        </Suspense>} */}
      </section>
    </div>
  )
}

export default App
