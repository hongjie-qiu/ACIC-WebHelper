function ExportButton() {
    const handleClick = function (event) {
        // File export logic referenced from https://medium.com/front-end-weekly/text-file-download-in-react-a8b28a580c0d
       
        // example.json will be replaced by filter logic
        const data = require("./example.json");

        let fileContent = "";
        for (let i = 0; i < data.length; i++) {
            // if (data[i]["status"] === status) {
                let unformattedBibTex = data[i]["BibTex"];
                fileContent += formatBibTex(unformattedBibTex);
            // }
        }

        const element = document.createElement("a");
        const file = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
        element.href = URL.createObjectURL(file);
        element.download = "exported_bibtex.bib";
        document.body.appendChild(element);

        element.click();
    }

    const formatBibTex = function (bibTex) {
        // formats BibTex for individual entry
        // only looking for commas that are only in the biggest set of brackets
        let formattedStr = bibTex;
        let openingBracketCount = 0;
        let closingBracketCount = 0;
        let commaCount = 0;
        for (let j = 0; j < bibTex.length; j++) {
            if (bibTex.charAt(j) === '{') {
                openingBracketCount++;
            } else if (bibTex.charAt(j) === '}') {
                closingBracketCount++;
            } else if (bibTex.charAt(j) === ',' &&
                openingBracketCount - closingBracketCount === 1) {
                // formattedStr has a new line and a tab (\n & \t) added everytime comma is found and string is split
                // need to account for difference by adding 2 to character count for formatted string for every comma found
                formattedStr = formattedStr.substring(0, j + commaCount * 2 + 1) + "\n\t"
                    + formattedStr.substring(j + commaCount * 2 + 1, formattedStr.length);
                commaCount++;
            }
        }

        // add in missing number of closing brackets at the end
        if (closingBracketCount < openingBracketCount) {
            for (let k = 0; k < openingBracketCount - closingBracketCount; k++) {
                formattedStr += "}";
            }
        }

        // add new line at the end of individual BibTex
        return formattedStr + "\n\n";
    }

    return <button className="exportButton" onClick={handleClick}>Export</button>
}

export default ExportButton;
