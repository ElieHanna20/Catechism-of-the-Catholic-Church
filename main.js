const sidebar = document.querySelector("#sidebar");
const toggleButton = document.querySelector(".toggle-btn");
const searchInput = document.getElementById("search-input");
const mainElement = document.querySelector("main"); // Get the main tag
let mainHtml = mainElement.innerHTML; // Get the innerHTML as a string
const InputCount = document.querySelector("#input-count");

let timeout = 0;
let currentIndex = 0;
let spanElements = [];

const updateDisplay = () =>
{
  console.log('updateDisplay');
  if (spanElements.length > 0)
  {
    // Ensure the currentIndex wraps around correctly
    if (currentIndex >= spanElements.length)
    {
      currentIndex = 0; // Wrap around to the first element
    } else if (currentIndex < 0)
    {
      currentIndex = spanElements.length - 1; // Wrap around to the last element
    }
    console.log(`Current Index: ${currentIndex}`);
    // Scroll to the current element
    spanElements[0].scrollIntoView({
      behavior: "smooth", // Smooth scrolling for better UX
      block: "center" // Aligns the element in the center of the viewport
    });

    // Update the input count display
    InputCount.innerText = `${currentIndex + 1} / ${spanElements.length}`;
  }

}

// Function to highlight matches and store span elements
const highlightMatches = (searchTerm) =>
{
  console.log('addHi');
  if (document.querySelector('mark')) removeHighlights;

  // Check if the search term is not empty or just whitespace
  if (searchTerm.trim().length === 0) return;

  // Escape special characters in searchTerm for safe use in split
  const escapedTerm = searchTerm.replace(/([.*+?^${}()|[\]\\])/g, '\\$1');

  // Highlight matches by splitting and joining with <mark> tags
  const highlightedHtml = mainHtml.split(escapedTerm).join(`<mark>${escapedTerm}</mark>`);
  mainElement.innerHTML = highlightedHtml;
  const mark = document.querySelectorAll('mark');
  spanElements = Array.from(mark);

  currentIndex = spanElements.length;

  updateDisplay();
};

const removeHighlights = () =>
{
  console.log('removeHi');
  currentIndex = 0;
  // Remove <mark> and </mark> tags from the HTML
  mainHtml = mainHtml.split('<mark>').join('').split('</mark>').join('');

  // Set the cleaned HTML back to the main tag
  mainElement.innerHTML = mainHtml;
};

// Example Usage:

try
{
  downButton.addEventListener("click", (event) =>
  {
    event.stopPropagation();
    if (spanElements.length > 0)
    {
      currentIndex++;
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
      currentIndex--;
      updateDisplay(spanElements, currentIndex, InputCount);
    }
  });
} catch (error)
{
  console.error("An error occurred with the up button:", error);
}

// Listen for search input to highlight terms
searchInput.addEventListener("input", (event) =>
{
  clearTimeout(timeout);
  timeout = setTimeout(() =>
  {
    const searchTerm = event.target.value;

    if (searchTerm.trim().length === 0)
    {

      removeHighlights();
      return;
    }

    highlightMatches(searchTerm);
  }, 300);
});

// Toggle sidebar
toggleButton.addEventListener("click", () =>
{
  sidebar.classList.toggle("hidden");
});
