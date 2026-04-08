export type Product = {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
}

// Usamos Herencia para que el item del carrito sea un Producto + la cantidad
export type CartItem = Product & {
    quantity: number;
}

// Props para el componente CartItem
export type CartItemProps = {
  cart: CartItem[]
  totalCart: number
  cleanCart: () => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  removeFromCart: (id: number) => void
}

// Props para el componente ProductItem (el que antes era SuenoItem)
export type ProductItemProps = {
    product: Product
    addToCart: (id: number) => void
}