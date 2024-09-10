const searchInput = (timeout, input, downButton, upButton, InputCount, spanElements, currentIndex, originalHtml, span, processNode, applyHighlights, updateDisplay) => 
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

            document.querySelectorAll(".highlight").forEach((element) =>
            {
                // Remove the highlight class and restore original content
                const originalContent = originalHtml.get(element.closest(".search-text"));
                if (originalContent)
                {
                    element.closest(".search-text").innerHTML = originalContent;
                }
            });

            // originalHtml.clear();
            // console.log(originalHtml);
            spanElements.length = 0; // Clear the spanElements array
            currentIndex.current = 0; // Reset the index
            return;
        }

        applyHighlights(spanElements, filter, originalHtml, InputCount, currentIndex, span, processNode, updateDisplay);

        downButton.classList.remove("hidden");
        upButton.classList.remove("hidden");
    }, 0); // 500ms delay
}

export default searchInput;