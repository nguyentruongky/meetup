import { getProduct } from "./productDb"
import { ql } from "./productQL"

export default class ProductService {
    syntax = ql

    configResolvers(resolvers: any) {
        resolvers.Query.getProduct = async (id: string) => {
            let product = await getProduct(id)
            return product
        };
        resolvers.Mutation.product = (_: any, product: any) => {
        };
    }
}