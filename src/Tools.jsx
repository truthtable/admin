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

    //console.log(dateStart, dateEnd, customerId, deliverBoyId);

    // Grab everything after the #
    const fullHash = window.location.hash.substring(1);            // e.g. "/admin/deliveryHistory?foo=bar"
    const [path, rawQuery = ''] = fullHash.split('?');             // separate path and query

    const params = new URLSearchParams(rawQuery);

    // Set or delete each filter
    const updates = {dateStart, dateEnd, customerId, deliverBoyId};
    Object.entries(updates).forEach(([key, val]) => {
        console.log(key, val);
        if (val == null || val === '' || val === undefined) {
            params.delete(key);
        } else {
            params.set(key, val);
        }
    });

    console.log(params.toString());

    // Rebuild and replace the hash (no history entry)
    const newHash = path + (params.toString() ? `?${params}` : '');
    if (`#${newHash}` !== window.location.hash) {
        window.location.replace(window.location.pathname + window.location.search + `#${newHash}`);
    }
}

export const decimalFix = (value, money = false) => {
    const temp = Number(value);
    let num = temp.toFixed(2);
    //console.log(value, temp, num);

    // if ends with .00, remove it
    if (num.endsWith(".00")) {
        num = num.slice(0, -3);
    }

    // if 0 then -
    if (temp === 0) {
        num = "-";
    }

    // preserve negative sign for money
    if (money && temp !== 0) {
        num = `₹${num}`;
    }

    return num;
}

export const titleCase = (str) => {
    try {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    } catch (e) {
        return str;
    }
}

export const chunkArray = (array, chunkSize) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        results.push(array.slice(i, i + chunkSize));
    }
    return results;
}

export const storeInLocalStorage = (key, value) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (e) {
        console.warn('Error storing in localStorage:', e);
    }
}

export const getFromLocalStorage = (key) => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) return null;
        return JSON.parse(serializedValue);
    } catch (e) {
        console.warn('Error getting from localStorage:', e);
        return null;
    }
}
export const setSessionVal = (key, value) => {
    try {
        const serializedValue = JSON.stringify(value);
        sessionStorage.setItem(key, serializedValue);
    } catch (e) {
        console.warn('Error storing in sessionStorage:', e);
    }
}

export const getSessionVal = (key) => {
    try {
        const serializedValue = sessionStorage.getItem(key);
        if (serializedValue === null) return null;
        return JSON.parse(serializedValue);
    } catch (e) {
        console.warn('Error getting from sessionStorage:', e);
        return null;
    }
}


export const randomLightColor = (seed) => {
    const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    };
    const hue = (rand() * 360 + seed * 37) % 360;
    const saturation = 45 + rand() * 20;
    const lightness = 88 + rand() * 6;
    const h = hue / 360;
    const s = saturation / 100;
    const l = lightness / 100;
    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    const g = Math.round(hue2rgb(p, q, h) * 255);
    const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
    return `rgb(${r}, ${g}, ${b})`;
};

export const formatDateToDDMMYY_HHMM = (dateString) => {
    //convert to epoch
    var date = new Date(dateString);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yy = date.getFullYear();
    var yyyy = yy.toString().slice(2, 4);
    let str = dd + "/" + mm + "/" + yyyy;
    let time = date.toLocaleTimeString("en-IN", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    });
    time = time.toUpperCase();
    return str + " - " + time;
}

export const toNumber = (value) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
}

export const dashIfZero = (value) => {
    const num = Number(value);
    if (isNaN(num) || num === 0) {
        return "-";
    }
    return num;
}