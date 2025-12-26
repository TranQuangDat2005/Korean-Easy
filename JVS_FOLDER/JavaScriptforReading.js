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


