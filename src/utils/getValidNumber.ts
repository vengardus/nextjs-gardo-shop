export const getValidNumber = (value:any, minValue=1) => {
    let valueAux = value?? minValue
    valueAux = isNaN(Number(valueAux))? minValue : Number(valueAux)
    
    return (valueAux<minValue)? minValue : valueAux
}