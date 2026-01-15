export function showError(fieldId:string, message:string):void {
    let field:HTMLElement | null = document.getElementById(fieldId)
    if(!field) return;

    let existingError:Element | null;
    if(!field.parentElement) return;

    existingError = field.parentElement?.querySelector('.errorMsg');
    if(!existingError) return;
    existingError.remove()

    let errorSpan:HTMLSpanElement = document.createElement('span')
    if(!errorSpan) return;
    errorSpan.className = 'errorMsg';
    errorSpan.style.color = '#f44336';
    errorSpan.style.fontSize = '13px';
    errorSpan.style.marginTop = '5px';
    errorSpan.style.display = 'block';
    errorSpan.textContent = message;

    field.parentElement.appendChild(errorSpan)
    field.style.borderColor = '#f44336'
}

export function clearError(fieldId:string):void {
    let field:HTMLElement | null = document.getElementById(fieldId);
    if (!field) return;

    if(!field.parentElement) return;
    
    let existingError:HTMLElement | null = field.parentElement.querySelector('.errorMsg');
    if (!existingError) return;

    existingError.remove();
    
    field.style.borderColor = '#4caf50';
}

export function showGroupError(groupName:string, message:string) {
    let firstElement:Element | null = document.querySelector('[name="' + groupName + '"]');
    if (!firstElement) return;
    
    let container:Element | null = firstElement.closest('.form');
    if (!container) return;
    
    let existingError: Element | null = container.querySelector('.errorMsg');
    if (!existingError) return;
    existingError.remove();
    
    let errorSpan:HTMLSpanElement | null = document.createElement('span');
    if(!errorSpan) return
    errorSpan.className = 'errorMsg';
    errorSpan.style.color = '#f44336';
    errorSpan.style.fontSize = '13px';
    errorSpan.style.marginTop = '10px';
    errorSpan.style.display = 'block';
    errorSpan.textContent = message;
    
    container.appendChild(errorSpan);
}

export function clearGroupError(groupName:string) {
    let firstElement:Element | null = document.querySelector('[name="' + groupName + '"]');
    if (!firstElement) return;
    
    let container:Element | null = firstElement.closest('.form');
    if (!container) return;
    
    let existingError:Element | null = container.querySelector('.errorMsg');
    if (!existingError) return
    existingError.remove();
}