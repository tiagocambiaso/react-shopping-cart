import type { CartItem as CartItemType } from "../types";

type CartItemProps = {
  cart: CartItemType[];
  totalCart: number;
  cleanCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

export default function CartItem({
  cart,
  totalCart,
  cleanCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}: CartItemProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Sección del Total */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
          Total de tu compra
        </p>
        <p className="text-4xl font-bold text-gray-900">
          ${totalCart.toLocaleString("en-US")}
        </p>
      </div>

      {/* Sección del botón Vaciar */}
      <div className="flex justify-between items-end mb-8">
        <p className="text-sm text-gray-500">{cart.length} artículos</p>
        <button
          className="text-blue-600 hover:underline text-sm font-medium"
          onClick={cleanCart}
        >
          Vaciar bolsa
        </button>
      </div>

      {/* Lista de Productos */}
      <div>
        <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Tu Bolsa</h2>

        {cart.length === 0 ? (
          <p className="text-gray-400 text-center py-10">Tu bolsa está vacía.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-50 pb-4 last:border-0"
              >
                {/* Lado Izquierdo: Info y Controles */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.imagen}</span>
                    <span className="font-semibold text-gray-700">{item.nombre}</span>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1 w-fit border border-gray-200">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="text-gray-400 hover:text-black font-bold transition-colors"
                    >
                      -
                    </button>

                    <span className="text-xs font-black text-gray-700 w-4 text-center">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="text-gray-400 hover:text-black font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Lado Derecho: Precio y Eliminar */}
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-gray-900">
                    ${(item.precio * item.quantity).toLocaleString("en-US")}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-300 hover:text-red-500 text-sm transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}