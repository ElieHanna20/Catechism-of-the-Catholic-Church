const updateDisplay = (state, spanElements, InputCount) => {
  console.log("updateDisplay");
  console.log("Span InputCount:", InputCount);
  console.log("Span spanElements:", spanElements);
  console.log("State:", state);

  // Check if spanElements is not empty
  if (spanElements.length === 0) {
    console.warn("No span elements found.");
    return;
  }

  // Ensure currentIndex is a valid number
  if (typeof state.currentIndex !== "number" || isNaN(state.currentIndex)) {
    console.warn("currentIndex is not a valid number, resetting to 0.");
    state.currentIndex = 0;
  }

  // Reset currentIndex to 0 if out of bounds
  if (state.currentIndex >= spanElements.length || state.currentIndex < 0) {
    console.warn("currentIndex out of bounds, resetting to 0.");
    state.currentIndex = 0;
  }

  const currentElement = spanElements[state.currentIndex];

  if (currentElement) {
    currentElement.scrollIntoView({
      behavior: "smooth", // Smooth scrolling for better UX
      block: "center", // Aligns the element in the center of the viewport
    });

    // Update the input count display
    InputCount.innerText = `${state.currentIndex + 1} / ${spanElements.length}`;
  } else {
    console.warn("Element at currentIndex is undefined:", state.currentIndex);
  }
};

export default updateDisplay;
