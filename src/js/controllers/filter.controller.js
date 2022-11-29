import { Product } from "./product.controller"

export class Filter {

    static openMenuFilter() {
        const showcase = document.querySelector(".main-content__showcase")

        const buttonOpen = document.querySelector(".actions--filter")
        const menu = document.querySelector(".filter-or-order__container-filter")
        const buttonClose = document.querySelector(".filter-header__close")
        const buttonApplyFilter = document.querySelector(".button__apply")
        const buttonCleanFilter = document.querySelector(".button__clean")

        const footer = document.querySelector(".container-footer")

        buttonOpen.addEventListener("click", () => {
            showcase.className = "main-content__showcase showcase--close"
            menu.className = "filter-or-order__container-filter container-filter--open"
            footer.className = "container-footer container-footer--close"
        })

        Filter.closeMenuFilter(buttonClose)
        Filter.closeMenuFilter(buttonApplyFilter)

        Filter.cleanFilter(buttonCleanFilter)
    }

    static closeMenuFilter(element) {
        const showcase = document.querySelector(".main-content__showcase")

        const menu = document.querySelector(".filter-or-order__container-filter")

        const footer = document.querySelector(".container-footer")

        element.addEventListener("click", () => {
            showcase.classList.remove("showcase--close")
            menu.classList.remove("container-filter--open")
            footer.classList.remove("container-footer--close")
        })
    }

    static cleanFilter(element) {
        const formColor = document.querySelector(".color-options")
        const formSize = document.querySelector(".size-options")
        const formPrice = document.querySelector(".price-options")

        if (!element) {
            element = document.querySelector(".container-img-logo__img")
        }

        element.addEventListener("click", () => {
            formColor.reset()
            formSize.reset()
            formPrice.reset()

            Product.listProducts()
        })
    }

    static openDropdonwColor() {
        const formColor = document.querySelector(".color-options")
        const buttonDropdown = document.querySelector(".dropdown-color")

        buttonDropdown.addEventListener("click", () => {
            formColor.classList.toggle("color-options--open")
        })
    }

    static openDropdonwSize() {
        const formSize = document.querySelector(".size-options")
        const buttonDropdown = document.querySelector(".dropdown-size")

        buttonDropdown.addEventListener("click", () => {
            formSize.classList.toggle("size-options--open")
        })
    }

    static openDropdonwPrice() {
        const formPrice = document.querySelector(".price-options")
        const buttonDropdown = document.querySelector(".dropdown-price")

        buttonDropdown.addEventListener("click", () => {
            formPrice.classList.toggle("price-options--open")
        })
    }

    static markOrNotMark() {
        const checks = document.querySelectorAll(".option--color, .option--size, .option--price")

        checks.forEach(check => {
            check.addEventListener("change", (e) => {
                Filter.filterProducts()
            })
        })
    }

    static filterProducts() {
        const colorOptions = Object.fromEntries(
            new FormData(document.querySelector(".color-options")).entries()
        );

        const sizeOptions = Object.fromEntries(
            new FormData(document.querySelector(".size-options")).entries()
        );

        const priceOptions = Object.fromEntries(
            new FormData(document.querySelector(".price-options")).entries()
        );

        const products = JSON.parse(localStorage.getItem("@m3ecommerce:products")) || []

        const filterToProducts = products.filter((product) => {
            return (
                Filter.filterColor(colorOptions, product.color)
                && Filter.filterSize(sizeOptions, product.size)
                && Filter.filterPrice(priceOptions, product.price)
            )
        })

        Product.listProducts(filterToProducts)
    }

    static filterColor(colors, productColor) {
        colors = Object.keys(colors);

        if (colors.length === 0) {
            return true;
        }

        return colors.includes(productColor.toLowerCase());
    }

    static filterSize(sizes, productSize) {
        sizes = Object.keys(sizes);

        if (sizes.length === 0) {
            return true;
        }

        return productSize.some(size => {
            return sizes.includes(size.toLowerCase());
        })
    }

    static filterPrice(prices, productPrice) {
        prices = Object.keys(prices);

        if (prices.length === 0) {
            return true;
        }

        return prices.some(price => {
            if (price.includes("-")) {
                if (
                    productPrice >= Number(price.split("-")[0])
                    && productPrice <= Number(price.split("-")[1])
                ) {
                    return true
                }
            }
            else if (productPrice > price) {
                return true
            }
        })
    }
}

