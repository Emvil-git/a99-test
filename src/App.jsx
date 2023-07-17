import React, { useEffect, useState, Suspense, lazy } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import LaunchItem from './components/LaunchItem'
import InfiniteScroll from 'react-infinite-scroll-component'

// const LazyLaunch = lazy(() => import('./components/LaunchItem'));

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
  const [filtLaunch, setFiltLaunch] = useState([]);

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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const isNearBottom =
  //       window.innerHeight + window.scrollY >= document.querySelector(".launch-cont").offsetHeight - 384;
  //     if (isNearBottom && loadedLaunches < totalLaunches) {
  //       loadMore();
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [loadedLaunches, totalLaunches]);


  const loadMore = () => {
      setTimeout(() => {
        setloadedLaunches(prevloadedLaunches => prevloadedLaunches + 4);
      }, 2000);
  };

  // const displayLaunches = () => {
  //   if (launches.length !== 0) {
  //     return (
  //       <Suspense fallback={<Loading/>}>
  //         {[...Array(loadedLaunches)].map((_, index) => (
  //           <React.Fragment key={index}>
  //             {index < filtLaunch.length ? (
  //               <LazyLaunch key={index} launchInfo={filtLaunch[index]} />
  //             ) : (
  //               <span>No more data follows</span>
  //             )}
  //           </React.Fragment>
  //           ))}
  //       </Suspense>
  //     )
  //   } else {
  //     return(
  //       <Loading/>
  //     )
  //   }
  // }

  const displayLaunches = () => {
    if (launches.length !== 0){
      return(
        <InfiniteScroll
          dataLength={loadedLaunches}
          next={loadMore}
          hasMore={loadedLaunches < totalLaunches}
          loader={<Loading/>}
          scrollableTarget='scroll-div'
          >
          {[...Array(loadedLaunches)].map((_, index) => {
            return <LaunchItem key={index} launchInfo={launches[index]}/>
          })}
        </InfiniteScroll>
      )
    } else {
      return (
        <Loading/>
      )
    }
  }
  
  return (
    <div className='app'>
      <SearchBar launches={launches} setFiltLaunch={setFiltLaunch}/>
      {console.log(filtLaunch)}
      <section className='launch-cont' id='scroll-div'>
        {/* {displayLaunches()} */}
        {displayLaunches()}

      </section>
    </div>
  )
}

export default App
