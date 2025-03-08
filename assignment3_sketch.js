let input, addWordButton, shuffleButton, wordsList;

function setup() {
    noCanvas(); // No drawing canvas required

    // Get input field and buttons from the DOM
    input = select('#text-input');
    addWordButton = select('#add-word-btn');
    shuffleButton = select('#shuffle-btn');
    wordsList = select('#words-list');

    // Event listeners for adding words and shuffling
    addWordButton.mousePressed(addWordToList);
    shuffleButton.mousePressed(shuffleWords);
}

function addWordToList() {
    let word = input.value().trim();
    if (word) { // Only add the word if it's not empty
        let li = createElement('li', word); // Create a list item with the word
        li.parent(wordsList); // Append it to the unordered list
        input.value(''); // Clear the input field
    }
}

function shuffleWords() {
    let items = selectAll('li', wordsList);
    let order = items.map((_, i) => i); // Create an array of indices
    order = shuffle(order); // Shuffle the indices

    order.forEach((newPos, i) => {
        wordsList.child(items[newPos]); // Reorder each item in the list based on the shuffled indices
    });
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
