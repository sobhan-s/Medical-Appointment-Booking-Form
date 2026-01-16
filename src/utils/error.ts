export function showError(fieldId: string, message: string): void {
    const field = document.getElementById(fieldId);
    if (!field || !field.parentElement) return;

    const existingError = field.parentElement.querySelector('.errorMsg');
    if (existingError) {
        existingError.remove();
    }

    const errorSpan = document.createElement('span');
    errorSpan.className = 'errorMsg';
    errorSpan.style.color = '#f44336';
    errorSpan.style.fontSize = '13px';
    errorSpan.style.marginTop = '5px';
    errorSpan.style.display = 'block';
    errorSpan.textContent = message;

    field.parentElement.appendChild(errorSpan);
    field.style.borderColor = '#f44336';
}

export function clearError(fieldId: string): void {
    const field = document.getElementById(fieldId);
    if (!field || !field.parentElement) return;
    
    const existingError = field.parentElement.querySelector('.errorMsg');
    if (existingError) {
        existingError.remove();
    }
    
    field.style.borderColor = '#4caf50';
}

export function showGroupError(groupName: string, message: string): void {
    const firstElement = document.querySelector(`[name="${groupName}"]`);
    if (!firstElement) return;
    
    const container = firstElement.closest('.form');
    if (!container) return;
    
    // Remove existing error if present
    const existingError = container.querySelector('.errorMsg');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and append new error message
    const errorSpan = document.createElement('span');
    errorSpan.className = 'errorMsg';
    errorSpan.style.color = '#f44336';
    errorSpan.style.fontSize = '13px';
    errorSpan.style.marginTop = '10px';
    errorSpan.style.display = 'block';
    errorSpan.textContent = message;
    
    container.appendChild(errorSpan);
}

export function clearGroupError(groupName: string): void {
    const firstElement = document.querySelector(`[name="${groupName}"]`);
    if (!firstElement) return;
    
    const container = firstElement.closest('.form');
    if (!container) return;
    
    const existingError = container.querySelector('.errorMsg');
    if (existingError) {
        existingError.remove();
    }
}