// Reading Time Plugin
// Estimates reading time based on average reading speed (200 words per minute)
function readingTimePlugin(text) {
    if (!text || text.trim() === '') {
        return {
            label: "Reading Time",
            value: "0 min"
        };
    }
    
    // Count words
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Calculate reading time (200 words per minute average)
    const readingTimeMinutes = Math.ceil(wordCount / 200);
    
    // Format the result
    let timeText;
    if (readingTimeMinutes < 1) {
        timeText = "< 1 min";
    } else if (readingTimeMinutes === 1) {
        timeText = "1 min";
    } else {
        timeText = `${readingTimeMinutes} min`;
    }
    
    return {
        label: "Reading Time",
        value: timeText
    };
}
