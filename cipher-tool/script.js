
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let currentCipher = {};

let hasCipher = false;

function cipherTypeChanged() {
  let dropdown = document.getElementById("cipherType");
  let shiftBox = document.getElementById("shiftBox");

  if (dropdown.value == "caesar") {
    shiftBox.style.display = "block";
  } else {
    shiftBox.style.display = "none";
  }
}

function generateCipher() {
  let dropdown = document.getElementById("cipherType");

  if (dropdown.value == "caesar") {
    makeCaesarCipher();
  } else {
    makeSubstitutionCipher();
  }

  document.getElementById("errorMessage").textContent = "";

  showMapping();
}

function makeCaesarCipher() {
  let shiftInput = document.getElementById("shiftAmount");
  let shift = Number(shiftInput.value);

  if (isNaN(shift)) {
    shift = 3;
  }

  if (shift < 0) {
    shift = 0;
  }
  if (shift > 25) {
    shift = 25;
  }

  currentCipher = {};

  for (let i = 0; i < 26; i++) {
    let normalLetter = alphabet.charAt(i);

    let newPosition = (i + shift) % 26;
    let newLetter = alphabet.charAt(newPosition);

    currentCipher[normalLetter] = newLetter;
  }

  hasCipher = true;
}

function makeSubstitutionCipher() {
  let lettersLeft = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let scrambled = "";

  while (lettersLeft.length > 0) {
    let randomIndex = Math.floor(Math.random() * lettersLeft.length);
    let pickedLetter = lettersLeft.charAt(randomIndex);

    scrambled = scrambled + pickedLetter;

    let beforePart = lettersLeft.substring(0, randomIndex);
    let afterPart = lettersLeft.substring(randomIndex + 1);
    lettersLeft = beforePart + afterPart;
  }

  currentCipher = {};

  for (let i = 0; i < 26; i++) {
    let normalLetter = alphabet.charAt(i);
    let newLetter = scrambled.charAt(i);
    currentCipher[normalLetter] = newLetter;
  }

  hasCipher = true;
}

function loadCipher() {
  let errorBox = document.getElementById("errorMessage");
  let typed = document.getElementById("cipherInput").value;

  typed = typed.toUpperCase();

  if (typed.length != 26) {
    errorBox.textContent = "Error: you typed " + typed.length + " characters, but it needs to be exactly 26.";
    return;
  }

  for (let i = 0; i < 26; i++) {
    let letter = typed.charAt(i);

    if (alphabet.indexOf(letter) == -1) {
      errorBox.textContent = "Error: \"" + letter + "\" is not a letter. Only use A to Z.";
      return;
    }
  }

  for (let i = 0; i < 26; i++) {
    let letter = typed.charAt(i);

    if (typed.indexOf(letter) != i) {
      errorBox.textContent = "Error: the letter " + letter + " shows up more than once.";
      return;
    }
  }

  currentCipher = {};

  for (let i = 0; i < 26; i++) {
    let normalLetter = alphabet.charAt(i);
    let newLetter = typed.charAt(i);
    currentCipher[normalLetter] = newLetter;
  }

  hasCipher = true;

  document.getElementById("cipherType").value = "substitution";
  cipherTypeChanged();

  errorBox.textContent = "";
  showMapping();
}

function showMapping() {
  let display = document.getElementById("mappingDisplay");

  let html = "";

  for (let i = 0; i < 26; i++) {
    let normalLetter = alphabet.charAt(i);
    let newLetter = currentCipher[normalLetter];

    html = html + "<div class='tile'>" + normalLetter + " ⇒ " + newLetter + "</div>";
  }

  display.innerHTML = html;
}

function encryptText() {
  let errorBox = document.getElementById("errorMessage");

  if (hasCipher == false) {
    errorBox.textContent = "Error: generate or load a cipher first.";
    return;
  }

  let input = document.getElementById("inputText").value;
  let output = "";

  for (let i = 0; i < input.length; i++) {
    let character = input.charAt(i);
    let upperCharacter = character.toUpperCase();

    if (alphabet.indexOf(upperCharacter) != -1) {
      output = output + currentCipher[upperCharacter];
    } else {
      output = output + character;
    }
  }

  document.getElementById("outputText").value = output;
}

function decryptText() {
  let errorBox = document.getElementById("errorMessage");

  if (hasCipher == false) {
    errorBox.textContent = "Error: generate or load a cipher first.";
    return;
  }

  let input = document.getElementById("inputText").value;
  let output = "";

  for (let i = 0; i < input.length; i++) {
    let character = input.charAt(i);
    let upperCharacter = character.toUpperCase();

    if (alphabet.indexOf(upperCharacter) != -1) {
      let originalLetter = "";

      for (let j = 0; j < 26; j++) {
        let normalLetter = alphabet.charAt(j);

        if (currentCipher[normalLetter] == upperCharacter) {
          originalLetter = normalLetter;
        }
      }

      output = output + originalLetter;
    } else {
      output = output + character;
    }
  }

  document.getElementById("outputText").value = output;
}
