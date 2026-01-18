// Question Count Plugin
// Counts how many questions are in the text (question marks)
function questionCountPlugin(text) {
    if (!text || text.trim() === '') {
        return {
            label: "Questions",
            value: 0
        };
    }
    
    // Count question marks in the text
    const questionCount = (text.match(/\?/g) || []).length;
    
    return {
        label: "Questions Found",
        value: questionCount
    };
}
