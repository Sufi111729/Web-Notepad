// Rich Text Formatter
function format(command, value = null) {
    document.execCommand(command, false, value);
    showToast(`${command} applied`);
  }
  
  // Dark Mode Toggle
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.getElementById('editor').classList.toggle('dark-editor');
    showToast('Dark mode toggled');
  }
  
  // Print Function
  function printContent() {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(document.getElementById('editor').innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    showToast('Printed');
  }
  
  // Download Function
  function downloadContent() {
    const content = document.getElementById('editor').innerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'web-word-editor.html';
    link.click();
    showToast('Downloaded');
  }
  
  // Toast
  function showToast(message) {
    const toast = document.getElementById('action-toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }
  // Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.getElementById("editor").classList.toggle("dark-editor");
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
  }
  
  // Download Function (as text file)
  function downloadContent() {
    const content = document.getElementById('editor').innerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.html';
    link.click();
  }
  // Get the editor element
const editor = document.getElementById('editor');

// Placeholder text
const placeholderText = 'Type your text here...';

// Set the placeholder text initially if the editor is empty
if (!editor.innerHTML.trim()) {
  editor.innerHTML = placeholderText;
}

// Clear placeholder text on focus
editor.addEventListener('focus', function() {
  if (editor.innerHTML.trim() === placeholderText) {
    editor.innerHTML = '';
  }
});

// Add back placeholder text if editor is empty on blur
editor.addEventListener('blur', function() {
  if (editor.innerHTML.trim() === '') {
    editor.innerHTML = placeholderText;
  }
});

// Prevent typing on initial placeholder (optional)
editor.addEventListener('input', function() {
  if (editor.innerHTML.trim() === placeholderText) {
    editor.innerHTML = '';  // Clears placeholder when typing starts
  }
});

  
  // Show / Hide Shortcuts popup
  function toggleShortcuts() {
    const popup = document.getElementById("shortcut-popup");
    popup.style.display = popup.style.display === "none" || popup.style.display === "" ? "block" : "none";
  }
  
  // Text formatting function (bold, italic, etc.)
  function format(command, value = null) {
    if (value) {
      document.execCommand(command, false, value);
    } else {
      document.execCommand(command, false, null);
    }
  }
  
  // Keypress event for keyboard shortcuts
  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
      switch (event.key) {
        case 'b': format('bold'); break;
        case 'i': format('italic'); break;
        case 'u': format('underline'); break;
        case 'l': format('justifyLeft'); break;
        case 'e': format('justifyCenter'); break;
        case 'r': format('justifyRight'); break;
        case 'j': format('justifyFull'); break;
      }
    }
  });
  