import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({launches ,setFiltLaunch}) {

    const [filterTerm, setFilterTerm] = useState("");

    useEffect(
        ()=>{
            if (launches.length !== 0){
                if (filterTerm !== ""){
                    const filtLaunches = launches.filter(
                        launch => launch.name.includes(filterTerm) || launch.details.includes(filterTerm)
                    )

                    setFiltLaunch([...filtLaunches]);
                } else {
                    setFiltLaunch([...launches])
                }
            }
        },[filterTerm,launches]
    )

  return (
    <input type="text" value={filterTerm} onChange={(ev) => {setFilterTerm(ev.target.value)}} id="dynamic-search" placeholder='Enter keywords' className={styles.search}/>
  )
}

export default SearchBar;