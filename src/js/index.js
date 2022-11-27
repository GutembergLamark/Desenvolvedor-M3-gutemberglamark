const serverurl = process.env.SERVER_API;

console.log("Dev m3", serverurl);

import { Notify } from "./controllers/notify.controller";
import { Order } from "./controllers/order.controller"
import { Product } from "./controllers/product.controller"



Notify.error("Erro ao adicionar item ao carrinho")
// Notify.success("Item adicionado ao carrinho")
Order.mostRecent()
Order.bigPrice()
Order.lowPrice()
Order.menuOrder()

Product.listProducts()

Product.loadMoreProducts()