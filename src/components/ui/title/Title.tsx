import { titleFont } from "@/config/fonts"

interface Props {
    title: string,
    subTitle?: string,
    className?: string
}


export const Title = ({ title, subTitle, className }: Props) => {
    return (
        <div className={`mt-2 {className}`}>
            <h1 className={`${titleFont.className} antialiased text-2xl sm:text-4xl font-semibold`}>
                {title}
            </h1>

            {
                subTitle &&
                <h3 className="text-xl">
                    {subTitle}
                </h3>
            }
        </div>
    )
}
