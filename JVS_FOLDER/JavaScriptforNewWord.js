const hashmap = new Map();
let frequencyMap = new Map(); // Map mới để lưu thống kê số lần gặp
let generatedWord = "";
let learningWord = "";
let talkingSpeed = 1;
let score = 0;

function Set_Choosing_speak_value() {
    let Choosing_speak_value = document.getElementById("Choosing_speak").value;
    return Choosing_speak_value;
}

function reloadPage() {
    hashmap.clear();
    frequencyMap.clear(); // Reset thống kê khi nạp file mới
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        let speech = new SpeechSynthesisUtterance(text);
        let language = document.getElementById("Choosing_Language").value;
        talkingSpeed = document.getElementById("speedInput").value;
        speech.lang = language;
        speech.volume = 1;
        speech.rate = talkingSpeed;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
    } else {
        alert('Your browser does not support Speech Synthesis.');
    }
}

function Finding() {
    let word = document.getElementById("search-box").value.trim();
    if (word) {
        const targetUrl = `https://papago.naver.com/?sk=auto&tk=ko&st=${encodeURIComponent(word)}`;
        window.open(targetUrl, '_blank');
    } else {
        alert('Please enter the word you want to translate!');
    }
}

function ChooseMode() {
    let choice = document.getElementById("Select-mode").value;
    
    // Lấy các element DOM
    let option1 = document.getElementsByClassName("Learning");
    let option2 = document.getElementsByClassName("Writing");
    let option3 = document.getElementsByClassName("Multiple-choice");
    let option4 = document.getElementsByClassName("Mix-test");
    let optionTable = document.getElementsByClassName("Table-view"); // Element mới
    let displayWord = document.getElementById("display_word");
    let speakers = document.getElementsByClassName("speaker");

    // Reset hiển thị (Ẩn tất cả trước)
    displayWord.style.display = "none";
    for(let el of option1) el.style.display = "none";
    for(let el of option2) el.style.display = "none";
    for(let el of option3) el.style.display = "none";
    for(let el of option4) el.style.display = "none";
    for(let el of optionTable) el.style.display = "none";
    for(let el of speakers) el.style.display = "none";

    ReadFile(); // Đảm bảo dữ liệu đã đọc

    if (choice == "Start") {
        return; 
    }

    if (hashmap.size === 0 && choice !== "Start") {
        // Nếu chưa load xong file hoặc file rỗng thì đợi 1 chút cho FileReader chạy
        setTimeout(() => ChooseMode(), 100); 
        return;
    }

    if (choice == "Table-view") {
        renderTable(); // Vẽ bảng
        for(let el of optionTable) el.style.display = "block";
    }
    else if (choice == "Learning") {
        var array = learningListWord();
        if (array.length === 0) return;
        displayWord.innerHTML = array[0];
        learningWord = displayWord.innerHTML;
        displayWord.style.display = "flex";
        
        for(let el of option1) el.style.display = "block";
        for(let el of speakers) el.style.display = "flex";

    } else if (choice == "Writing") {
        display();
        displayWord.style.display = "flex";
        for(let el of option2) el.style.display = "block";

    } else if (choice == "Multiple-choice") {
        display(); // Hàm display giờ sẽ tăng count
        create_choice();
        document.querySelectorAll(".Quiz").forEach((quizElement) => {
            quizElement.style.marginBottom = "10px";
        });
        displayWord.style.display = "flex";
        for(let el of option3) el.style.display = "flex";

    } else if (choice == "Mix-test") {
        display();
        let modes = ["Writing", "Multiple-choice"];
        let randomMode = modes[Math.floor(Math.random() * modes.length)];
        
        displayWord.style.display = "flex";

        if (randomMode === "Writing") {
            for(let el of option2) el.style.display = "block";
        } else if (randomMode === "Multiple-choice") {
            create_choice();
            document.querySelectorAll(".Quiz").forEach((quizElement) => {
                quizElement.style.marginBottom = "10px";
            });
            for(let el of option3) el.style.display = "flex";
        }
    }
}

function ReadFile() {
    const file = document.getElementById("file-upload").files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        const content = event.target.result;
        const lines = content.split('\n');
        lines.forEach(line => {
            if(line.trim() !== "") {
                const parts = line.split(',');
                // Giả sử format: Tiếng Việt, Tiếng Hàn
                if (parts.length >= 2) {
                    const word = parts[0].trim();   // Cột 1 (Tiếng Việt)
                    const meaning = parts[1].trim(); // Cột 2 (Tiếng Hàn)
                    hashmap.set(word, meaning);
                    
                    // Khởi tạo count = 0 nếu từ mới chưa có trong map thống kê
                    if (!frequencyMap.has(word)) {
                        frequencyMap.set(word, 0);
                    }
                }
            }
        });
    }
    reader.readAsText(file);
}

// Hàm mới: Vẽ bảng
function renderTable() {
    const tableBody = document.getElementById("vocab-table-body");
    tableBody.innerHTML = ""; // Xóa nội dung cũ

    hashmap.forEach((meaning, word) => {
        let count = frequencyMap.get(word) || 0;
        let row = document.createElement("tr");

        // Cột 1: Tiếng Việt (Word)
        let cell1 = document.createElement("td");
        cell1.innerText = word;
        cell1.className = "col-viet";
        cell1.onclick = function() { this.classList.remove("blur-text"); }; // Click để gỡ blur
        
        // Cột 2: Tiếng Hàn (Meaning)
        let cell2 = document.createElement("td");
        cell2.innerText = meaning;
        cell2.className = "col-korea";
        cell2.onclick = function() { this.classList.remove("blur-text"); }; // Click để gỡ blur

        // Cột 3: Thống kê
        let cell3 = document.createElement("td");
        cell3.innerText = count;
        cell3.style.textAlign = "center";

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        tableBody.appendChild(row);
    });
}

// Hàm mới: Xử lý Blur
function toggleBlur(type, isBlurring) {
    const colViet = document.querySelectorAll(".col-viet");
    const colKorea = document.querySelectorAll(".col-korea");

    if (type === 'all') {
        colViet.forEach(cell => isBlurring ? cell.classList.add("blur-text") : cell.classList.remove("blur-text"));
        colKorea.forEach(cell => isBlurring ? cell.classList.add("blur-text") : cell.classList.remove("blur-text"));
    } else if (type === 'col1') {
        colViet.forEach(cell => cell.classList.toggle("blur-text"));
    } else if (type === 'col2') {
        colKorea.forEach(cell => cell.classList.toggle("blur-text"));
    }
}

function display() {
    document.getElementById("display_word").innerHTML = randomWord();
    generatedWord = document.getElementById("display_word").innerHTML;

    // Logic thống kê: Nếu đang ở chế độ Trắc nghiệm hoặc Mix (vào trắc nghiệm), tăng count
    let mode = document.getElementById("Select-mode").value;
    if (mode === "Multiple-choice" || mode === "Mix-test") {
        let currentCount = frequencyMap.get(generatedWord) || 0;
        frequencyMap.set(generatedWord, currentCount + 1);
    }
}

function learningListWord() {
    return Array.from(hashmap.keys());
}

let count = 0;
function traversalnextListWord() {
    var array = learningListWord();
    if (array.length === 0) {
        alert("The word list is empty!");
        return;
    }
    count = (count + 1) % array.length;
    document.getElementById("display_word").innerHTML = array[count];
    learningWord = document.getElementById("display_word").innerHTML;
}

function traversalprevListWord() {
    var array = learningListWord();
    if (array.length === 0) {
        alert("The word list is empty!");
        return;
    }
    count = (count - 1 + array.length) % array.length;
    document.getElementById("display_word").innerHTML = array[count];
    learningWord = document.getElementById("display_word").innerHTML;
}

function Translate() {
    let choice = document.getElementById("Select-mode").value
    let value = hashmap.get(document.getElementById("display_word").innerHTML);
    if (choice == "Learning" && document.getElementById("display_word").innerHTML == learningWord) {
        document.getElementById("display_word").innerHTML = value;
    } else if (choice == "Learning" && document.getElementById("display_word").innerHTML != learningWord) {
        document.getElementById("display_word").innerHTML = learningWord;
    }
}

function randomWord() {
    const keys = Array.from(hashmap.keys());
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    let temp = randomKey;
    return temp;
}

function submit() {
    let answer = document.getElementById("writing-answer_input").value.trim();
    let value = hashmap.get(generatedWord);

    if (value === undefined) {
        alert("Word not found in the dictionary.");
        return;
    }
    if (value === answer) {
        alert("Correct! The value for " + generatedWord + " is: " + value);
        score++;
        document.getElementById("display_word").innerHTML = randomWord();
        generatedWord = document.getElementById("display_word").innerHTML;
    } else {
        alert("Incorrect! The value for " + generatedWord + " is: " + value);
        document.getElementById("display_word").innerHTML = randomWord();
        generatedWord = document.getElementById("display_word").innerHTML;
    }

    document.getElementById("writing-answer_input").value = "";
}

function randomValue() {
    const keys = Array.from(hashmap.keys());
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    let temp = hashmap.get(randomKey);
    return temp;
}

function get_answer_for_multiple_choice() {
    let array = [];
    let index = 1;
    array[0] = hashmap.get(generatedWord);
    while (array.length < 4) {
        var adding_value = randomValue();
        if (!array.includes(adding_value)) {
            array[index] = adding_value;
            index++;
        }
    }
    return array;
}

function randomChoice(array) {
    var index = Math.floor(Math.random() * array.length);
    var value = array[index];
    array.splice(index, 1);
    return value;
}

function create_choice() {
    const file = document.getElementById("file-upload").files[0];
    if (!file) {
        return;
    }
    var array = get_answer_for_multiple_choice();
    if (array.length >= 4) {
        document.getElementById("answer-one").innerHTML = randomChoice(array);
        document.getElementById("answer-one").setAttribute("data-value", document.getElementById("answer-one").innerHTML);
        document.getElementById("answer-two").innerHTML = randomChoice(array);
        document.getElementById("answer-two").setAttribute("data-value", document.getElementById("answer-two").innerHTML);
        document.getElementById("answer-three").innerHTML = randomChoice(array);
        document.getElementById("answer-three").setAttribute("data-value", document.getElementById("answer-three").innerHTML);
        document.getElementById("answer-four").innerHTML = randomChoice(array);
        document.getElementById("answer-four").setAttribute("data-value", document.getElementById("answer-four").innerHTML);
    } else {
        console.error("Mảng không đủ phần tử để tạo các câu trả lời.");
    }
}

function check_answer(selectedButton) {
    const selectedValue = selectedButton.getAttribute("data-value");
    const correctAnswer = hashmap.get(generatedWord);
    let Choosing_speak_value = Set_Choosing_speak_value();
    
    if (selectedValue === correctAnswer) {
        if (Choosing_speak_value == "Word") {
            speakText(generatedWord);
        }
        if (Choosing_speak_value == "Meaning") {
            speakText(correctAnswer);
        }
        alert("Chính xác!");
        score++;
        display();
        create_choice();
    } else {
        alert("Sai rồi. Đáp án đúng là: " + correctAnswer);
        display();
        create_choice();
    }
}

function clickForSpeak() {
    let arr = learningListWord();
    let Choosing_speak_value = Set_Choosing_speak_value();
    let word = arr[count];
    let meaning = hashmap.get(word);
    if (Choosing_speak_value == "Word" && hashmap.has(word)) {
        speakText(word);
    }
    if (Choosing_speak_value == "Meaning") {
        speakText(meaning);
    }
}

function getFile() {
    const targetUrl = "https://drive.google.com/drive/folders/19yumgBkAA_yNFWnhEoH2J8ot-2CP4UBS?usp=sharing";
    window.open(targetUrl, '_blank');
}