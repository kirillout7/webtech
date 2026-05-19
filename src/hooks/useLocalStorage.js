import { useEffect, useRef, useState } from "react";

/** Безопасное чтение значения из localStorage. */
function readFromStorage(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    if (stored === null) return fallback;
    return JSON.parse(stored);
  } catch (error) {
    console.warn(`useLocalStorage: не удалось прочитать ключ "${key}"`, error);
    return fallback;
  }
}


export function useLocalStorage(key, initialValue) {

  const [value, setValue] = useState(() => readFromStorage(key, initialValue));


  const prevKeyRef = useRef(key);


  useEffect(() => {
    if (prevKeyRef.current !== key) {
      prevKeyRef.current = key;
      setValue(readFromStorage(key, initialValue));
    }
  }, [key, initialValue]);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`useLocalStorage: не удалось записать ключ "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
