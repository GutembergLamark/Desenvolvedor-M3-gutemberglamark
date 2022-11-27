import { Product } from "./product.controller"

export class Order {

    static menuOrder() {
        const showcase = document.querySelector(".main-content__showcase")

        const buttonOpen = document.querySelector(".actions--order")
        const menu = document.querySelector(".filter-or-order__container-order")
        const buttonClose = document.querySelector(".order-header__close")

        const footer = document.querySelector(".container-footer")

        buttonOpen.addEventListener("click", (e) => {
            showcase.className = "main-content__showcase showcase--close"
            menu.className = "filter-or-order__container-order container-order--open"
            footer.className = "container-footer container-footer--close"
        })

        Order.closeMenuOrder(buttonClose)
    }

    static closeMenuOrder(element) {

        const showcase = document.querySelector(".main-content__showcase")

        const menu = document.querySelector(".filter-or-order__container-order")

        const footer = document.querySelector(".container-footer")

        element.addEventListener("click", () => {
            showcase.classList.remove("showcase--close")
            menu.classList.remove("container-order--open")
            footer.classList.remove("container-footer--close")
        })
    }

    static mostRecent() {
        const orderSelectOptions = document.getElementById("order")

        const selectRecent = document.querySelector(".options_recent")

        orderSelectOptions.addEventListener("change", (e) => {
            const orderType = e.target.value

            if (orderType === "recent") {
                const products = JSON.parse(localStorage.getItem("@m3ecommerce:products")) || []

                const orderDate = Order.orderByRecentDate(products)

                Product.listProducts(orderDate)
            }

        })

        selectRecent.addEventListener("click", () => {
            const products = JSON.parse(localStorage.getItem("@m3ecommerce:products")) || []

            const orderDate = Order.orderByRecentDate(products)

            Product.listProducts(orderDate)
        })

        Order.closeMenuOrder(selectRecent)
    }

    static bigPrice() {
        const orderSelectOptions = document.getElementById("order")

        const selectBigPrice = document.querySelector(".options_big-price")

        orderSelectOptions.addEventListener("change", (e) => {
            const orderType = e.target.value

            if (orderType === "max-price") {
                const products = JSON.parse(localStorage.getItem("@m3ecommerce:products")) || []

                const orderBigPrice = Order.orderByBigPrice(products)

                Product.listProducts(orderBigPrice)
            }
        })

        selectBigPrice.addEventListener("click", () => {
            const products = JSON.parse(localStorage.getItem("@m3ecommerce:products")) || []

            const orderBigPrice = Order.orderByBigPrice(products)

            Product.listProducts(orderBigPrice)
        })

        Order.closeMenuOrder(selectBigPrice)
    }

    static lowPrice() {
        const orderSelectOptions = document.getElementById("order")

        const selectLowPrice = document.querySelector(".options_low-price")

        orderSelectOptions.addEventListener("change", (e) => {
            const orderType = e.target.value

            if (orderType === "min-price") {
                const products = JSON.parse(localStorage.getItem("@m3ecommerce:products")) || []

                const orderLowPrice = Order.orderByLowPrice(products)

                Product.listProducts(orderLowPrice)
            }
        })

        selectLowPrice.addEventListener("click", () => {
            const products = JSON.parse(localStorage.getItem("@m3ecommerce:products")) || []

            const orderLowPrice = Order.orderByLowPrice(products)

            Product.listProducts(orderLowPrice)
        })

        Order.closeMenuOrder(selectLowPrice)
    }

    static orderByRecentDate(list) {
        return list.sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    };

    static orderByBigPrice(list) {
        return list.sort(
            (a, b) => Number(b.price) - Number(a.price)
        );
    };

    static orderByLowPrice(list) {
        return list.sort(
            (a, b) => Number(a.price) - Number(b.price)
        );
    };
}