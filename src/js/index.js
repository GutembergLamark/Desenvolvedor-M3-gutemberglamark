const serverurl = process.env.SERVER_API;

console.log("Dev m3", serverurl);

import { Order } from "./controllers/order.controller"
import { Product } from "./controllers/product.controller"
import { Filter } from "./controllers/filter.controller"
import { Cart } from "./controllers/cart.controller"

Product.listProducts().then(products => {
    Product.addToLocalStorage(products)
})

Product.loadMoreProducts()

Order.mostRecent()
Order.bigPrice()
Order.lowPrice()
Order.openMenuOrder()

Filter.markOrNotMark()
Filter.openMenuFilter()
Filter.cleanFilter()
Filter.openDropdonwColor()
Filter.openDropdonwSize()
Filter.openDropdonwPrice()

Cart.openMenuCart()
Cart.listProductsCart()