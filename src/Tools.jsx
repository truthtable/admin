export const extractNumber = (str) => {
     let num = str.replace(/[^0-9]/g, '');
     return parseInt(num);
}

export const percentage = (percentage, value) => {
     return (percentage / 100) * value;
}