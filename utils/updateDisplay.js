// Function to handle scrolling and updating display
const updateDisplay = (spanElements, currentIndex, InputCount) =>
{
    if (spanElements.length > 0)
    {
        // Ensure the currentIndex wraps around correctly
        if (currentIndex.current >= spanElements.length)
        {
            currentIndex.current = 0; // Wrap around to the first element
        } else if (currentIndex.current < 0)
        {
            currentIndex.current = spanElements.length - 1; // Wrap around to the last element
        }

        console.log(`Current Index: ${currentIndex.current}`);

        // Scroll to the current element
        spanElements[currentIndex.current].scrollIntoView({
            behavior: "smooth", // Smooth scrolling for better UX
            block: "center" // Aligns the element in the center of the viewport
        });

        // Update the input count display
        InputCount.innerText = `${currentIndex.current + 1} / ${spanElements.length}`;
    }
}

export default updateDisplay;