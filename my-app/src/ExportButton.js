// import { useState, useEffect } from 'react';

function ExportButton() {
    const handleClick = function(event) {
        // Taken from https://medium.com/front-end-weekly/text-file-download-in-react-a8b28a580c0d
        const element = document.createElement("a");
        const data = "exported information";
        const file = new Blob([data], { type: "text/plain;charset=utf-8" });
        element.href = URL.createObjectURL(file);
        element.download = "myfile.txt";
        document.body.appendChild(element);
        element.click();
    }

    return <button onClick={handleClick}>Export</button>
}

export default ExportButton;