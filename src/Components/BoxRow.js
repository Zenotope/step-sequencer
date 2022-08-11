import React from "react";
import styles from "./BoxRow.module.css";
import PitchSelect from "./PitchSelect";
import Box from "./Box";

const BoxRow = props => {

  // console.log(props.checked)
  // console.log(props.row)
  return(
  <div className={styles.root}>
    <PitchSelect
      onPitchSelect={props.onPitchSelect}
      notes={props.notes}
      row={props.row}
    />
    <Box
      checked={props.checked}
      row={props.row}
      isActive={props.isActive}
      onToggle={props.onToggle}
    />
  </div>
  )
  };

export default BoxRow;
