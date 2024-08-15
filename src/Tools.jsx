export const extractNumber = (str) => {
     let num = str.replace(/[^0-9]/g, '');
     return parseInt(num);
}