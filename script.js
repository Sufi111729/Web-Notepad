// Rich Text Formatter Function
function format(command, value = null) {
    try {
        // Apply the formatting command (bold, italic, etc.) to the editor.
        document.execCommand(command, false, value);
        showToast(`${command} applied`);
    } catch (err) {
        console.log(`Error applying ${command}:`, err);
    }
}

// Dark Mode Toggle Function
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.getElementById('editor').classList.toggle('dark-editor');
    showToast('Dark mode toggled');
}

// Print Function
function printContent() {
    const content = document.getElementById('editor').innerHTML;
    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    showToast('Printed');
}

// Download Function (as HTML file)
function downloadContent() {
    const content = document.getElementById('editor').innerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.html';
    link.click();
    showToast('Downloaded');
}

// Show Toast Notification
function showToast(message) {
    const toast = document.getElementById('action-toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// Handle the Shortcut Popup
function toggleShortcuts() {
    const popup = document.getElementById("shortcut-popup");
    popup.style.display = popup.style.display === "none" || popup.style.display === "" ? "block" : "none";
}

// Keyboard Shortcuts Functionality
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey || event.metaKey) { // Checking for Ctrl or Command (Mac)
        switch (event.key) {
            case 'b': // Bold
                event.preventDefault();
                format('bold');
                break;
            case 'i': // Italic
                event.preventDefault();
                format('italic');
                break;
            case 'u': // Underline
                event.preventDefault();
                format('underline');
                break;
            case 'l': // Left Align
                event.preventDefault();
                format('justifyLeft');
                break;
            case 'e': // Center Align
                event.preventDefault();
                format('justifyCenter');
                break;
            case 'r': // Right Align
                event.preventDefault();
                format('justifyRight');
                break;
            case 'j': // Justify
                event.preventDefault();
                format('justifyFull');
                break;
        }
    }
});

// Placeholder text handling in the editor
const editor = document.getElementById('editor');
const placeholderText = 'Type your text here...';

// Set placeholder text initially if editor is empty
if (!editor.innerHTML.trim()) {
    editor.innerHTML = placeholderText;
}

// Clear placeholder text on focus
editor.addEventListener('focus', function () {
    if (editor.innerHTML.trim() === placeholderText) {
        editor.innerHTML = '';
    }
});

// Add back placeholder text if editor is empty on blur
editor.addEventListener('blur', function () {
    if (editor.innerHTML.trim() === '') {
        editor.innerHTML = placeholderText;
    }
});

// Prevent typing on initial placeholder (optional)
editor.addEventListener('input', function () {
    if (editor.innerHTML.trim() === placeholderText) {
        editor.innerHTML = '';  // Clears placeholder when typing starts
    }
});
