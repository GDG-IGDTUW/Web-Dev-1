// Long Sentence Plugin
// Counts sentences that have more than 20 words
function longSentencePlugin(text) {
    if (!text || text.trim() === '') {
        return {
            label: "Long Sentences",
            value: 0
        };
    }
    
    // Split text into sentences using common sentence endings
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    
    let longSentenceCount = 0;
    
    sentences.forEach(sentence => {
        // Count words in each sentence
        const words = sentence.trim().split(/\s+/).filter(word => word.length > 0);
        
        // Check if sentence has more than 20 words
        if (words.length > 20) {
            longSentenceCount++;
        }
    });
    
    return {
        label: "Long Sentences (>20 words)",
        value: longSentenceCount
    };
}
