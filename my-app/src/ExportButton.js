function ExportButton() {
    const handleClick = function (event) {
        // Taken from https://medium.com/front-end-weekly/text-file-download-in-react-a8b28a580c0d
        const data = require("./example.json");
        let fileContent = "";
        for (let i = 0; i < data.length; i++) {
            let str = data[i]["BibTex"];

            // formats bib file
            // only looking for commas that are only in the biggest set of brackets
            let formattedStr = str;
            let openingBracketCount = 0;
            let closingBracketCount = 0;
            let commaCount = 0;
            for (let j = 0; j < str.length; j++) {
                if (str.charAt(j) === '{') {
                    openingBracketCount++;
                } else if (str.charAt(j) === '}') {
                    closingBracketCount++;
                } else if (str.charAt(j) === ',' &&
                    openingBracketCount - closingBracketCount === 1) {
                    // formattedStr has two characters (\n & \t) added everytime comma is found and string is split
                    // need to account for difference by adding 2 for every comma found to character count for formatted string
                    formattedStr = formattedStr.substring(0, j + commaCount * 2 + 1) + "\n\t"
                                    + formattedStr.substring(j + commaCount * 2 + 1, formattedStr.length);
                    commaCount++;
                }
            }

            fileContent += formattedStr + "\n\n";
        }

        const element = document.createElement("a");
        const file = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
        element.href = URL.createObjectURL(file);
        element.download = "exported_bibtex.bib";
        document.body.appendChild(element);

        element.click();
    }

    return <button onClick={handleClick}>Export</button>
}

export default ExportButton;
