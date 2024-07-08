import { dataApp } from "@/config/configApp"
import Image from "next/image"

interface Props {
    src?: string
    alt: string
    /*
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style']
    */
    className?: React.HTMLAttributes<HTMLImageElement>['className']
    style?: React.CSSProperties
    width: number
    height: number
    priority?: boolean
    /*
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    */
    onMouseEnter?: React.MouseEventHandler<HTMLImageElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLImageElement>;
}

export const ProductImage = ({
    src,
    alt,
    className,
    style,
    width,
    height,
    priority = false,
    onMouseEnter,
    onMouseLeave
}: Props) => {

    const customSrc = (src)
        ? src.startsWith('http')
            ? src
            : `/products/${src}`
        : `/imgs/placeholder.jpg`

    const isPriority = dataApp.imagesLCPToPriority.some(image => customSrc.includes(image)) ? true : false 


    return (
        <Image
            src={customSrc}
            alt={alt}
            width={width}
            height={height}
            className={className ?? ''}
            style={style ?? { width: 'auto', height: 'auto' }}
            priority={isPriority}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    )
}
