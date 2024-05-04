export function saveToLocalStorage(key, arrayName){
    arrayName = localStorage.setItem(key, arrayName);
}