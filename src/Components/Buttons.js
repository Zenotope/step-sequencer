import React from "react";
import PlayButton from "./PlayButton";
import TimeSignature from "./TimeSignature";
import TempoSlider from "./TempoSlider";
import TempoDisplay from "./TempoDisplay";
import ResetButton from "./ResetButton";
import VolumeSlider from "./VolumeSlider";
import styles from "./Buttons.module.css";

const Buttons = props => (

<div id="buttons" className={styles.root}>
    <div id="transport" className={styles.wrapperTop}>
        <PlayButton
          isPlaying={props.isPlaying}
          onTogglePlay={props.onTogglePlay}
        />
        <TimeSignature
          sequenceLength={props.sequenceLength}
          onLengthChange={props.onLengthChange}
        />
        <ResetButton onReset={props.onReset} />
        <TempoDisplay tempo={props.tempo} />
        <TempoSlider tempo={props.tempo} onTempoChange={props.onTempoChange} />
    </div>
    <div>
        <VolumeSlider volume={props.volume} onVolumeChange={props.onVolumeChange} />
    </div>
  
  <div id="controls" className={styles.wrapperBottom}>
      <div className="Key">
        <b>Key</b>
            <select className="keySelect" onChange={(e) => props.onKeyFilter(e.target.value)}>
                <option value="C">C</option>
                <option value="C#">C#</option>
                <option value="D">D</option>
                <option value="D#">D#</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="F#">F#</option>
                <option value="G">G</option>
                <option value="G#">G#</option>
                <option value="A">A</option>
                <option value="A#">A#</option>
                <option value="B">B</option>
            </select>
        </div>
        <div>
            <b>Mode</b>
            <select className="modeSelect" onChange={(e) => props.onModeFilter(e.target.value)}>
                <option value="major">Major</option>
                <option value="minor">Minor</option>
                {/* <option value="chromatic">Chromatic</option> */}
                <option value="harmonic minor">Harmonic Minor</option>
                <option value="minor blues">Minor Blues</option>
            </select>
        </div>
        <div>
            <b>Octave</b>
            <select value={props.octave} className="octSelect" onChange={(e) => props.onOctFilter(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <div>
            <b>Sound</b>
            <select className="soundSelect" onChange={(e) => props.onSoundChange(e.target.value)}> 
                <option value='sine'>Sine</option>
                <option value='triangle'>Triangle</option>
                <option value='sawtooth'>Saw</option>
                <option value='sawtooth8'>Saw8</option>
                <option value='square'>Square</option>
                <option value='square8'>Square</option>
                
            </select>
        </div>
    </div>
    <button onClick={() => props.delayToggle()}>Delay</button>
    <button onClick={() => props.distortionToggle()}>Distortion</button>
    <button onClick={() => props.verbToggle()}>Reverb</button>
    

</div>

);

export default Buttons;
