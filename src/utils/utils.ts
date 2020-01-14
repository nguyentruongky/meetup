export function esc(value: any): any {
    if (typeof value === 'undefined') { 
        return null
    } else if (typeof value === 'string') {
        return "'" + value.replace(/'/g, "''") + "'"
    }
    return value
}

export function escRaw(value: any): any {
    if (typeof value === 'undefined') { 
        return null
    } else if (typeof value === 'string') {
        return value.replace(/'/g, "''")
    }
    return value
}
