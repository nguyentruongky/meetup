export class MLocation {
    address: string
    lat: number
    long: number
    description: string
    constructor(
        address: string,
        lat: number,
        long: number,
        description: string
    ) {
        this.address = address
        this.lat = lat
        this.lat = long
        this.description = description
    }
}
