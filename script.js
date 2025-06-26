const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");

const caseInsensitiveFlag = document.getElementById("i");
const globalFlag = document.getElementById("g");

function getFlags() {
    let flags = "";
    if (caseInsensitiveFlag.checked) {
        flags += "i";
    }
    if (globalFlag.checked) {
        flags += "g";
    }
    return flags;
}

testButton.addEventListener("click", function() {
    const pattern = regexPattern.value;
    const flags = getFlags();
    const regex = new RegExp(pattern, flags);
    const originalText = stringToTest.textContent;
    let matches = [];
    let resultText = originalText;
    
    if (globalFlag.checked) {
        matches = originalText.match(new RegExp(pattern, flags));
        if (matches) {
            // Highlight all matches
            resultText = originalText.replace(new RegExp(pattern, flags), 
                match => `<span class="highlight">${match}</span>`);
            testResult.textContent = matches.join(", ");
        } else {
            testResult.textContent = "no match";
        }
    } else {
        const match = originalText.match(regex);
        if (match) {
            // Highlight first match only
            resultText = originalText.replace(regex, 
                `<span class="highlight">${match[0]}</span>`);
            testResult.textContent = match[0];
        } else {
            testResult.textContent = "no match";
        }
    }
    
    stringToTest.innerHTML = resultText;
});