let Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
let vidas = 6;
let check = false;
let SelectedWord = '';
let AuxiliarWord = '';
let words;
let loserWord = '';

fetch('words.json')
    .then(response => response.json())
    .then(data => {
        words = data;
        addWord();
    })
    .catch(error => console.error('Erro:', error));

function addButtons() {
    let BtnsDiv = document.querySelector('.buttons');
    Letters.forEach(element => {
        let newButton = document.createElement('button');
        newButton.textContent = element;
        newButton.id = element;
        newButton.setAttribute('onclick', `checkLetter('${element}')`);
        BtnsDiv.append(newButton);        
    });
}

function addWord() {
    let randNumber = Math.floor(Math.random() * words.length);    
    document.getElementById('type').textContent = words[randNumber].type;

    let palavra = words[randNumber].word.toUpperCase();
    loserWord = words[randNumber].word.toUpperCase(); 

    SelectedWord = palavra.split('');
    AuxiliarWord = palavra.split('');

    for (let i = 0; i < AuxiliarWord.length; i++) {
        AuxiliarWord[i] = '*';
    }

    document.getElementById('word').innerHTML = '';
    AuxiliarWord.forEach(element => {
        document.getElementById('word').innerHTML += '* ';
    });
}

function changeButton(Letter) {
    let btn = document.getElementById(Letter);
    btn.onclick = '';
    btn.style.backgroundColor = '#6c5ce7';
    btn.style.color = '#fff';
    btn.style.cursor = 'no-drop';
}

function changeWord() {
    document.getElementById('word').innerHTML = '';
    AuxiliarWord.forEach(element => {
        document.getElementById('word').innerHTML += `${element} `;
    });
}

function checkLetter(Letter) {
    changeButton(Letter)
    check = true;

    for (let i = 0; i < SelectedWord.length; i++) {
        if (Letter == SelectedWord[i]) {
            SelectedWord[i] = '*';
            AuxiliarWord[i] = Letter;
            check = false;
        }
    }

    if (check == true) {
        vidas = vidas - 1;
        document.getElementById('hangman').src = `assets/icons/img-${vidas}.png`;
        document.getElementById('vidas').textContent = vidas;
    }

    changeWord();
    checkVitory();
    check = false;
}

function checkVitory() {
    if (vidas == 0) {
        document.getElementById('loser').style.display = "grid";
        document.getElementById('loser-word').textContent = loserWord;
    }

    if (AuxiliarWord.every(letra => letra !== '*')) {
        document.getElementById('winner').style.display = "grid";
    }
}

function restart() {
    vidas = 6;
    check = false;
    SelectedWord = '';
    AuxiliarWord = '';

    document.getElementById('hangman').src = `assets/icons/img-6.png`;
    document.getElementById('vidas').textContent = vidas;
    document.getElementById('winner').style.display = "none";
    document.getElementById('loser').style.display = "none";

    document.querySelector('.buttons').innerHTML = '';
    addButtons();
    addWord();
}

addButtons();