import { Notify } from "./notify.controller"

export class Cart {

    static productsCart = []

    static openMenuCart() {
        const showcase = document.querySelector(".main-content__showcase")

        const buttonOpen = document.querySelector(".header-content__container-img-cart")
        const menu = document.querySelector(".main-content__container-cart")
        const buttonClose = document.querySelector(".close-cart")

        const width = window.screen.width

        buttonOpen.addEventListener("click", () => {
            if (width > 769) {
                menu.className = "main-content__container-cart container-cart--open"
            } else {
                showcase.className = "main-content__showcase showcase--close"
                menu.className = "main-content__container-cart container-cart--open"
            }
        })

        Cart.closeMenuCart(buttonClose)
    }

    static closeMenuCart(element) {

        const showcase = document.querySelector(".main-content__showcase")

        const menu = document.querySelector(".main-content__container-cart")

        element.addEventListener("click", () => {
            showcase.classList.remove("showcase--close")
            menu.classList.remove("container-cart--open")
        })
    }

    static addProductToCart(product) {
        const allProducts = JSON.parse(localStorage.getItem("@m3ecommerce:products")) || []

        const productCart = allProducts.find((currentProduct) => currentProduct.id === product.id)

        const productExists = Cart.productsCart.find((currentProduct) => currentProduct.id === productCart.id)

        productExists
            ? (Notify.clearToastify(".container-error"), Notify.error("O produto já foi adicionado ao carrinho"))
            : (Cart.productsCart.push(productCart), Notify.clearToastify(".container-success"), Notify.success("Produto adicionado ao carrinho"))

        Cart.updateCart()
    }

    static removeProductToCart(product) {
        const productRemove = Cart.productsCart.find((currentProduct) => currentProduct.id === product.id)

        Cart.productsCart = Cart.productsCart.filter((currentProduct) => currentProduct.id !== productRemove.id)

        Cart.updateCart()
    }

    static quantityProductsOfCart() {
        const countQuantityProductsCart = document.querySelector(".container-img-cart__circle")

        const quantity = Cart.productsCart.length

        countQuantityProductsCart.innerText = quantity
    }

    static calculateTotal() {
        const elementTotal = document.querySelector(".total__price")

        const total = Cart.productsCart.reduce((acc, cur) => {
            return acc + cur.price
        }, 0)

        elementTotal.innerText = `${new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(total)}`
    }

    static updateCart() {
        Cart.listProductsCart()
        Cart.quantityProductsOfCart()
        Cart.calculateTotal()
    }

    static cardProductCart(product) {
        const containerProduct = document.createElement("li")
        const containerImageProduct = document.createElement("figure")
        const imageProduct = document.createElement("img")
        const containerInfoProduct = document.createElement("div")
        const nameProduct = document.createElement("h2")
        const priceProduct = document.createElement("strong")
        const buttonDeleteProduct = document.createElement("button")
        const imageTrashProduct = document.createElement("img")

        imageProduct.src = product.image
        imageTrashProduct.src = "../../img/trash.svg"

        nameProduct.innerText = product.name
        priceProduct.innerText = `${new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(product.price)}`

        buttonDeleteProduct.addEventListener("click", () => {
            Cart.removeProductToCart(product)
        })

        containerProduct.classList.add("container-products-cart__product")
        containerInfoProduct.classList.add("product__container-info")
        buttonDeleteProduct.classList.add("product__button-remove")

        containerImageProduct.append(imageProduct)
        containerInfoProduct.append(nameProduct, priceProduct)
        buttonDeleteProduct.append(imageTrashProduct)

        containerProduct.append(containerImageProduct, containerInfoProduct, buttonDeleteProduct)

        return containerProduct
    }

    static listProductsCart() {

        const containerProductsCart = document.querySelector(".container-cart__container-products-cart")

        containerProductsCart.innerHTML = ""

        const emptyCart = document.createElement("h3")
        emptyCart.innerText = "Carrinho vazio"


        Cart.productsCart.length > 0
            ? Cart.productsCart.forEach((product) => {
                const carProduct = Cart.cardProductCart(product)

                containerProductsCart.append(carProduct)
            })
            : containerProductsCart.append(emptyCart)
    }
}