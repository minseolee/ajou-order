import { io } from "socket.io-client";

import { SOCKET_URL } from "../utils/api";
import logger from "../utils/logger";

import type { Socket } from "socket.io-client";


class AdminSocket {
    private ioInstance: Socket|null;
	
    constructor() {
        this.ioInstance = io(`${SOCKET_URL}/api`, {
            path: '/admin',
            withCredentials: true
        });
        logger('adminSocket created', this.ioInstance);
        
        this.ioInstance.on('connect', () => {
            logger('WS: admin connected');
        });
		
        this.ioInstance.on('auth', (e) => {
            logger('WS: admin auth', e);
        });
    }
	
    onOrder(listener: (a: any) => void) {
        return this.ioInstance?.on('order', listener);
    }
	
    disconnect() {
        this.ioInstance?.disconnect();
        this.ioInstance = null;
    }
}

export default AdminSocket;
