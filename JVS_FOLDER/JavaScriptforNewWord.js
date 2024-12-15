const hashmap = new Map();
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
    let option1 = document.getElementsByClassName("Learning");
    let option2 = document.getElementsByClassName("Writing");
    let option3 = document.getElementsByClassName("Multiple-choice");
    let option4 = document.getElementsByClassName("Mix-test");

    if (choice == "Learning") {
        ReadFile();
        var array = learningListWord();
        if (array.length === 0) {
            alert("The word list is empty!");
            return;
        }
        document.getElementById("display_word").innerHTML = array[0];
        learningWord = document.getElementById("display_word").innerHTML;

        for (var i = 0; i < option1.length; i++) {
            option1[i].style.display = "block";
            document.getElementsByClassName("speaker")[i].style.display = "flex";
            document.getElementById("display_word").style.display = "flex";
            option2[i].style.display = "none";
            option3[i].style.display = "none";
            option4[i].style.display = "none";
        }
    } else if (choice == "Writing") {
        ReadFile();
        display();
        for (var i = 0; i < option2.length; i++) {
            option2[i].style.display = "block";
            document.getElementById("display_word").style.display = "flex";
            option1[i].style.display = "none";
            option3[i].style.display = "none";
            option4[i].style.display = "none";
        }
    } else if (choice == "Multiple-choice") {
        ReadFile();
        display();
        create_choice();
        document.querySelectorAll(".Quiz").forEach((quizElement) => {
            quizElement.style.marginBottom = "10px";
        });
        for (var i = 0; i < option3.length; i++) {
            option3[i].style.display = "flex";
            document.getElementById("display_word").style.display = "flex";
            document.getElementsByClassName("speaker")[i].style.display = "none";
            option1[i].style.display = "none";
            option2[i].style.display = "none";
            option4[i].style.display = "none";
        }
    } else if (choice == "Mix-test") {
        ReadFile();
        display();
        let modes = ["Writing", "Multiple-choice"];
        let randomMode = modes[Math.floor(Math.random() * modes.length)];
        if (randomMode === "Writing") {
            for (var i = 0; i < option2.length; i++) {
                option2[i].style.display = "block";
                document.getElementById("display_word").style.display = "flex";
                option1[i].style.display = "none";
                option3[i].style.display = "none";
                option4[i].style.display = "none";
            }
        } else if (randomMode === "Multiple-choice") {
            create_choice();
            document.querySelectorAll(".Quiz").forEach((quizElement) => {
                quizElement.style.marginBottom = "10px";
            });
            for (var i = 0; i < option3.length; i++) {
                option3[i].style.display = "flex";
                document.getElementById("display_word").style.display = "flex";
                document.getElementsByClassName("speaker")[i].style.display = "none";
                option1[i].style.display = "none";
                option2[i].style.display = "none";
                option4[i].style.display = "none";
            }
        }
    } else if (choice == "Start") {
        ReadFile();
        for (var i = 0; i < option4.length; i++) {
            document.getElementById("display_word").style.display = "none";
            option1[i].style.display = "none";
            option2[i].style.display = "none";
            option3[i].style.display = "none";
            option4[i].style.display = "none";
        }
    }
}


function ReadFile() {
    const file = document.getElementById("file-upload").files[0];
    if (!file) {
        alert("Please upload a file.");
        return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
        const content = event.target.result;
        const lines = content.split('\n');
        lines.forEach(line => {
            const parts = line.split(',');
            const word = parts[0].trim();
            const meaning = parts[1].trim();
            hashmap.set(word, meaning);
        });
    }
    reader.readAsText(file);
}

function display() {
    document.getElementById("display_word").innerHTML = randomWord();
    generatedWord = document.getElementById("display_word").innerHTML;
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
        if (adding_value != array[0]) {
            array[index] = adding_value;
        }
        index++;
    }
    return array;
}

function randomChoice(array) {
    var index = Math.floor(Math.random() * (array.length - 1));
    var value = array[index];
    array.splice(index, 1);
    return value;
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
        create_choice()
    }
}

function clickForSpeak() {
    let arr = learningListWord();
    let Choosing_speak_value = Set_Choosing_speak_value();
    let word = arr[count];
    let meaning = hashmap.get(word);
    if (Choosing_speak_value == "Word"&&hashmap.has(word)){
        speakText(word);
    }
    if (Choosing_speak_value == "Meaning"){
        speakText(meaning);
    }
}

function getFile() {
    const targetUrl = "https://drive.google.com/drive/folders/19yumgBkAA_yNFWnhEoH2J8ot-2CP4UBS?usp=sharing";
    window.open(targetUrl, '_blank');
}