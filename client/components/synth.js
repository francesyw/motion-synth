var shifter = new Tone.PitchShift({
  pitch: 0,
  windowSize: 0.1
})

var phaser = new Tone.Phaser({
  frequency: 1,
  octaves: 5,
  baseFrequency: 200
});

var vol = new Tone.Volume(+3);

var fmod = function (fx1, fx2) {
  return new Tone.PolySynth(6, Tone.SimpleAM, {
    oscillator: {
      partials: [0, 2, 3, 4],
    }
  }).chain(fx1, fx2, vol, Tone.Master);
}

var sequencer = function(nx, synth) {
  let notes = ['A#4', 'F#4', 'D#4', 'A#3', 'F#3', 'D#3'];
  return new Tone.Sequence(function(time, col){
      let column = [];
      nx.matrix.pattern.forEach(row => column.push(row[col]));
      for (let i = 0; i < nx.rows; i++){
        if (column[i]){
          synth.triggerAttackRelease(notes[i], '16n');
        }
      }
      nx.next();
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n');
}

/*
multiple buttons - different tracks ( types of osc )
slider - bpm
*/
export { fmod, sequencer, phaser, shifter};
