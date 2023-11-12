import React from 'react';
import styles from "../../style/SWFavorits_loading.module.css"

function Loading({ message = "Loading..." }) {
  return <p className={styles.LoadingMsg} >{message}</p>;
}

export default Loading;