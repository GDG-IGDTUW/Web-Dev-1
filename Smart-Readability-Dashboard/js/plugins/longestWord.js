function findLongestWord(str) {

    if (!str || str.trim() === '') {
        return {
            label: "Longest Word",
            value: 0
        };
    }

    let words = str.split(/\s+/);
    let longestWord = "";

    for (let word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    return {
        label: "Longest Word",
        value: longestWord
    };
}
