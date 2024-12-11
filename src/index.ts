import { Elysia, t } from "elysia";
import { getProduct } from "./controllers/productController";
import { placeOrder } from "./controllers/orderController";

const port = process.env.PORT || 3000;
const app = new Elysia();

// ======= routes =======
app.get("/products", getProduct);
app.post("/order", placeOrder, {
  body: t.Object({
    ids: t.Array(t.Numeric())
  })
});
// ======================

app.listen(port);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
