const FETCH_METHOD = Object.freeze({
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE'
} as const);

const RESPONSE_STATUS = Object.freeze({
    OK: 200,
    UNAUTH: 401
});

type FetchMethod = typeof FETCH_METHOD[keyof typeof FETCH_METHOD];

const DEV_API_URL = 'http://localhost:8080';
const PROD_API_URL = 'https://ajou-eats-api.seunglab.dev';

const DEV_SOCKET_URL = 'ws://localhost:8080';
const PROD_SOCKET_URL = 'wss://ajou-eats-api.seunglab.dev/api';

// const API_URL = process.env.NODE_ENV === 'production' ? PROD_API_URL : DEV_API_URL;
const API_URL = PROD_API_URL;
// const SOCKET_URL = process.env.NODE_ENV === 'production' ? PROD_SOCKET_URL : DEV_SOCKET_URL;
const SOCKET_URL = PROD_SOCKET_URL;

/**
 * @name fetchData
 * @param url
 * @param method
 * @param payload
 * @description for body
 */
async function fetchData<T> (
    url: string, method: FetchMethod,
    payload?: any,
): Promise<{
    status: number, response: T
}> {
    let request;
    let response;
    let status;
	
    try {
        request = await fetch(`/api${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(payload)
        });
        status = request.status;
        response = await request.json() as T;
    } catch (e) {
        console.error(e);
        throw e;
    }
	
    return { status, response };
}

export { fetchData, FETCH_METHOD, RESPONSE_STATUS, SOCKET_URL };
