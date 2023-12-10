import { FETCH_METHOD, fetchData, RESPONSE_STATUS } from "../utils/api";

import type { Dispatch, SetStateAction } from "react";

type LoginInstance = Dispatch<SetStateAction<boolean>>;

class Connector {
    private setLoginInstance: LoginInstance;
    private isAdmin = false;
    private randomUuid = Math.random();
    
    constructor(setLogin: LoginInstance) {
        this.setLoginInstance = setLogin;
    }
    
    setIsAdmin(b: boolean) {
        this.isAdmin = b;
    }
    
    getIsAdmin() {
        return this.isAdmin;
    }
    
    private checkSession(status: number) {
        if (status === RESPONSE_STATUS.UNAUTH) {
            this.setLoginInstance(false);
            window.location.href = '/login';
        }
    }
    
    async login<T>(payload?: any): Promise<T> {
        const postRequest = await fetchData<T>('/user/login', FETCH_METHOD.POST, payload);
        if (postRequest.status === RESPONSE_STATUS.OK) {
            this.setLoginInstance(true);
        }
        return postRequest.response;
    }
    
    async logout(): Promise<void> {
        this.setLoginInstance(false);
        await fetchData('/user/logout', FETCH_METHOD.GET);
    }
	
    async get<T>(url: string, payload?: any): Promise<T> {
        const getRequest = await fetchData<T>(url, FETCH_METHOD.GET, payload);
        this.checkSession(getRequest.status);
        return getRequest.response;
    }
	
    async post<T>(url: string, payload?: any): Promise<T> {
        const postRequest = await fetchData<T>(url, FETCH_METHOD.POST, payload);
        this.checkSession(postRequest.status);
        return postRequest.response;
    }
    
    async patch<T>(url: string, payload?: any): Promise<T> {
        const patchRequest = await fetchData<T>(url, FETCH_METHOD.PATCH, payload);
        this.checkSession(patchRequest.status);
        return patchRequest.response;
    }
}

export default Connector;
