function findLongestWord(str) {
    let words = str.split(" ");
    let longestWord = "";

    for (let word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }
    return
  {
    label:"Longest Word"
    value:longestWord
  };
}
