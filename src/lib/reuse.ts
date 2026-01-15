export const commonGetValue = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value.trim() || '';

export const commonSelectElement = (id : string) => (document.getElementById(id) as HTMLSelectElement).value