import useCart from "./hooks/useCart.ts";
import ProductItem from "./components/ProductItem.tsx";
import CartItem from "./components/CartItem";


export default function App() {
  const { 
    products, 
    cart, 
    totalCart, 
    addToCart, 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart, 
    cleanCart 
  } = useCart();
  return (
    <>
      <header className="bg-white border-b border-gray-200 py-6">
        <h1 className="flex justify-center font-bold text-4xl text-gray-900">Apple Store</h1>
      </header>

      <main className="max-w-6xl mx-auto mt-10 p-5"> 
        <div className="flex flex-col md:flex-row gap-10 items-start">
    
          {/* COLUMNA IZQUIERDA: Carrito de Compras */}
          <aside className="w-full md:w-1/3 sticky top-5">
            <CartItem
              cart={cart}
              totalCart={totalCart}
              cleanCart={cleanCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          </aside>

          {/* COLUMNA DERECHA: Listado de Productos */}
          <section className="w-full md:w-2/3 space-y-4">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product} // Prop ahora se llama 'product'
                addToCart={addToCart}
              />
            ))}
          </section>

        </div>
      </main>
    </>
  );
}