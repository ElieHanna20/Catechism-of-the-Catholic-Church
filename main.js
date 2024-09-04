const input = document.getElementById("search-input");
const downButton = document.querySelector("#down");
const upButton = document.querySelector("#up");
const InputCount = document.querySelector("#input-count");
const toggleButton = document.querySelector(".toggle-btn");
const sidebar = document.querySelector("#sidebar");

let currentIndex = 0;
let spanElements = [];
let timeout;
let originalHtml = new Map();

// Utility function to preserve HTML while adding highlights
function highlightText(element, searchTerm)
{
  const regex = new RegExp(`(${searchTerm})`, "gi");
  const content = element.innerHTML;
  element.innerHTML = content.replace(regex, '<span class="highlight">$1</span>');
}

// Recursive function to process nodes
function processNode(node, filter)
{
  if (node.nodeType === Node.TEXT_NODE)
  {
    const text = node.nodeValue;
    const regex = new RegExp(filter, "gi");
    const newText = text.replace(regex, '<span class="highlight">$&</span>');
    if (newText !== text)
    {
      const span = document.createElement('span');
      span.innerHTML = newText;
      node.parentNode.replaceChild(span, node);
    }
  } else if (node.nodeType === Node.ELEMENT_NODE)
  {
    if (node.childNodes.length > 0)
    {
      node.childNodes.forEach(child => processNode(child, filter));
    }
  }
}

// Function to apply highlights to elements
function applyHighlights(filter)
{
  spanElements = [];
  document.querySelectorAll(".search-text *").forEach((element) =>
  {
    let originalContent = originalHtml.get(element);

    if (!originalContent)
    {
      originalHtml.set(element, element.innerHTML);
      originalContent = element.innerHTML;
    }

    if (element.textContent.toUpperCase().includes(filter))
    {
      element.innerHTML = originalContent; // Restore original content first
      processNode(element, filter); // Apply highlight
      spanElements.push(...element.querySelectorAll(".highlight")); // Collect highlighted spans
    } else
    {
      element.innerHTML = originalContent; // Restore original content if no match
    }
  });

  InputCount.innerText = spanElements.length > 0 ? `1 / ${spanElements.length}` : "0 / 0";

  // Scroll to the first result if there are any
  if (spanElements.length > 0)
  {
    currentIndex = 0; // Set index to the first element
    updateDisplay();
  }
}


// Event listener for search input
try
{
  input.addEventListener("keyup", () =>
  {
    clearTimeout(timeout);
    timeout = setTimeout(() =>
    {
      const filter = input.value.trim().toUpperCase();

      if (filter === "")
      {
        // Clear highlights and restore original HTML
        downButton.classList.add("hidden");
        upButton.classList.add("hidden");
        InputCount.innerText = "";

        document.querySelectorAll(".search-text *").forEach((element) =>
        {
          element.innerHTML = originalHtml.get(element) || element.innerHTML;
        });

        spanElements = [];
        currentIndex = 0;
        return;
      }

      applyHighlights(filter);

      downButton.classList.remove("hidden");
      upButton.classList.remove("hidden");
    }, 500); // 500ms delay
  });
} catch (error)
{
  console.error("An error occurred with the search input:", error);
}

// Event listener for down button
try
{
  downButton.addEventListener("click", (event) =>
  {
    event.stopPropagation();
    if (spanElements.length > 0)
    {
      currentIndex++;
      updateDisplay();
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
      updateDisplay();
    }
  });
} catch (error)
{
  console.error("An error occurred with the up button:", error);
}

// Function to handle scrolling and updating display
function updateDisplay()
{
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
    spanElements[currentIndex].scrollIntoView({
      behavior: "smooth", // Smooth scrolling for better UX
      block: "center" // Aligns the element in the center of the viewport
    });

    // Update the input count display
    InputCount.innerText = `${currentIndex + 1} / ${spanElements.length}`;
  }
}
// Toggle sidebar
toggleButton.addEventListener("click", () =>
{
  sidebar.classList.toggle("hidden");
  console.log("toggle on");
});
