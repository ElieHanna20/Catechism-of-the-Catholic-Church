const input = document.getElementById("search-input");
const downButton = document.querySelector("#down");
const InputCount = document.querySelector("#input-count");
const toggleButton = document.querySelector(".toggle-btn");
const sidebar = document.querySelector("#sidebar");

let currentIndex = 0;
let spanElements = [];
let timeout;

// Add the event listener for the down button once
downButton.addEventListener("click", () =>
{
  if (spanElements.length > 0)
  {
    // Scroll to the current element
    spanElements[currentIndex].scrollIntoView(false);

    // Log the element to the console
    InputCount.innerText = `${currentIndex + 1} / ${spanElements.length}`;

    // Increment the index
    currentIndex++;

    // If the index is out of bounds, reset it to 0
    if (currentIndex >= spanElements.length)
    {
      currentIndex = 0;
    }
  }
});

input.addEventListener("keyup", () =>
{
  // Clear the previous timeout
  clearTimeout(timeout);

  // Set a new timeout
  timeout = setTimeout(() =>
  {
    // Get input value in upper case letters
    const filter = input.value.trim().toUpperCase();

    // Get all of the paragraphs that should be searched through
    const paragraphs = document.querySelectorAll(".search-text p, .search-text h1, .search-text h2, .search-text h3, .search-text h4");

    // Clear previous highlights and reset index
    currentIndex = 0;
    spanElements = [];

    // Check if the input is empty
    if (filter === "")
    {
      // Hide the button
      downButton.classList.add("hidden-button");
      InputCount.innerText = ""; // Reset the count display

      // Loop through all paragraphs
      paragraphs.forEach((p) =>
      {
        // Set the paragraphs to their default text content
        p.innerHTML = p.textContent;
      });

      // Exit the function
      return;
    }

    paragraphs.forEach((p) =>
    {
      // Get the text content of each paragraph
      let txtValue = p.textContent;

      // Check if the text matches the input value
      if (txtValue.toUpperCase().indexOf(filter) > -1)
      {
        txtValue = txtValue.replace(
          new RegExp(filter, "gi"),
          '<span class="highlight">$&</span>'
        );

        // Set the paragraph inner html to the new text
        p.innerHTML = txtValue;
        // Show the button after search
        downButton.classList.remove("hidden-button");
      } else
      {
        p.innerHTML = txtValue;
      }
    });

    // Update the spanElements array with the new highlights
    spanElements = [...document.querySelectorAll(".highlight")];

    // Update the input count display
    InputCount.innerText = `1 / ${spanElements.length}`;

    // Reset current index
    currentIndex = 0;
  }, 500); // 500ms delay
});

//toggle nav
toggleButton.addEventListener('click', () =>
{
  sidebar.classList.toggle('hidden');
  console.log('toggle on');

});
