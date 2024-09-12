const removeHighlights = (
  mainHtml,
  state,
  mainElement,
  upButton,
  downButton,
  InputCount
) => {
  // console.log('removeHi');
  if (!document.querySelector("mark")) return;
  // console.log('removeHi with mark');

  state.currentIndex = 0;
  // Remove <mark> and </mark> tags from the HTML
  mainHtml = mainHtml.split("<mark>").join("").split("</mark>").join("");

  // Set the cleaned HTML back to the main tag
  mainElement.innerHTML = mainHtml;
  downButton.classList.add("hidden");
  upButton.classList.add("hidden");
  InputCount.innerText = "";
};

export default removeHighlights;
