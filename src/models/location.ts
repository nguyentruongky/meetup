export default class MLocation {
    address: string
    lat: number
    long: number
    locationNotes: string
    constructor(raw: any) {
        this.address = raw.address
        this.lat = raw.lat
        this.long = raw.long
        this.locationNotes = raw.locationNotes
    }
}
