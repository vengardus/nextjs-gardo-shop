import { labelGender } from "@/config/configApp"

export const isValidGender = (gender:string):Boolean => {
    return labelGender.hasOwnProperty(gender) 
}