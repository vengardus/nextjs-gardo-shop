import { titleFont } from "@/config"
import { currencyFormat } from "@/utils"
import { IProduct } from "@/interfaces"
import { StockLabel } from "../stock-label/StockLabel"
import { AddToCart } from "../ui/AddToCart"

interface Props {
    product: IProduct,
}

export const ProductDetail = ({ product }: Props) => {
    return (
        <>
            {/* stock */}
           <StockLabel slug={product.slug}/>

            {/* title */}
            <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                {product.title}
            </h1>

            <p className="text-xl mb-5">{currencyFormat(product.price)}</p>

            <AddToCart product={product}/>

            {/* descripción */}
            <h3 className="font-light mb-5">{product.description}</h3>
        </>
    )
}
