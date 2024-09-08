// Recursive function to process nodes
const processNode = (node, filter) =>
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

export default processNode;
