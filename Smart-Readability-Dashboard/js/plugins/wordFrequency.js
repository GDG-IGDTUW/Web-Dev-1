// Plugin to calculate and display the top 5 most frequent words
function wordFrequencyPlugin(text) {
  // Handle empty or whitespace-only input
  if (!text || text.trim() === "") {
    return {
      label: "Top 5 Words",
      value: "No text"
    };
  }

  // Convert text to lowercase, remove punctuation, and split into words
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  // Object to store word frequencies
  const frequency = {};

  // Count how many times each word appears
  words.forEach(word => {
    // Ignore very short words (like single letters)
    if (word.length > 1) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  });

  // Convert frequency object to array, sort by count, and take top 5
  const topWords = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => `${word} (${count})`)
    .join(", ");

  // Return result in the required plugin format
  return {
    label: "Top 5 Words",
    value: topWords || "Not enough data"
  };
}

