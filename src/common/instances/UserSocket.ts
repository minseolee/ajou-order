import { io } from "socket.io-client";

import { SOCKET_URL } from "../utils/api";
import logger from "../utils/logger";

import type { Socket } from "socket.io-client";


class UserSocket {
    private ioInstance: Socket|null;
	
    constructor() {
        this.ioInstance = io(SOCKET_URL + '/ws', {
            withCredentials: true
        });
        logger('userSocket created', this.ioInstance);
        
        this.ioInstance.on('connect', () => {
            logger('Connected to Socket.IO server');
        });
		
        this.ioInstance.on('auth', (e) => {
            logger('auth', e);
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

export default UserSocket;
