import { Notify } from "../controllers/notify.controller"

export class Api {
    static BASE_URL = "http://localhost:5000"

    static async getProducts(limit = 6, page = 1) {
        const response = await fetch(`${Api.BASE_URL}/products?_limit=${limit}&_page=${page}`)
            .then(res => res.json())
            .then(res => res)
            .catch(() => Notify.error("Algo inesperado aconteceu"))

        return response
    }
}