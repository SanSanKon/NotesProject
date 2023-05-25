import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, inintialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue === null) {
            if (typeof inintialValue === 'function') {
                return (inintialValue as () => T)()
            } else {
                return inintialValue
            }
        } else {
            return JSON.parse(jsonValue)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as [T, typeof setValue]
}