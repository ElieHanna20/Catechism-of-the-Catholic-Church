const highlightMatches = (
  buttonContainer,
  noMatchesMessage,
  searchTerm,
  mainHtml,
  state,
  spanElements,
  mainElement,
  InputCount,
  removeHighlights,
  updateDisplay
) => {
  // console.log("addHi");
  if (document.querySelector("mark"))
    removeHighlights(buttonContainer, mainHtml, state, mainElement, InputCount);

  const trimmedSearchTerm = searchTerm.trim();
  // Check if the search term is not empty or just whitespace
  if (trimmedSearchTerm.length === 0) return;

  // Escape special characters in searchTerm for safe use in split
  const escapedTerm = trimmedSearchTerm.replace(
    /([.*+?^${}()|[\]\\])/g,
    "\\$1"
  );

  // Highlight matches by splitting and joining with <mark> tags
  const highlightedHtml = mainHtml
    .split(escapedTerm)
    .join(`<mark>${escapedTerm}</mark>`);
  mainElement.innerHTML = highlightedHtml;
  const mark = document.querySelectorAll("mark");
  spanElements.length = 0; // Clear existing array
  spanElements.push(...mark); // Update spanElements with new elements
  if (spanElements.length === 0) {
    noMatchesMessage.classList.remove("hidden");
    return;
  }
  state.currentIndex = 0; // Reset index when new search term is highlighted
  updateDisplay(state, spanElements, InputCount);
  // downButton.classList.remove("hidden");
  // upButton.classList.remove("hidden");
  buttonContainer.classList.remove("hidden");
};

export default highlightMatches;
