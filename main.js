import highlightMatches from "./utils/highlightMatches";
import removeHighlights from "./utils/removeHighlights";
import updateDisplay from "./utils/updateDisplay";

const noMatchesMessage = document.querySelector("#noMatchesMessage");
const sidebar = document.querySelector("#sidebar");
const toggleButton = document.querySelector(".toggle-btn");
const searchInput = document.getElementById("search-input");
const mainElement = document.querySelector("main");
const InputCount = document.querySelector("#input-count");
const downButton = document.querySelector("#down");
const upButton = document.querySelector("#up");

let mainHtml = mainElement.innerHTML; // Get the innerHTML as a string
let timeout = 0;
const state = {
  currentIndex: 0,
};
let spanElements = [];

try {
  downButton.addEventListener("click", (event) => {
    event.stopPropagation();

    ++state.currentIndex;
    updateDisplay(state, spanElements, InputCount);
  });
} catch (error) {
  console.error("An error occurred with the down button:", error);
}

// Event listener for up button
try {
  upButton.addEventListener("click", (event) => {
    event.stopPropagation();

    state.currentIndex--;
    updateDisplay(state, spanElements, InputCount);
  });
} catch (error) {
  console.error("An error occurred with the up button:", error);
}

// Listen for search input to highlight terms
try {
  searchInput.addEventListener("input", (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const searchTerm = event.target.value;

      //if noMatchesMessage was not hidden previosly
      noMatchesMessage.classList.add("hidden");
      // if (!document.querySelector("mark")) return;
      if (searchTerm.trim().length === 0 && document.querySelector("mark")) {
        removeHighlights(
          mainHtml,
          state,
          mainElement,
          upButton,
          downButton,
          InputCount
        );
        return;
      }

      highlightMatches(
        noMatchesMessage,
        searchTerm,
        mainHtml,
        state,
        spanElements,
        mainElement,
        upButton,
        downButton,
        InputCount,
        removeHighlights,
        updateDisplay
      );
    }, 500);
  });
} catch (error) {
  console.error("An error occurred with the keyup event listener:", error);
}

// Toggle sidebar
toggleButton.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});
