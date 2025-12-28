function Finding() {
    let word = document.getElementById("search-box").value.trim();
    if (word) {
        const targetUrl = `https://papago.naver.com/?sk=auto&tk=ko&st=${encodeURIComponent(word)}`;
        window.open(targetUrl, '_blank');
    } else {
        alert('Please enter the word you want to translate!');
    }
}

function getFile() {
    const targetUrl = "https://drive.google.com/drive/folders/19yumgBkAA_yNFWnhEoH2J8ot-2CP4UBS?usp=sharing";
    window.open(targetUrl, '_blank');
}


// ---------------------------------------------------------------------------------------------------------------------------------------------------

function renderAudioItem(item) {
    const container = document.createElement('div');
    container.className = 'audio-item';

    const title = document.createElement('h3');
    title.textContent = item.title || item.file;
    container.appendChild(title);

    // Use new Audio() as requested
    const audio = new Audio(encodeURI(item.file));
    audio.controls = true;
    audio.preload = 'metadata';

    // Error handling for individual audio files
    audio.onerror = (e) => {
        console.error('Error loading audio:', item.file, e);
        const err = document.createElement('p');
        err.style.color = 'red';
        err.textContent = 'Error loading file. Check console for details.';
        container.appendChild(err);
    };

    container.appendChild(audio);

    // filename display
    const filename = document.createElement('div');
    filename.className = 'audio-filename';
    try {
        filename.textContent = (item.file || '').split('/').pop();
    } catch (e) { filename.textContent = item.file; }
    container.appendChild(filename);

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'audio-controls';

    const playBtn = document.createElement('button');
    playBtn.textContent = 'Play';
    playBtn.onclick = () => { audio.play(); };
    controlsDiv.appendChild(playBtn);

    const pauseBtn = document.createElement('button');
    pauseBtn.textContent = 'Pause';
    pauseBtn.onclick = () => { audio.pause(); };
    controlsDiv.appendChild(pauseBtn);

    const rewindBtn = document.createElement('button');
    rewindBtn.textContent = '<< 10s';
    rewindBtn.onclick = () => { audio.currentTime = Math.max(0, audio.currentTime - 10); };
    controlsDiv.appendChild(rewindBtn);

    const forwardBtn = document.createElement('button');
    forwardBtn.textContent = '10s >>';
    forwardBtn.onclick = () => { audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + 10); };
    controlsDiv.appendChild(forwardBtn);

    const stopBtn = document.createElement('button');
    stopBtn.textContent = 'Stop';
    stopBtn.onclick = () => { audio.pause(); audio.currentTime = 0; };
    controlsDiv.appendChild(stopBtn);

    container.appendChild(controlsDiv);

    if (item.transcript) {
        const btn = document.createElement('button');
        btn.textContent = 'Hiện/Ẩn transcript';
        btn.onclick = () => { transcript.style.display = transcript.style.display === 'none' ? 'block' : 'none'; };
        container.appendChild(btn);

        const transcript = document.createElement('div');
        transcript.className = 'transcript';
        transcript.style.display = 'none';
        transcript.innerText = item.transcript;
        container.appendChild(transcript);
    }

    return container;
}

const audioList = [
    {
        "file": "Listening/[NGHE & DỊCH PHỤ ĐỀ] Bài 10： 외모 Ngoại hình ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234.mp3",
        "title": "[NGHE & DỊCH PHỤ ĐỀ] Bài 10： 외모 Ngoại hình ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234"
    },
    {
        "file": "Listening/[NGHE & DỊCH PHỤ ĐỀ] Bài 11： 여행 Du lịch ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234.mp3",
        "title": "[NGHE & DỊCH PHỤ ĐỀ] Bài 11： 여행 Du lịch ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234"
    },
    {
        "file": "Listening/[NGHE & DỊCH PHỤ ĐỀ] Bài 12： 공공장소 Nơi công cộng ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234-1.mp3",
        "title": "[NGHE & DỊCH PHỤ ĐỀ] Bài 12： 공공장소 Nơi công cộng ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234-1"
    },
    {
        "file": "Listening/[NGHE & DỊCH PHỤ ĐỀ] Bài 13： 도시 Đô thị ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234.mp3",
        "title": "[NGHE & DỊCH PHỤ ĐỀ] Bài 13： 도시 Đô thị ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234"
    },
    {
        "file": "Listening/[NGHE & DỊCH PHỤ ĐỀ] Bài 14： 계획 Kế hoạch ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234-1.mp3",
        "title": "[NGHE & DỊCH PHỤ ĐỀ] Bài 14： 계획 Kế hoạch ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234-1"
    },
    {
        "file": "Listening/[NGHE & DỊCH PHỤ ĐỀ] Bài 15： 한국 생활 Cuộc sống tại Hàn Quốc ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234.mp3",
        "title": "[NGHE & DỊCH PHỤ ĐỀ] Bài 15： 한국 생활 Cuộc sống tại Hàn Quốc ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234"
    },
    {
        "file": "Listening/[NGHE & DỊCH PHỤ ĐỀ] Bài 9： 휴일 Ngày nghỉ ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234-1.mp3",
        "title": "[NGHE & DỊCH PHỤ ĐỀ] Bài 9： 휴일 Ngày nghỉ ｜ TIẾNG HÀN TỔNG HỢP SƠ CẤP 2.f234-1"
    }
];

function loadAudioList() {
    const select = document.getElementById('audio-select');
    const noFiles = document.getElementById('no-files');

    // Sort files by name
    audioList.sort((a, b) => (a.title || a.file).localeCompare(b.title || b.file));

    if (audioList.length === 0) {
        noFiles.style.display = 'block';
        select.style.display = 'none';
        return;
    }

    noFiles.style.display = 'none';

    // Populate dropdown
    audioList.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = index; // Use index to reference the item
        option.textContent = item.title || item.file;
        select.appendChild(option);
    });
}

function onAudioSelect() {
    const select = document.getElementById('audio-select');
    const playerContainer = document.getElementById('audio-player-container');
    const selectedIndex = select.value;

    playerContainer.innerHTML = ''; // Clear previous player

    if (selectedIndex !== "" && audioList[selectedIndex]) {
        const item = audioList[selectedIndex];
        const el = renderAudioItem(item);
        playerContainer.appendChild(el);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadAudioList();
});
