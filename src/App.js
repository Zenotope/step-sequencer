import React, { useState, useEffect } from "react";
import Tone from "tone";
import _ from "lodash";
import Title from "./Components/Title";
import Buttons from "./Components/Buttons";
import StepSequence from "./Components/StepSequence";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faStop,
  faRecycle,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import StartAudioContext from "startaudiocontext";
import { Scale } from "@tonaljs/tonal";

function toggleBox(priorChecked, i, row) {
  const checked = [...priorChecked];
  checked[row][i] = !checked[row][i];
  return checked;
}


const context = new AudioContext();

// fontawesome library setup
library.add(faPlay);
library.add(faStop);
library.add(faRecycle);
library.add(faInfoCircle);

function App() {
  const[checked, setChecked] = useState( [
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    ]
    )
  const[isPlaying, setIsPlaying] = useState(false)
  const[sequenceLength, setSequenceLength] = useState(16)
  const[tempo, setTempo] = useState(120)
  const[key, setKey] = useState("C")
  const[mode, setMode] = useState("major")
  const[octave, setOctave] = useState("3")
  // const[notes, setNotes] = useState("")
  const[maxTempo, setMaxTempo] = useState(300)
  const[isActive, setIsActive] = useState([
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1],  
  ])
  const[renderedNotes, setRenderedNotes] = useState([])
  const[partContainer, setPartContainer] = useState([])
  const[landscape, setLandscape] = useState(false)
  const[velocity, setVelocity] = useState(.4)
  const[sound, setSound] = useState("sine")
  const[volume, setVolume] = useState(-3)

  const[delay, setDelay] = useState(false)
  const[distortion, setDistortion] = useState(false)
  const[verb, setVerb] = useState(false)

  let scale = `${key}${octave} ${mode}`
  let noteSet = Scale.get(scale).notes

  let pingPong = new Tone.PingPongDelay("8n", .2).toMaster()
  pingPong.wet.value = 0

  let dist = new Tone.Distortion(0.8).toMaster();
  dist.wet.value = 0

  let reverb = new Tone.Reverb(2).toMaster();
  reverb.wet.value = 0

  const synth = new Tone.PolySynth(4, Tone.Synth, {oscillator: {type: sound}, volume: volume}).chain(reverb ,pingPong, dist,  Tone.Master);

  
  // Tone.connect(synth, reverb)
  // Tone.connect(synth, pingPong)
  ;


    // defaults: {
    //   tempo: 120,
    //   sequenceLength: 16,
    //   isPlaying: false,
    //   elapsedTime: 0,
    //   numberOfTaps: 0,
    //   averageBPM: 0,
    //   checked: [
    //     [true, false, false, false, false, false, false, false],
    //     [false, false, true, false, true, false, true, false]
    //   ],
    //   notes: ["Eb5", "C5"],
    //   isActive: [[0, 1, 0, 1, 0, 1, 0, 1], [0, 1, 0, 1, 0, 1, 0, 1]]
    // },
    // landscape: false,
    // velocity: 0.1
  

  useEffect (() => {
    generateMetronome();

    // starts both audio contexts on mounting
    StartAudioContext(Tone.context);
    StartAudioContext(context);

    // event listener for space, enter and 't'
    // window.addEventListener("keydown", e => {
    //   if (e.keyCode === 32 || e.keyCode === 13) {
    //     try {
    //       e.preventDefault(); // prevents space bar from triggering selected checkboxes
    //       this.onTogglePlay();
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   } else if (e.keyCode === 84) {
    //     try {
    //       e.preventDefault(); // prevents space bar from triggering selected checkboxes
    //       this.handleTap();
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    // });

    // check for orientation, add event listener
    // if (
    //   window.screen.orientation &&
    //   Math.abs(window.screen.orientation.angle) === 90 &&
    //   window.screen.height < 500
    // )
    //   setLandscape({ landscape: true });
    // window.addEventListener("orientationchange", () => {
    //   if (Math.abs(window.screen.orientation.angle) !== 90) {
    //     setLandscape({ landscape: false });
    //   } else if (window.screen.height < 500) {
    //     setLandscape({ landscape: true });
    //   }
    // });
  }, []);

  const onToggleBox = (i, row) => {
    setChecked(toggleBox(checked, i, row))
        generateMetronome();
  };

  function onTogglePlay() {
    // setIsPlaying(!isPlaying)
      
        if (isPlaying) {
          setIsPlaying(!isPlaying)
          //stop transport, turn off looping - prevents collision with measure sequence loop
          Tone.Transport.stop();
          Tone.Transport.loop = false;
          Tone.Transport.loopEnd = 0;
          // isActive array zeroed out
          setIsActive([[], [], [], [], [], [], []])
          console.log("stopped");
        } else {
          // configure looping for step sequencer
          setIsPlaying(!isPlaying)
          Tone.Transport.loop = true;
          Tone.Transport.loopStart = 0;
          Tone.Transport.loopEnd =
            (sequenceLength * 15) / tempo;
          Tone.Transport.start("+0.1");
          console.log("playing");
        
      }
    ;
  };

  const onLengthChange = sequenceLength => {
    // create a new checked array and push simple everyother note pattern
    // const checked = [[], [], [], [], [], [], []];
    // for (let i = 0; i < sequenceLength; i++) {
    //   checked[0].push(i === 0);
    //   checked[1].push(i !== 0 && i % 2 === 0);
    // }
    setSequenceLength(sequenceLength)
    setChecked(checked)
    Tone.Transport.loopEnd = (sequenceLength * 15) / tempo;
    generateMetronome();
      
    ;
  };

  // const restartPlaying = () => {
  //   if (isPlaying) {
  //     setIsPlaying({ isPlaying: isPlaying }, () => {
  //       Tone.Transport.stop();
  //       Tone.Transport.loopStart = 0;
  //       Tone.Transport.loopEnd =
  //         (sequenceLength * 15) / tempo;
  //       Tone.Transport.loop = true;
  //       Tone.Transport.start("+0.0");
  //       console.log("playing restarted");
  //     });
  //   } else {
  //     console.error("restartPlaying called while not playing");
  //   }
  // };

  // onLengthChange = sequenceLength => {
  //   // create a new checked array and push simple everyother note pattern
  //   const checked = [[], [], []];
  //   for (let i = 0; i < sequenceLength; i++) {
  //     checked[0].push(i === 0);
  //     checked[1].push(i !== 0 && i % 2 === 0);
  //   }
  //   this.setState(
  //     () => ({
  //       sequenceLength,
  //       checked
  //     }),
  //     () => {
  //       Tone.Transport.loopEnd = (sequenceLength * 30) / this.state.tempo;
  //       this.generateMetronome();
  //     }
  //   );
  // };

  const onTempoChange = tempo => {
    setTempo(tempo)
    Tone.Transport.bpm.value = tempo;
  };

  function onReset(e){
      setIsPlaying(false)
      setChecked([
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
      ])
      setIsActive([
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1], 
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 , 1],  
      ])
      setRenderedNotes([])
      setPartContainer([])

      generateMetronome()
      forceStop();
      }
   

  const forceStop = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel()
    Tone.Transport.loop = false;
    Tone.Transport.loopEnd = 0;
    console.log("force stopped");
  };



  // handleTap = () => {
  //   // timeContainer maintenance - shift and push
  //   const timeContainer = this.state.timeContainer;
  //   if (timeContainer.length > 2) timeContainer.shift();
  //   timeContainer.push(context.currentTime.toFixed(3));

  //   // calculate tempo
  //   const tempo = Math.round(
  //     60 /
  //       (timeContainer
  //         .slice(1)
  //         .map((time, i) => time - timeContainer[i])
  //         .reduce((a, b) => a + b, 0) /
  //         (timeContainer.length - 1))
  //   );

  //   // make sure tempo is within acceptable bounds
  //   if (tempo > 40 && tempo < 301) {
  //     this.setState({ tempo }, () => this.onTempoChange(tempo));
  //   } else if (tempo > 300) {
  //     this.setState({ tempo: this.state.maxTempo }, () =>
  //       this.onTempoChange(this.state.tempo)
  //     );
  //   }
  // };

  // onPitchSelect = (note, row) => {
  //   this.setState(
  //     {
  //       notes:
  //         row === "0" // refactor this conditional
  //           ? [note, this.state.notes[1]]
  //           : [this.state.notes[0], note]
  //     },
  //     () => {
  //       this.generateMetronome();
  //     }
  //   );
  // };

  const generateMetronome = () => {
    // erase or stop all previous parts
    // const partContainer = partContainer;
    partContainer.forEach(part => part.removeAll());

    // metronome vitals
    const [note1, note2, note3, note4, note5, note6, note7] = noteSet,
      seqLength = sequenceLength,
      matrix = checked,
      // velocity = velocity;

    // const notes = this.state.notes


    // new renderedNotes array, populate
    renderedNotes = [];
    for (let i = 0; i < seqLength; i++) {
      const time = i / 4;
      if (matrix[0][i]) {
        renderedNotes.push({
          note: note1,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      } 
      if (matrix[1][i]) {
        renderedNotes.push({
          note: note2,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      }
      if (matrix[2][i]) {
        renderedNotes.push({
          note: note3,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      }
      if (matrix[3][i]) {
        renderedNotes.push({
          note: note4,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      }
      if (matrix[4][i]) {
        renderedNotes.push({
          note: note5,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      }
      if (matrix[5][i]) {
        renderedNotes.push({
          note: note6,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      }
      if (matrix[6][i]) {
        renderedNotes.push({
          note: note7,
          time: `0:${time}`,
          velocity: velocity,
          index: i
        });
      }
     

      else if (!matrix[1][i]) {
        renderedNotes.push({
          note: note1,
          time: `0:${time}`,
          velocity: 0,
          index: i
        });
      }
    }

    // console.log(scale)
    // console.log(noteSet)
    // console.log(renderedNotes);
    // console.log(matrix)

    // create new Part, start Part, push Part to container
    const part = new Tone.Part((time, value) => {
      triggerVisualize(value.index);
      synth.triggerAttackRelease(value.note, "16n", time, value.velocity);
    }, renderedNotes).start(0);
    partContainer.push(part);

    setRenderedNotes(renderedNotes)
    setPartContainer(partContainer);
    
  };

  const triggerVisualize = index => {
    // generate array of 0's
    const length = sequenceLength;
    const isActive = [
      _.fill(Array(length), 0),
      _.fill(Array(length), 0), 
      _.fill(Array(length), 0),
      _.fill(Array(length), 0),
      _.fill(Array(length), 0),
      _.fill(Array(length), 0),
      _.fill(Array(length), 0)];

    // set particular index as active
    isActive[0][index] = 1;
    isActive[1][index] = 1;
    isActive[2][index] = 1;
    isActive[3][index] = 1;
    isActive[4][index] = 1;
    isActive[5][index] = 1;
    isActive[6][index] = 1;
    setIsActive(isActive)
  };

  const onKeyFilter = (inputKey) => {
   setKey(inputKey)
   noteSet = Scale.get(scale).notes
   generateMetronome()
  };
 

  const onModeFilter = (inputMode)=> {
    setMode(inputMode)
    noteSet = Scale.get(scale).notes
    generateMetronome()
  }

  function onOctFilter(inputOct){
    setOctave(inputOct)
    noteSet = Scale.get(scale).notes
    generateMetronome()
  }

  function onSoundChange(inputSound){
    setSound(inputSound)
    generateMetronome()
  }

  function onVolumeChange(inputVolume){
      setVolume(inputVolume)
      generateMetronome()
  }
 
  function delayToggle(){
    if (delay === true){
        setDelay(false)
        pingPong.wet.value = 0
        generateMetronome()
    }
    else{
      setDelay(true)
      pingPong.wet.value = .5
      generateMetronome() 
  }
  }

  function distortionToggle(){
    if (distortion === true){
      setDistortion(false)
      dist.wet.value= 0
      generateMetronome() 
    }
    else{
      setDistortion(true)
      dist.wet.value= .8
      generateMetronome() 
    }
  }

  function verbToggle(){
    if (verb === true){
      setVerb(false)
      reverb.wet.value = 0
      generateMetronome() 
    } else{
      setVerb(true)
      reverb.wet.value = .9
      generateMetronome() 
    }
  }


  // console.log(Scale.names())
 
    return (
      <div className="App">
        <header className="App-header">
          <Title landscape={landscape} />
          <Buttons
            isPlaying={isPlaying}
            onTogglePlay={onTogglePlay}
            sequenceLength={sequenceLength}
            onLengthChange={onLengthChange}
            tempo={tempo}
            onTempoChange={onTempoChange}
            onReset={onReset}
            onKeyFilter={onKeyFilter}
            onModeFilter={onModeFilter}
            onOctFilter={onOctFilter}
            octave={octave}
            onSoundChange={onSoundChange}
            volume={volume}
            onVolumeChange={onVolumeChange}
            delayToggle={delayToggle}
            distortionToggle={distortionToggle}
            verbToggle={verbToggle}
          />
          <StepSequence
            checked={checked}
            onToggle={onToggleBox}
            sequenceLength={sequenceLength}
            // onPitchSelect={onPitchSelect}
            notes={noteSet}
            isActive={isActive}
          />
        </header>
      </div>
    );
  
}

export default App;