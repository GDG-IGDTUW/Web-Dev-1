function highlightText(text, query) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<span class="highlight">$1</span>`);
}

function searchDecks() {

    const query = document.getElementById("searchInput").value.toLowerCase();
    const decks = document.querySelectorAll(".deck");

    decks.forEach(deck => {

        const title = deck.querySelector(".deck-title");
        const desc = deck.querySelector(".deck-desc");

        const titleText = title.textContent;
        const descText = desc.textContent;

        if (
            titleText.toLowerCase().includes(query) ||
            descText.toLowerCase().includes(query)
        ) {
            deck.style.display = "block";

            title.innerHTML = highlightText(titleText, query);
            desc.innerHTML = highlightText(descText, query);

        } else {
            deck.style.display = "none";
        }

    });
}