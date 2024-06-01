import { labelCategory } from "@/config/configApp"

export const isValidCategory = (id:string):Boolean => {
    return labelCategory.hasOwnProperty(id) 
}