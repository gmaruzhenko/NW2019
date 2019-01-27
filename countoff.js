/*
sequence of commands to count off
*/

Tone.Transport.timeSignature = 6;
Tone.Transport.bpm.value = 90;
var synth = new Tone.MembraneSynth().toMaster()

var loop = new Tone.Loop(function(time){
	synth.triggerAttackRelease("C1", "16n", time)
}, "4n")

loop.start(0).stop('1m')