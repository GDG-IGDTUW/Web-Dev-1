// Average Word Length Plugin
// Calculates the average length of words in the text
function averageWordLengthPlugin(text) {
    if (!text || text.trim() === '') {
        return {
            label: "Avg Word Length",
            value: "0 chars"
        };
    }
    
    // Split text into words and filter out empty strings
    const words = text.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length === 0) {
        return {
            label: "Avg Word Length",
            value: "0 chars"
        };
    }
    
    // Calculate total length of all words (remove punctuation)
    let totalLength = 0;
    words.forEach(word => {
        const cleanWord = word.replace(/[^\w]/g, ''); // Remove punctuation
        totalLength += cleanWord.length;
    });
    
    // Calculate average
    const average = totalLength / words.length;
    
    return {
        label: "Avg Word Length",
        value: `${average.toFixed(1)} chars`
    };
}
