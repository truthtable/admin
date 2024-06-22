//not null, undefined,"", NaN, empty array check
export const notNull = (value) => {
     if (value === null || value.length === 0) {
          return false;
     }
     return true;
}