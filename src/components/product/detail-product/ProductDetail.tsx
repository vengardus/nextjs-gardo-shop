import { ISeedProduct } from "@/seed/seed"
import { SizeSelector } from "../size-selector/SizeSelector"
import { QuantitySelector } from "../quantity-selector/QuantitySelector"
import { titleFont } from "@/config/fonts"


interface Props {
    product: ISeedProduct,
}

export const ProductDetail = ({ product }: Props) => {
    return (
        <>
            {/* title */}
            <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                {product.title}
            </h1>

            <p className="text-xl mb-5">S/. {product.price}</p>

            {/* selector tallas */}
            <SizeSelector
                selectedSize={product.sizes[0]}
                availableSizes={product.sizes}
            />

            {/* selector cantidad */}
            <QuantitySelector
                quantity={1}
            />

            {/* button carrito*/}
            <button className="btn-primary my-5">
                Agregar al carrito
            </button>

            {/* descripción */}
            <h3 className="font-light mb-5">{product.description}</h3>
        </>
    )
}
