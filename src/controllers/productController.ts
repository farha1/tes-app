import { db } from "../database"

export const getProduct = async () => {
    return await db.products.findMany()
}