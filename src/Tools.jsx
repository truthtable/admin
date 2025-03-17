export const extractNumber = (str) => {
     let num = str.replace(/[^0-9]/g, '');
     return parseInt(num);
}

export const percentage = (percentage, value) => {
     return (percentage / 100) * value;
}
export const urlDecodeAndParseJson = (encodedString) => {
     if (encodedString) {
          try {
               const decoded = decodeURIComponent(encodedString);
               const parsed = JSON.parse(decoded);
               return parsed;
          } catch (e) {
               console.warn('Error decoding:', encodedString, e);
               return null;
          }
     }
     return null;
}
export const formatDateTDDMMYY = (date) => {
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     return `${day}/${month}/${year}`;
};
//just add param to end of url
export const updateUrlParams = (params) => {
     // let url = new URL(window.location.href);
     // let hash = url.hash;
     // url.hash = ''; // Temporarily remove the hash to avoid duplication

     // for (const [key, value] of Object.entries(params)) {
     //      url.searchParams.set(key, value);
     // }

     // url.hash = hash; // Reapply the hash
     // window.history.replaceState(null, null, url.toString());
}