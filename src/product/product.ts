export class Product {
    id: string
    name: string
    description: string
    price: number
    currency: string
    createdAt: string
    updatedAt: string
	constructor(id: string,
        name: string,
        description: string,
        price: number) {
            this.id = id 
            this.name = name
            this.description = description
            this.price = price
            this.currency = "USD"
            this.createdAt = new Date().toUTCString()
            this.updatedAt = this.createdAt
	}
}