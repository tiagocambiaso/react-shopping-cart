import type { Product } from "../types";

type ProductItemProps = {
    product: Product;
    addToCart: (id: number) => void
}

export default function ProductItem({product, addToCart} : ProductItemProps) {
    return (
        <div className="flex items-center justify-between gap-6 border border-gray-100 p-5 mb-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            
            {/* Imagen/Emoji del producto */}
            <div className="flex items-center justify-center bg-gray-50 w-16 h-16 rounded-lg text-3xl">
                <span>{product.imagen}</span>
            </div>
            
            {/* Información del producto */}
            <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{product.nombre}</h3>
                <p className="text-gray-500 font-medium">${product.precio.toLocaleString('en-US')}</p>
            </div>

            {/* Botón de acción */}
            <button
                onClick={() => addToCart(product.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors text-sm"
            >
                Comprar
            </button>
        </div>
    )
}