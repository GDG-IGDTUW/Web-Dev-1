// Emotion Detection Plugin
// Simple emotion detection based on positive/negative words
function emotionDetectionPlugin(text) {
    if (!text || text.trim() === '') {
        return {
            label: "Text Mood",
            value: "Neutral"
        };
    }
    
    // Simple lists of positive and negative words
    const positiveWords = [
        'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
        'happy', 'joy', 'love', 'perfect', 'awesome', 'brilliant',
        'exciting', 'beautiful', 'success', 'win', 'victory', 'smile'
    ];
    
    const negativeWords = [
        'bad', 'terrible', 'awful', 'horrible', 'disappointing', 'sad',
        'hate', 'angry', 'frustrated', 'wrong', 'fail', 'lose',
        'difficult', 'hard', 'problem', 'issue', 'worry', 'fear'
    ];
    
    // Convert text to lowercase and split into words
    const words = text.toLowerCase().split(/\s+/);
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    // Count positive and negative words
    words.forEach(word => {
        // Remove punctuation for matching
        const cleanWord = word.replace(/[^\w]/g, '');
        
        if (positiveWords.includes(cleanWord)) {
            positiveCount++;
        }
        
        if (negativeWords.includes(cleanWord)) {
            negativeCount++;
        }
    });
    
    // Determine mood
    let mood = 'Neutral';
    if (positiveCount > negativeCount) {
        mood = 'Positive';
    } else if (negativeCount > positiveCount) {
        mood = 'Negative';
    }
    
    return {
        label: "Text Mood",
        value: `${mood} (${positiveCount}+ / ${negativeCount}-)`
    };
}
