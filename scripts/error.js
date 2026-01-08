export function showError(fieldId, message) { // field Id mean = class or id , isme se kuch bhi ho sakta he 
    let field = document.getElementById(fieldId);
    if (!field) return;
    
    let existingError = field.parentElement.querySelector('.errorMsg');
    if (existingError) {
        existingError.remove();
    }
    
    let errorSpan = document.createElement('span');
    errorSpan.className = 'errorMsg';
    errorSpan.style.color = '#f44336';
    errorSpan.style.fontSize = '13px';
    errorSpan.style.marginTop = '5px';
    errorSpan.style.display = 'block';
    errorSpan.textContent = message;
    
    field.parentElement.appendChild(errorSpan);
    field.style.borderColor = '#f44336';
}

export function clearError(fieldId) {
    let field = document.getElementById(fieldId);
    if (!field) return;
    
    let existingError = field.parentElement.querySelector('.errorMsg');
    if (existingError) {
        existingError.remove();
    }
    
    field.style.borderColor = '#4caf50';
}

export function showGroupError(groupName, message) {
    let firstElement = document.querySelector('[name="' + groupName + '"]');
    if (!firstElement) return;
    
    let container = firstElement.closest('.form');
    if (!container) return;
    
    let existingError = container.querySelector('.errorMsg');
    if (existingError) {
        existingError.remove();
    }
    
    let errorSpan = document.createElement('span');
    errorSpan.className = 'errorMsg';
    errorSpan.style.color = '#f44336';
    errorSpan.style.fontSize = '13px';
    errorSpan.style.marginTop = '10px';
    errorSpan.style.display = 'block';
    errorSpan.textContent = message;
    
    container.appendChild(errorSpan);
}

export function clearGroupError(groupName) {
    let firstElement = document.querySelector('[name="' + groupName + '"]');
    if (!firstElement) return;
    
    let container = firstElement.closest('.form');
    if (!container) return;
    
    let existingError = container.querySelector('.errorMsg');
    if (existingError) {
        existingError.remove();
    }
}