export function esc(value: any): any {
    if (typeof value === "undefined") {
        return null
    } else if (typeof value === "string") {
        return "'" + value.replace(/'/g, "''") + "'"
    }
    return value
}

export function escRaw(value: any): any {
    if (typeof value === "undefined") {
        return null
    } else if (typeof value === "string") {
        return value.replace(/'/g, "''")
    }
    return value
}

export function escapeObject(dict: any): any {
    var keys: string[] = []
    var values: any[] = []
    const dictLength = Object.keys(dict).length
    for (const key in dict) {
        if (dict.hasOwnProperty(key)) {
            const value = dict[key]
            const _key = '"' + key + '"'
            const _value = esc(value)
            keys.push(_key)
            if (_value === null) {
                values.push("null")
            } else {
                values.push(_value)
            }
        }
    }
    return { key: keys.join(", "), value: values.join(", ") }
}

export function uuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, char => {
        let random = (Math.random() * 16) | 0 // Nachkommastellen abschneiden
        let value = char === "x" ? random : (random % 4) + 8 // Bei x Random 0-15 (0-F), bei y Random 0-3 + 8 = 8-11 (8-b) gemäss RFC 4122
        return value.toString(16) // Hexadezimales Zeichen zurückgeben
    })
}
