function paragraphCountPlugin(text) {
    if (!text || text.trim() === '') {
        return {
            label: "Paragraphs",
            value: 0
        };
    }

    const paragraphs = text
        .split(/\n\s*\n+/)
        .map(p => p.trim())
        .filter(p => p.length > 0);

    return {
        label: "Paragraphs",
        value: paragraphs.length
    };
}
