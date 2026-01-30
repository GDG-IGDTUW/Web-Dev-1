// Example: js/plugins/exclamationCount.js
function exclamationCountPlugin(text) {
    if (!text || text.trim() === '') {
        return {
            label: "Exclamations",
            value: 0
        };
    }
    
    // Count exclamation marks
    const count = (text.match(/!/g) || []).length;
    
    return {
        label: "Exclamation Marks",
        value: count
    };
}
