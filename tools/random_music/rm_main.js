const button = document.getElementById('chaos_button');
    const inputCount = document.getElementById('note_count');

    // ピアノの真ん中あたりの「すべての音（♯・♭含む12音）」の周波数リスト
    const musicalNotes = [
        261.63, // ド (C4)
        277.18, // ド♯ / レ♭ (C#4)
        293.66, // レ (D4)
        311.13, // レ♯ / ミ♭ (D#4)
        329.63, // ミ (E4)
        349.23, // ファ (F4)
        369.99, // ファ♯ / ソ♭ (F#4)
        392.00, // ソ (G4)
        415.30, // ソ♯ / ラ♭ (G#4)
        440.00, // ラ (A4)
        466.16, // ラ♯ / シ♭ (A#4)
        493.88  // シ (B4)
    ];

    // 楽譜で使われる音符の長さのリスト（秒数換算、テンポ120くらいを想定）
    // 16分音符、8分音符、4分音符、2分音符
    const noteLengths = [0.125, 0.25, 0.5, 1.0];

    function playMusicalChaos() {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let currentTime = audioCtx.currentTime;

        const totalNotes = Number(inputCount.value) || 30;

        for (let i = 0; i < totalNotes; i++) {
            // 1. 【音程の乱数生成】12音のリストからランダムに1つ選ぶ（♯や♭も均等に出る）
            const randomNoteIndex = Math.floor(Math.random() * musicalNotes.length);
            const frequency = musicalNotes[randomNoteIndex];

            // 2. 【音の長さの乱数生成】楽譜の音符リストからランダムに1つ選ぶ
            const randomLengthIndex = Math.floor(Math.random() * noteLengths.length);
            const duration = noteLengths[randomLengthIndex];

            // 3. 【波形】今回は音がはっきり分かるように、ファミコン風の「矩形波」に固定
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'square'; 
            osc.frequency.value = frequency;

            // 音量の変化（音符が切り替わるときにハッキリ聞こえるように調整）
            gain.gain.setValueAtTime(0.15, currentTime); 
            gain.gain.exponentialRampToValueAtTime(0.001, currentTime + duration - 0.02);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(currentTime);
            osc.stop(currentTime + duration);

            // 4. 次の音が鳴るタイミング（音の長さと同じにすることで、音が途切れずに繋がる）
            currentTime += duration;
        }
    }

    button.addEventListener('click', playMusicalChaos);
