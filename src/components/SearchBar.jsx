import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({launches ,setFiltLaunch, setTotalLaunches, setLoadedLaunches}) {

    const [filterTerm, setFilterTerm] = useState("");

    useEffect(
        ()=>{
            if (launches.length !== 0){
                if (filterTerm !== ""){
                    const filtLaunches = launches.filter(
                        launch => launch.mission_name.toLowerCase().includes(filterTerm.toLowerCase())
                    )

                    console.log(filtLaunches)

                    if (filtLaunches.length < 5){
                        setLoadedLaunches(filtLaunches.length)
                    } else {
                        setLoadedLaunches(5)
                    }

                    setFiltLaunch([...filtLaunches]);
                    setTotalLaunches(filtLaunches.length);
                } else {
                    setFiltLaunch([...launches]);
                    setTotalLaunches(launches.length);
                    setLoadedLaunches(5);
                }
            }
        },[filterTerm,launches]
    )

  return (
    <div className={styles.searchcont}>
        <input type="text" value={filterTerm} onChange={(ev) => {setFilterTerm(ev.target.value)}} id="dynamic-search" placeholder='Enter keywords' className={styles.search}/>
        <button disabled={filterTerm===''} onClick={() => {setFilterTerm('')}} className={styles.btn}>Clear</button>
    </div>
  )
}

export default SearchBar;