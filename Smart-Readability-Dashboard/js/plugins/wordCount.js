// Word Count Plugin
// Simple plugin that counts words in the text
function wordCountPlugin(text) {
    if (!text || text.trim() === '') {
        return {
            label: "Word Count",
            value: 0
        };
    }
    
    // Split by whitespace and filter out empty strings
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    
    return {
        label: "Word Count",
        value: words.length
    };
}
