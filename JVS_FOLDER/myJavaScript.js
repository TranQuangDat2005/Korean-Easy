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

let generatedLetter = "";

function random_alp() {
    let choSeong = [
        'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ',
        'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ',
        'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];

    let jungSeong = [
        'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ',
        'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ',
        'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅘ',
        'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ',
        'ㅢ'
    ];

    let randomChoSeong = choSeong[Math.floor(Math.random() * choSeong.length)];
    let randomJungSeong = jungSeong[Math.floor(Math.random() * jungSeong.length)];

    let choice = document.getElementsByClassName("select-type")[0].value;

    if (choice === "choSeong") {
        return randomChoSeong;

    } else if (choice === "jungSeong") {
        return randomJungSeong;
    }
}

function change_word() {
    document.getElementsByClassName("Letter-show")[0].innerHTML = random_alp();
}

function ChangeType(obj) {
    const a = "hidden";
    const b = "display";
    var elements = document.getElementsByClassName("alphabet-table");
    var second_elements = document.getElementsByClassName("Random-letter");
    if (obj === a) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
            second_elements[i].style.display = "block";
        }
        document.getElementsByClassName("Letter-show")[0].innerHTML = random_alp();
        generatedLetter = document.getElementsByClassName("Letter-show")[0].innerHTML;
    }
    else if (obj === b) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "block";
            second_elements[i].style.display = "none";
        }
    }
}

function submit() {
    let hashMap = {
        "ㄱ": "k/g",
        "ㅏ": "a",
        "ㄴ": "n",
        "ㅑ": "ya",
        "ㄷ": "t/d",
        "ㅓ": "o",
        "ㄹ": "r/l",
        "ㅕ": "yo",
        "ㅁ": "mo",
        "ㅗ": "ô",
        "ㅂ": "b",
        "ㅛ": "yô",
        "ㅅ": "s/x",
        "ㅜ": "u",
        "ㅇ": "/ng",
        "ㅠ": "yu",
        "ㅈ": "ch",
        "ㅡ": "ư",
        "ㅊ": "ch'",
        "ㅣ": "i",
        "ㅋ": "kh'",
        "ㅐ": "e",
        "ㅌ": "th'",
        "ㅒ": "ye",
        "ㅍ": "ph'",
        "ㅔ": "ê",
        "ㅎ": "hờ'",
        "ㅖ": "yê",
        'ㅘ': "oa",
        'ㅙ': "ue",
        'ㅚ': "oê",
        'ㅝ': "uo",
        'ㅞ': "uê",
        'ㅟ': "ui",
        'ㅢ': "ưi"
    };
    let answer = document.getElementById("answer-random").value.trim();
    let value = hashMap[generatedLetter];
    if (value == answer) {
        alert("Correct! The value for " + generatedLetter + " is: " + value);
        document.getElementsByClassName("Letter-show")[0].innerHTML = random_alp();
        generatedLetter = document.getElementsByClassName("Letter-show")[0].innerHTML;
    } else {
        alert("Incorrect! Try again.");
    }
    document.getElementById("answer-random").value = "";
}
