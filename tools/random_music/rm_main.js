"use strict";
var btnGen = document.getElementById('btn_gen');
var btnPlay = document.getElementById('btn_play');
var btnExport = document.getElementById('btn_export');
var inputCount = document.getElementById('note_count');
var statusText = document.getElementById('status_text');
var musicalNotes = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88];
var noteLengths = [0.125, 0.25, 0.5, 1.0];
var generatedMusic = [];
var totalDuration = 0;
var currentAudioCtx = null;
btnGen.addEventListener("click", function() {
  generatedMusic = [];
  totalDuration = 0;
  var count = Number(inputCount.value) || 20;
  for (var i = 0; i < count; i++) {
  var freq = musicalNotes[Math.floor(Math.random() * musicalNotes.length)];
  var len = noteLengths[Math.floor(Math.random() * noteLengths.length)];
    generatedMusic.push({ frequency: freq, duration: len });
    totalDuration += len;
  }
  btnPlay.disabled = false;
  btnExport.disabled = false;
});
function setupAudioGraph(ctx) {
  var time = ctx.currentTime;
  generatedMusic.forEach(note function() {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = note.frequency;
    gain.gain.setValueAtTime(0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + note.duration - 0.02);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + note.duration);
    time += note.duration;
  });
}
btnPlay.addEventListener("click", function() {
  if (currentAudioCtx) {
    currentAudioCtx.close();
  }
  currentAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  setupAudioGraph(currentAudioCtx);
});
btnExport.addEventListener("click", async function() {
  btnExport.disabled = true;
  var offlineCtx = new OfflineAudioContext(1, 44100 * totalDuration, 44100);
  setupAudioGraph(offlineCtx);
  var renderedBuffer await offlineCtx.startRendering();
  var channelData = renderedBuffer.getChannelData(0);
  var wavBuffer = createWavFile(channelData, 44100);
  var blob = new Blob([wavBuffer], { type: "audio/wav" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = "chaos_music.wav";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  btnExport.disabled = false;
});
function createWavFile(samples, sampleRate) {
  var buffer = new ArrayBuffer(44 + samples.length * 2);
  var view = new DataView(buffer);
  view.setUint32(0, 0x52494646, false);
  view.setUint32(4, 36 + samples.length * 2, true);
  view.setUint32(8, 0x57415645, false);
  view.setUint32(12, 0x666d7420, false);
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  view.setUint32(36, 0x64617462, false);
  view.setUint32(40, samples.length * 2, true);
  var offset = 44;
  for (var i = 0; i < samples.length; i++, offset += 2) {
    var s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  return buffer;
}
