function logger(message?: any, ...optionalParams: any[]): string|void {
    if (process.env.NODE_ENV === 'production') return;
    else console.log(message, ...optionalParams);
}

export default logger;
