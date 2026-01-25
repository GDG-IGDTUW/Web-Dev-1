function capitalLettersPlugin(text) {
    if (!text || text.trim() === '') {
        return {
            label: "Capital Letters",
            value: 0
        };
    }

    const matches = text.match(/[A-Z]/g);

    return {
        label: "Capital Letters",
        value: matches ? matches.length : 0
    };
}
