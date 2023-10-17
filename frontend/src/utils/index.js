import {DateTime} from 'luxon';
export {default as api} from './api';


export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const debounce = (callback, delay = 1500) => {
  let timeoutId;
  return async (...args) => {
    clearTimeout(timeoutId);
    return new Promise((resolve) => {
      timeoutId = setTimeout(() => (
        resolve(callback(...args))
      ), delay);
    });
  };
};

export const prettyISODateTime =  (d) => (DateTime.fromISO(d).toLocaleString(DateTime.DATETIME_MED));