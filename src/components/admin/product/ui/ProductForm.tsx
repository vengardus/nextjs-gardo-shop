"use client";

import { useForm } from "react-hook-form";

import { Select } from "@/components/ui/select/Select";

import type { IDataSelect } from "@/interfaces/app/data-select.interface";
import type { Gender, IProduct, Size } from "@/interfaces/product.interface";
import { dataApp } from "@/config/configApp";
import Image from "next/image";
import clsx from "clsx";
import { array } from "zod";

interface Props {
    product: IProduct | null;
    data: {
        dataSelectCategories: IDataSelect[]
    }
}

//const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const sizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
    title: string
    slug: string
    description: string
    price: number
    inStock: number
    sizes: Size[]
    tags: string[]
    gender: Gender
    categoryId: string

    // todo: Images
}

export const ProductForm = ({ product, data }: Props) => {
    const { dataSelectCategories } = data
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { isValid }
    } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            sizes: product?.sizes ?? [],
            tags: product?.tags,
            categoryId: product?.category_id

            // toto: Images
        }
    })

    // refrescar values useForm si cambia sizes
    watch('sizes')

    const onCategoryChanged = (value: string) => {
        console.log('new category', value)
    }

    const onSizeChanged = (size: Size) => {
        const newSizes = new Set(getValues('sizes'))
        newSizes.has(size)? newSizes.delete(size): newSizes.add(size)
        setValue('sizes', Array.from(newSizes))
    }

    const onSubmit = async (data: FormInputs) => {
        console.log(data)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
        >
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('title', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('slug', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('description', { required: true })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input
                        type="number"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('price', { required: true, min: 0 })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('tags', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <Select
                        id="gender"
                        data={dataApp.gender}
                        register={register}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoría</span>
                    <Select
                        id="categoryId"
                        data={dataSelectCategories}
                        onChange={onCategoryChanged}
                        register={register}
                    />
                </div>

                <button className="btn-primary w-full">
                    Guardar
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                {/* As checkboxes */}
                <div className="flex flex-col">

                    <span>Tallas</span>
                    <div className="flex flex-wrap">

                        {
                            sizes.map(size => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div
                                    key={size}
                                    className={clsx(
                                        "flex  items-center justify-center w-10 h-10 mr-2 border rounded-md",
                                        {
                                            'bg-blue-500 text-white': getValues('sizes').includes(size)
                                        }
                                    )}
                                    onClick={() => onSizeChanged(size)}
                                >
                                    <span>{size}</span>
                                </div>
                            ))
                        }

                    </div>


                    <div className="flex flex-col mb-2">

                        <span>Fotos</span>
                        <input
                            type="file"
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg"
                        />

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {
                            product?.ProductImage.map(image => (
                                <div key={image.id}>
                                    <Image
                                        src={`/products/${image.url}`}
                                        alt={product.title}
                                        width={300}
                                        height={300}
                                        className="rounded-t shadow-md"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => console.log(image.id, image.url)}
                                        className="btn-danger w-full rounded"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))
                        }

                    </div>

                </div>
            </div>
        </form>
    );
};