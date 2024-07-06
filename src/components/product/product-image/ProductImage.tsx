import Image from "next/image"

interface Props {
    src?: string
    alt: string
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style']
    width: number
    height: number
    priority?: boolean
}

export const ProductImage = ({
    src,
    alt,
    className,
    style,
    width,
    height,
    priority=false
}: Props) => {

    const customSrc = (src)
        ? src.startsWith('http')
            ? src
            : `/products/${src}`
        : `/imgs/placeholder.jpg`

    return (
        <Image
            src={customSrc}
            alt={alt}
            width={width}
            height={height}
            className={className ?? ''}
            style={style ?? {}}
            priority={priority}
        />
    )
}
