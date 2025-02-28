let audioContext = null;
const history = [];

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    const key = formatKey(e);
    const code = e.keyCode || e.which;
    
    updateDisplay(key, code);
    updateHistory(key, code);
    document.getElementById('initial-message').style.display = 'none';
});

function formatKey(event) {
    const modifiers = [];
    if (event.ctrlKey && event.key !== 'Control') modifiers.push('Ctrl');
    if (event.shiftKey && event.key !== 'Shift') modifiers.push('Shift');
    if (event.altKey && event.key !== 'Alt') modifiers.push('Alt');
    if (event.metaKey && event.key !== 'Meta') modifiers.push('Meta');

    let key = event.key === ' ' ? 'Space' : event.key;
    return modifiers.length > 0 ? [...modifiers, key].join(' + ') : key;
}

function updateDisplay(key, code) {
    document.getElementById('key-display').textContent = key;
    document.getElementById('code-display').textContent = code;
}

function updateHistory(key, code) {
    history.unshift({ key, code });
    if (history.length > 5) history.pop();
    
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = history
        .map(entry => `<div><span>${entry.key}</span><span>${entry.code}</span></div>`)
        .join('');
}
