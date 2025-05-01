// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Print the document content
function printContent() {
  const content = document.querySelector(".editor").innerHTML;
  const printWindow = window.open("", "", "height=600,width=800");
  printWindow.document.write("<html><head><title>Print</title></head><body>");
  printWindow.document.write(content);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
}

// Download the text content as a .txt file
function downloadContent() {
  const content = document.querySelector(".editor").innerText;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "sufinotepad.txt";
  link.click();
}

// Toggle the shortcut keys popup
function toggleShortcuts() {
  const popup = document.getElementById("shortcut-popup");
  popup.style.display = popup.style.display === "none" ? "block" : "none";
}

// Insert image into the editor
function insertImage() {
  const url = prompt("Enter image URL:");
  if (url) {
    document.execCommand("insertImage", false, url);
  }
}

// Handle keyboard shortcuts
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case "b": // Bold
        document.execCommand("bold");
        event.preventDefault();
        break;
      case "i": // Italic
        document.execCommand("italic");
        event.preventDefault();
        break;
      case "u": // Underline
        document.execCommand("underline");
        event.preventDefault();
        break;
      case "l": // Left Align
        document.execCommand("justifyLeft");
        event.preventDefault();
        break;
      case "e": // Center Align
        document.execCommand("justifyCenter");
        event.preventDefault();
        break;
      case "r": // Right Align
        document.execCommand("justifyRight");
        event.preventDefault();
        break;
      case "j": // Justify
        document.execCommand("justifyFull");
        event.preventDefault();
        break;
      case "s": // Save shortcut (download content)
        downloadContent();
        event.preventDefault();
        break;
      default:
        break;
    }
  }
});

// Handle mouse clicks for buttons
document.querySelectorAll(".toolbar button").forEach((button) => {
  button.addEventListener("click", function () {
    const command = button.getAttribute("onclick").match(/'(\w+)'/)[1];
    document.execCommand(command);
  });
});

// Apply a font and size change to the editor
function changeFont(fontName) {
  document.execCommand("fontName", false, fontName);
}

function changeFontSize(fontSize) {
  document.execCommand("fontSize", false, fontSize);
}

// Update the toolbar and editor based on the changes
document.querySelectorAll("select").forEach((select) => {
  select.addEventListener("change", function () {
    if (select.name === "font") {
      changeFont(select.value);
    } else if (select.name === "size") {
      changeFontSize(select.value);
    }
  });
});

// Clear formatting
document.querySelector("[title='Clear Formatting']").addEventListener("click", function () {
  document.execCommand("removeFormat");
});

// Handle the editor placeholder when it's empty
document.querySelector(".editor").addEventListener("focus", function () {
  if (this.innerHTML === "") {
    this.innerHTML = "<br>";
  }
});

document.querySelector(".editor").addEventListener("blur", function () {
  if (this.innerHTML === "<br>") {
    this.innerHTML = "";
  }
});

// Handle color pickers for text and highlight color
const textColorPicker = document.querySelector("[title='Text Color']");
const highlightColorPicker = document.querySelector("[title='Highlight']");

textColorPicker.addEventListener("input", function () {
  document.execCommand("foreColor", false, this.value);
});

highlightColorPicker.addEventListener("input", function () {
  document.execCommand("hiliteColor", false, this.value);
});

// Handle text alignment buttons
document.querySelectorAll(".toolbar button[title^='Align']").forEach((button) => {
  button.addEventListener("click", function () {
    const alignCommand = button.getAttribute("onclick").match(/'(\w+)'/)[1];
    document.execCommand(`justify${alignCommand}`);
  });
});

// Handle list buttons
document.querySelectorAll(".toolbar button[title^='List']").forEach((button) => {
  button.addEventListener("click", function () {
    const listCommand = button.getAttribute("onclick").match(/'(\w+)'/)[1];
    document.execCommand(listCommand);
  });
});
