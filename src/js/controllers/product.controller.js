import { Api } from "../services/api"
import { Cart } from "./cart.controller"
import { Notify } from "./notify.controller"

export class Product {

    static cardProduct(product) {
        const containerCard = document.createElement("li")
        const containerImage = document.createElement("figure")
        const productImage = document.createElement("img")
        const productName = document.createElement("h2")
        const productPrice = document.createElement("strong")
        const productParcel = document.createElement("span")
        const productBuy = document.createElement("button")

        productImage.src = product.image

        productName.innerText = product.name
        productPrice.innerText = `${new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(product.price)}`
        productParcel.innerText = `até ${product.parcelamento[0]}x de ${new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(product.parcelamento[1])}`
        productBuy.innerText = "Comprar"

        productBuy.addEventListener("click", () => {
            Cart.addProductToCart(product)
        })

        containerCard.classList.add("container-products__product")
        containerImage.classList.add("product__container-img")
        productName.classList.add("product__name")
        productPrice.classList.add("product__price")
        productParcel.classList.add("product__parcel")
        productBuy.classList.add("product__buy")

        containerImage.append(productImage)

        containerCard.append(containerImage, productName, productPrice, productParcel, productBuy)

        return containerCard
    }

    static changePage(page) {
        document
            .querySelector(".showcase_more")
            .setAttribute("data-page", `${page}`);
    }

    static async listProducts(products) {

        const containerProducts = document.querySelector(".showcase__container-products")

        const emptyProducts = document.createElement("h2")
        emptyProducts.innerText = "Não existem produtos para esta busca"

        containerProducts.innerHTML = ""

        if (!products) {
            products = await Api.getProducts(6)
        }

        products.length > 0 ?
            products.forEach(product => {
                const card = Product.cardProduct(product)

                containerProducts.append(card)
            })
            :
            containerProducts.append(emptyProducts)


        return products
    }

    static addToLocalStorage(products) {
        localStorage.clear()
        localStorage.setItem("@m3ecommerce:products", JSON.stringify(products))
    }

    static removeRepeat(array) {
        const set = new Set()

        return array.filter((item) => {
            const duplicatedItem = set.has(item.id)
            set.add(item.id)
            return !duplicatedItem
        })
    }

    static async loadMoreProducts() {
        const buttonMore = document.querySelector(".showcase_more")

        buttonMore.addEventListener("click", async () => {
            const oldProducts = JSON.parse(localStorage.getItem("@m3ecommerce:products")) || []

            const oldPage = document.querySelector(".showcase_more").getAttribute("data-page")
            const page = +oldPage + 1

            const products = await Api.getProducts(6, page)

            const moreProducts = [...oldProducts, ...products]

            if (products.length === 0) {
                buttonMore.classList.add("more--close")
                return Notify.error("Não há mais produtos")
            }

            Product.listProducts(moreProducts)
            Product.addToLocalStorage(moreProducts)
        })
    }
}