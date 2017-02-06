export var get = (n) => {
    return localStorage.getItem(n);
};
export var set = (name, value) => {
    return localStorage.setItem(name, value);
};
export var del = (n) => {
    localStorage.removeItem(n);
};
export var clear = () => {
    localStorage.clear();
};