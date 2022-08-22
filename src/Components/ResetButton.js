import React from "react";
import styles from "./ResetButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResetButton = props => (
  <div className={styles.root} onClick={(e) => props.onReset(e)}>
    <span className={styles.label}>
      <FontAwesomeIcon icon="recycle" />
    </span>
  </div>
);

export default ResetButton;
