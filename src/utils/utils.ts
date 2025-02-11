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

export function clean(obj) {
    var propNames = Object.getOwnPropertyNames(obj)
    for (var i = 0; i < propNames.length; i++) {
        var propName = propNames[i]
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName]
        }
    }
}

export function getOTP(): string {
    const digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
}
