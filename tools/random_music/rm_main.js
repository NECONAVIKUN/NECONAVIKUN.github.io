// ボタンと入力欄の取得
const btnGen = document.getElementById('btn_gen');
const btnPlay = document.getElementById('btn_play');
const btnExport = document.getElementById('btn_export');
const inputCount = document.getElementById('note_count');
const statusText = document.getElementById('status_text');

// 利用する音階の周波数リスト（ドからシまでの12音）
const musicalNotes = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88];
// 楽譜の音符の長さ（16分、8分、4分、2分）
const noteLengths = [0.125, 0.25, 0.5, 1.0];

// 生成された「曲のデータ（配列）」を保存する変数
let generatedMusic = [];
let totalDuration = 0; // 曲の全体の長さ（秒）
let currentAudioCtx = null; // 再生中のオーディオを管理

// ==========================================
// ① 楽譜データをランダムに生成する
// ==========================================
btnGen.addEventListener('click', () => {
    generatedMusic = [];
    totalDuration = 0;
    const count = Number(inputCount.value) || 20;

    for (let i = 0; i < count; i++) {
        // ランダムに音程と長さを選ぶ
        const freq = musicalNotes[Math.floor(Math.random() * musicalNotes.length)];
        const len = noteLengths[Math.floor(Math.random() * noteLengths.length)];
        
        generatedMusic.push({ frequency: freq, duration: len });
        totalDuration += len; // 全体の長さを足していく
    }

    btnPlay.disabled = false;
    btnExport.disabled = false;
});

// ==========================================
// 共通：音声を組み立てる関数（リアルタイム用と書き出し用で使い回す）
// ==========================================
function setupAudioGraph(ctx) {
    let time = ctx.currentTime;
    
    generatedMusic.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'square'; // ファミコン風ピコピコ音
        osc.frequency.value = note.frequency;
        
        // 音量の調整
        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + note.duration - 0.02);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(time);
        osc.stop(time + note.duration);
        
        time += note.duration;
    });
}

// ==========================================
// ② 生成された楽譜をスピーカーで再生する
// ==========================================
btnPlay.addEventListener('click', () => {
    // すでに再生中の音があれば止める
    if (currentAudioCtx) {
        currentAudioCtx.close();
    }
    
    currentAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    setupAudioGraph(currentAudioCtx);
    statusText.innerText = "♪ 再生中...";
});

// ==========================================
// ③ 裏側で高速録音（レンダリング）してWAV化して保存
// ==========================================
btnExport.addEventListener('click', async () => {
    statusText.innerText = "WAVファイルを作成中...";
    btnExport.disabled = true;

    // スピーカーから音を出さずに、一瞬で裏で曲を計算する専用のContext（44100Hzのモノラル）
    const offlineCtx = new OfflineAudioContext(1, 44100 * totalDuration, 44100);
    
    // 裏側のContextに音の命令をセット
    setupAudioGraph(offlineCtx);
    
    // 計算開始（一瞬で終わります）
    const renderedBuffer = await offlineCtx.startRendering();
    
    // 計算された生データを取得
    const channelData = renderedBuffer.getChannelData(0);
    
    // 生データをWAVファイルのバイナリデータ（RIFF形式）に変換する
    const wavBuffer = createWavFile(channelData, 44100);
    
    // ブラウザにファイルをダウンロードさせる処理
    const blob = new Blob([wavBuffer], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chaos_music.wav'; // 保存時のファイル名
    a.click();
    
    URL.revokeObjectURL(url);
    statusText.innerText = "ダウンロード完了！";
    btnExport.disabled = false;
});

// ==========================================
// 魔法の関数：PCMの音声をWAV形式のバイナリにする（仕様通りに組み立て）
// ==========================================
function createWavFile(samples, sampleRate) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    /* RIFF identifier */
    view.setUint32(0, 0x52494646, false); // "RIFF"
    /* file length */
    view.setUint32(4, 36 + samples.length * 2, true);
    /* RIFF type */
    view.setUint32(8, 0x57415645, false); // "WAVE"
    /* format chunk identifier */
    view.setUint32(12, 0x666d7420, false); // "fmt "
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true); // 1 = PCM
    /* channel count */
    view.setUint16(22, 1, true); // 1 = モノラル
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * 2, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true); // 16bit
    /* data chunk identifier */
    view.setUint32(36, 0x64617462, false); // "data"
    /* data chunk length */
    view.setUint32(40, samples.length * 2, true);

    // 音声データを16bit整数に変換して書き込み
    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, samples[i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return buffer;
}
