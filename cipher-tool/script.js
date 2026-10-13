// ============================================
// Cipher Tool
// ============================================

// Every letter we care about, in order.
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// This is the cipher that is currently loaded.
// It is an object. The key is the normal letter and the value is
// what that letter turns into. For example:
//   currentCipher["A"] = "Q"
//   currentCipher["B"] = "Z"
// It starts out empty because no cipher has been made yet.
let currentCipher = {};

// This keeps track of whether we have a cipher at all.
let hasCipher = false;


// ============================================
// PART 3: Cipher type dropdown
// ============================================

// This runs when the user changes the dropdown.
// It just shows or hides the shift number box.
function cipherTypeChanged() {
  let dropdown = document.getElementById("cipherType");
  let shiftBox = document.getElementById("shiftBox");

  if (dropdown.value == "caesar") {
    shiftBox.style.display = "block";
  } else {
    shiftBox.style.display = "none";
  }
}


// ============================================
// PART 1: Generate a new cipher
// ============================================

// This runs when the "Generate New Cipher" button is clicked.
// It looks at the dropdown and decides which kind of cipher to make.
function generateCipher() {
  let dropdown = document.getElementById("cipherType");

  if (dropdown.value == "caesar") {
    makeCaesarCipher();
  } else {
    makeSubstitutionCipher();
  }

  // clear any old error message
  document.getElementById("errorMessage").textContent = "";

  // show the new mapping on the page
  showMapping();
}

// Makes a Caesar cipher. Every letter moves forward by the shift amount.
// Example with shift 3:  A -> D, B -> E, ... X -> A, Y -> B, Z -> C
function makeCaesarCipher() {
  let shiftInput = document.getElementById("shiftAmount");
  let shift = Number(shiftInput.value);

  // if the user typed something weird, just use 3
  if (isNaN(shift)) {
    shift = 3;
  }

  // keep the shift between 0 and 25
  if (shift < 0) {
    shift = 0;
  }
  if (shift > 25) {
    shift = 25;
  }

  // start with a brand new empty object
  currentCipher = {};

  for (let i = 0; i < 26; i++) {
    let normalLetter = alphabet.charAt(i);

    // move forward by the shift. The % 26 makes it wrap around
    // so that going past Z comes back to A.
    let newPosition = (i + shift) % 26;
    let newLetter = alphabet.charAt(newPosition);

    currentCipher[normalLetter] = newLetter;
  }

  hasCipher = true;
}

// Makes a random substitution cipher. Every letter gets a random
// different letter, and no two letters get the same one.
function makeSubstitutionCipher() {
  // these are the letters we have not used yet
  let lettersLeft = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // this will be the scrambled alphabet we build up
  let scrambled = "";

  // keep picking random letters until none are left
  while (lettersLeft.length > 0) {
    // pick a random spot in lettersLeft
    let randomIndex = Math.floor(Math.random() * lettersLeft.length);
    let pickedLetter = lettersLeft.charAt(randomIndex);

    // add it to the scrambled alphabet
    scrambled = scrambled + pickedLetter;

    // remove it from lettersLeft so we can't pick it again.
    // We do that by keeping everything before it and everything after it.
    let beforePart = lettersLeft.substring(0, randomIndex);
    let afterPart = lettersLeft.substring(randomIndex + 1);
    lettersLeft = beforePart + afterPart;
  }

  // now turn the scrambled string into the cipher object
  currentCipher = {};

  for (let i = 0; i < 26; i++) {
    let normalLetter = alphabet.charAt(i);
    let newLetter = scrambled.charAt(i);
    currentCipher[normalLetter] = newLetter;
  }

  hasCipher = true;
}


// ============================================
// PART 2: Load a cipher the user typed in
// ============================================

// This runs when the "Load Cipher" button is clicked.
function loadCipher() {
  let errorBox = document.getElementById("errorMessage");
  let typed = document.getElementById("cipherInput").value;

  // make it all uppercase so "qwerty" works the same as "QWERTY"
  typed = typed.toUpperCase();

  // CHECK 1: must be exactly 26 characters
  if (typed.length != 26) {
    errorBox.textContent = "Error: you typed " + typed.length + " characters, but it needs to be exactly 26.";
    return;
  }

  // CHECK 2: every character must be a letter A to Z
  for (let i = 0; i < 26; i++) {
    let letter = typed.charAt(i);

    if (alphabet.indexOf(letter) == -1) {
      errorBox.textContent = "Error: \"" + letter + "\" is not a letter. Only use A to Z.";
      return;
    }
  }

  // CHECK 3: no letter can show up twice
  for (let i = 0; i < 26; i++) {
    let letter = typed.charAt(i);

    // indexOf finds the FIRST place the letter shows up.
    // If that is not the spot we are at, it already showed up earlier.
    if (typed.indexOf(letter) != i) {
      errorBox.textContent = "Error: the letter " + letter + " shows up more than once.";
      return;
    }
  }

  // everything passed, so build the cipher object
  currentCipher = {};

  for (let i = 0; i < 26; i++) {
    let normalLetter = alphabet.charAt(i);
    let newLetter = typed.charAt(i);
    currentCipher[normalLetter] = newLetter;
  }

  hasCipher = true;

  // a loaded cipher is a substitution cipher, so switch the dropdown
  document.getElementById("cipherType").value = "substitution";
  cipherTypeChanged();

  // clear the error and show the mapping
  errorBox.textContent = "";
  showMapping();
}


// ============================================
// PART 4: Show the current mapping as tiles
// ============================================

// Builds 26 little tiles like "A ⇒ Q" and puts them on the page.
function showMapping() {
  let display = document.getElementById("mappingDisplay");

  // build up one big string of HTML
  let html = "";

  for (let i = 0; i < 26; i++) {
    let normalLetter = alphabet.charAt(i);
    let newLetter = currentCipher[normalLetter];

    html = html + "<div class='tile'>" + normalLetter + " ⇒ " + newLetter + "</div>";
  }

  // put it on the page (this replaces whatever was there before)
  display.innerHTML = html;
}


// ============================================
// PART 5: Encrypt and decrypt
// ============================================

// This runs when the "Encrypt" button is clicked.
function encryptText() {
  let errorBox = document.getElementById("errorMessage");

  if (hasCipher == false) {
    errorBox.textContent = "Error: generate or load a cipher first.";
    return;
  }

  let input = document.getElementById("inputText").value;
  let output = "";

  // go through the message one character at a time
  for (let i = 0; i < input.length; i++) {
    let character = input.charAt(i);
    let upperCharacter = character.toUpperCase();

    if (alphabet.indexOf(upperCharacter) != -1) {
      // it is a letter, so swap it using the cipher
      output = output + currentCipher[upperCharacter];
    } else {
      // it is a space, number, or punctuation, so leave it alone
      output = output + character;
    }
  }

  document.getElementById("outputText").value = output;
}

// This runs when the "Decrypt" button is clicked.
// It does the opposite of encrypt: it finds which normal letter
// turned into the letter we are looking at.
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
      // look through every normal letter and find the one that
      // turns into this character
      let originalLetter = "";

      for (let j = 0; j < 26; j++) {
        let normalLetter = alphabet.charAt(j);

        if (currentCipher[normalLetter] == upperCharacter) {
          originalLetter = normalLetter;
        }
      }

      output = output + originalLetter;
    } else {
      // not a letter, leave it alone
      output = output + character;
    }
  }

  document.getElementById("outputText").value = output;
}
