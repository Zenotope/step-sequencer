import React from "react";
import PlayButton from "./PlayButton";
import TimeSignature from "./TimeSignature";
import TempoSlider from "./TempoSlider";
import TempoDisplay from "./TempoDisplay";
import TapTempo from "./TapTempo";
import ResetButton from "./ResetButton";
import styles from "./Buttons.module.css";

const Buttons = props => (
  <div id="buttons" className={styles.root}>
    <div className={styles.wrapperTop}>
      <PlayButton
        isPlaying={props.isPlaying}
        onTogglePlay={props.onTogglePlay}
      />
      <TimeSignature
        sequenceLength={props.sequenceLength}
        onLengthChange={props.onLengthChange}
      />
      <ResetButton onReset={props.onReset} />
    </div>
    <div className={styles.wrapperBottom}>
      <TapTempo handleTap={props.handleTap} />
      <TempoDisplay tempo={props.tempo} />
      <TempoSlider tempo={props.tempo} onTempoChange={props.onTempoChange} />
    </div>
    <div>
    <div>
      <b>Key</b>
          <select className="keySelect" onChange={(e) => props.onKeyFilter(e.target.value)}>
              <option value="C3">C</option>
              <option value="C#3">C#</option>
              <option value="D3">D</option>
              <option value="D#3">D#</option>
              <option value="E3">E</option>
              <option value="F3">F</option>
              <option value="F#3">F#</option>
              <option value="G3">G</option>
              <option value="G#3">G#</option>
              <option value="A3">A</option>
              <option value="A#3">A#</option>
              <option value="B3">B</option>
          </select>
      </div>
      {/* <div>
          <b>Mode</b>
          <select className="modeSelect" onChange={(e) => props.onModeFilter(e.target.value)}>
              <option value="major">Major</option>
              <option value="minor">Minor</option>
          </select>
      </div>
      <div>
          <b>Sound</b>
          <select className="soundSelect" onChange={(e) => props.onSoundChange(e.target.value)}> 
              <option value='sine'>Sine</option>
              <option value='square'>Square</option>
              <option value='sawtooth'>Saw</option>
              <option value='triangle'>Triangle</option>
          </select>
        </div> */}
      </div>
  </div>
);

export default Buttons;
