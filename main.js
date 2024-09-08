import searchInput from "./utils/searchInput";
import applyHighlights from "./utils/applyHighlights";
import updateDisplay from "./utils/updateDisplay";
import processNode from "./utils/processNode";

const input = document.getElementById("search-input");
const downButton = document.querySelector("#down");
const upButton = document.querySelector("#up");
const InputCount = document.querySelector("#input-count");
const toggleButton = document.querySelector(".toggle-btn");
const sidebar = document.querySelector("#sidebar");
const span = document.createElement('span');

let currentIndex = { current: 0 };
let spanElements = [];
let timeout;
let originalHtml = new Map();

// Event listener for search input
try
{
  input.addEventListener('keyup', (event) =>
  {
    searchInput(timeout, input, downButton, upButton, InputCount, spanElements, currentIndex, originalHtml, span, processNode, applyHighlights, updateDisplay);
  });
} catch (error)
{
  console.error("An error occurred with the keyup event listener:", error);
}

try
{
  input.addEventListener('paste', (event) =>
  {
    searchInput(timeout, input, downButton, upButton, InputCount, spanElements, currentIndex, originalHtml, span, processNode, applyHighlights, updateDisplay);
  });
} catch (error)
{
  console.error("An error occurred with the paste event listener:", error);
}



// Event listener for down button
try
{
  downButton.addEventListener("click", (event) =>
  {
    event.stopPropagation();
    if (spanElements.length > 0)
    {
      currentIndex.current++;
      updateDisplay(spanElements, currentIndex, InputCount);
    }
  });
} catch (error)
{
  console.error("An error occurred with the down button:", error);
}

// Event listener for up button
try
{
  upButton.addEventListener("click", (event) =>
  {
    event.stopPropagation();
    if (spanElements.length > 0)
    {
      currentIndex.current--;
      updateDisplay(spanElements, currentIndex, InputCount);
    }
  });
} catch (error)
{
  console.error("An error occurred with the up button:", error);
}


// Toggle sidebar
toggleButton.addEventListener("click", () =>
{
  sidebar.classList.toggle("hidden");
  console.log("toggle on");
});