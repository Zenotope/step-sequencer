import React from "react";
import BoxRow from "./BoxRow";
import styles from "./StepSequence.module.css";



const StepSequence = props => {


  const grid = []
  for (let i = 0 ; i < props.notes.length; i++){
    grid.unshift(
        <div>
        {/* <button type="number">{props.notes[i]}</button> */}
        <BoxRow
        checked={props.checked}
        onToggle={props.onToggle}
        sequenceLength={props.sequenceLength}
        onPitchSelect={props.onPitchSelect}
        notes={props.notes}
        pitchConversion={props.pitchConversion}
        isActive={props.isActive}
        row={i}
        />
        </div>)
  }

return(
  <div id="step-sequence" className={styles.root}>
    {grid}
    {/* <BoxRow
      checked={props.checked}
      onToggle={props.onToggle}
      sequenceLength={props.sequenceLength}
      onPitchSelect={props.onPitchSelect}
      notes={props.notes}
      pitchConversion={props.pitchConversion}
      isActive={props.isActive}
      row="1"
    />
    <BoxRow
      checked={props.checked}
      onToggle={props.onToggle}
      sequenceLength={props.sequenceLength}
      onPitchSelect={props.onPitchSelect}
      notes={props.notes}
      isActive={props.isActive}
      row="0"
    /> */}
  </div>
)
};

export default StepSequence;
