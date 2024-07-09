import { ProductDetail } from "@/components/product/detail-product/ProductDetail"
import { ProductMobileSlideShow } from "@/components/product/slide-show/ProductMobileSlideShow"
import { ProductSlideShow } from "@/components/product/slide-show/ProductSlideShow"
import { IProduct } from "@/interfaces/product.interface"

interface Props {
  product: IProduct,
}

export const ProductMain = ({ product }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-0">

      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile Slideshow */}
        <ProductMobileSlideShow
          images={product.images}
          title={product.title}
          className={'block md:hidden'}
        />

        {/* Desktop Slideshow */}
        <ProductSlideShow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>

      {/* Detalle Producto */}
      <div className="col-span1">
        <ProductDetail
          product={product}
        />
      </div>
    </div>
  )
}
