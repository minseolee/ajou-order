import { io } from "socket.io-client";

import { SOCKET_URL } from "../utils/api";
import logger from "../utils/logger";


class Socket {
    private ioInstance = io(SOCKET_URL, { withCredentials: true });
	
    constructor() {
        this.ioInstance.on('connect', () => {
            logger('Connected to Socket.IO server');
        });
		
        this.ioInstance.on('auth', (e) => {
            logger('auth', e);
        });
    }
	
    onOrder(listener: (a: any) => void) {
        return this.ioInstance.on('order', listener);
    }
    
    disconnect() {
        this.ioInstance.disconnect();
    }
}

export default Socket;
