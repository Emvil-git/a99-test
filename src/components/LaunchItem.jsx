import React from 'react'
import styles from './LaunchItem.module.css'

function LaunchItem({launchInfo}) {
  return (
    <div className={styles.cont}>
        <img className={styles.img} src={launchInfo.patch_img} alt='mission patch'/>
        <section className={styles.info}>
          <h3 className={styles.header}> 
            <span>{`Flight Number: ${launchInfo.flight_number}`}</span>
            <span>{`Mission: ${launchInfo.mission_name}`}</span>
            <span>{`Year: ${launchInfo.year}`}</span>
          </h3>

          <span className={styles.details}>
            {`Details: ${launchInfo.details}`}
          </span>
        </section>
    </div>
  )
}

export default LaunchItem