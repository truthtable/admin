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

export const formatDateYYMMDD = (date) => {
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     return `${year}/${month}/${day}`;
};

//just add param to end of url
export const updateUrlParams = (dateStart, dateEnd, customerId, deliverBoyId) => {
     // Grab everything after the #
     const fullHash = window.location.hash.substring(1);            // e.g. "/admin/deliveryHistory?foo=bar"
     const [path, rawQuery = ''] = fullHash.split('?');             // separate path and query

     const params = new URLSearchParams(rawQuery);

     // Set or delete each filter
     const updates = { dateStart, dateEnd, customerId, deliverBoyId };
     Object.entries(updates).forEach(([key, val]) => {
          if (val == null || val === '') {
               params.delete(key);
          } else {
               params.set(key, val);
          }
     });

     // Rebuild and replace the hash (no history entry)
     const newHash = path + (params.toString() ? `?${params}` : '');
     if (`#${newHash}` !== window.location.hash) {
          window.location.replace(window.location.pathname + window.location.search + `#${newHash}`);
     }
}

export const decimalFix = (value, money = false) => {
     let num = value.toFixed(2);
     //if end with .00 remove it
     if (num.endsWith(".00")) {
          num = num.slice(0, -3);
     }
     //if 0 then -
     const temp = Number(num);
     if (temp == 0) {
          num = "-";
     }
     if (money && temp > 0) {
          num = "₹" + num;
     }
     return num;
}

export const titleCase = (str) => {
     return str.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
     });
}