const updateDisplay = (state, spanElements, InputCount) =>
{
    console.log('updateDisplay');
    console.log('Span Elements:', spanElements);
    console.log('State:', state);

    // Check if spanElements is not empty
    if (spanElements.length === 0)
    {
        console.warn('No span elements found.');
        return;
    }

    // Ensure the state.currentIndex wraps around correctly
    if (state.currentIndex >= spanElements.length)
    {
        state.currentIndex = 1; // Wrap around to the first element
    } else if (state.currentIndex < 0)
    {
        state.currentIndex = spanElements.length - 1; // Wrap around to the last element
    }

    // Check if the currentIndex is within bounds
    if (state.currentIndex >= 0 && state.currentIndex < spanElements.length)
    {
        const currentElement = spanElements[state.currentIndex];
        if (currentElement)
        {
            currentElement.scrollIntoView({
                behavior: "smooth", // Smooth scrolling for better UX
                block: "center" // Aligns the element in the center of the viewport
            });

            // Update the input count display
            InputCount.innerText = `${state.currentIndex + 1} / ${spanElements.length}`;
        } else
        {
            console.warn('Element at currentIndex is undefined:', state.currentIndex);
        }
    } else
    {
        console.warn('Index out of bounds:', state.currentIndex);
    }
};

export default updateDisplay;
