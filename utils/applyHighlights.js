// Function to apply highlights to elements
const applyHighlights = (spanElements, filter, originalHtml, InputCount, currentIndex, span, processNode, updateDisplay) =>
{
    spanElements.length = [];
    document.querySelectorAll(".search-text").forEach((element) =>
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
            processNode(element, filter, span); // Apply highlight
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
        currentIndex.current = 0; // Set index to the first element
        updateDisplay(spanElements, currentIndex, InputCount);
    }
}

export default applyHighlights;