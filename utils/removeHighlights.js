const removeHighlights = (
  mainHtml,
  state,
  mainElement,
  upButton,
  downButton,
  InputCount
) => {
  // console.log("removeHi");

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
