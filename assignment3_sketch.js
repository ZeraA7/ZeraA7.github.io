let input, addWordButton, shuffleButton, fullscreenButton, wordsOutput;
let wordsList = [];

function setup() {
    noCanvas(); // No drawing canvas required

    // Get input field and buttons from the DOM
    input = select('#text-input');
    addWordButton = select('#add-word-btn');
    shuffleButton = select('#shuffle-btn');
    fullscreenButton = select('#fullscreen-btn');
    wordsOutput = select('#words-output');

    // Event listeners for adding words, shuffling, and toggling fullscreen
    addWordButton.mousePressed(addWordToList);
    shuffleButton.mousePressed(shuffleWords);
    fullscreenButton.mousePressed(toggleFullscreen);
}

function addWordToList() {
    let word = input.value().trim();
    if (word) { // Only add the word if it's not empty
        wordsList.push(word); // Add word to the list
        input.value(''); // Clear the input field
        displayWords(); // Display the current list of words
    }
}

function displayWords() {
    wordsOutput.html(''); // Clear the current display
    wordsList.forEach(word => {
        createElement('div', word).parent(wordsOutput); // Display each word in a new div
    });
}

function shuffleWords() {
    wordsList = shuffleArray(wordsList); // Shuffle the array of words
    displayWords(); // Redisplay the words in their new order
}

function toggleFullscreen() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function keyPressed() {
    if (keyCode === ESCAPE) {
        if (fullscreen()) {
            fullscreen(false);
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}
