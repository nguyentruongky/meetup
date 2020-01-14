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
