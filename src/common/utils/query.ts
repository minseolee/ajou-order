function getQueryStrings(search: string, str: string): string {
    const queryStrings: any = {};
    const urlParams = new URLSearchParams(search);
    urlParams.forEach((value, key) => {
        queryStrings[key] = value;
    });
    return queryStrings[str];
}

export { getQueryStrings };
