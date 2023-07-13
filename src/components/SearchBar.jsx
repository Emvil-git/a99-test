import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar() {
  return (
    <input type="text" name="" id="dynamic-search" placeholder='Enter keywords' className={styles.search}/>
  )
}

export default SearchBar;