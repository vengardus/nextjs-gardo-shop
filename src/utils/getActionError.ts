export const getActionError = (error: any): string => {
    let message = "";

    if (error instanceof Error) {
        // Aquí sabemos que `error` es una instancia de Error
        message = error.message;
        console.error(error.message);
    } else {
        message = "Ocurrió algún error";
        console.error(`${message}:${error}`);
    }
    return message;
};
