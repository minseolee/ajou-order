import { io } from "socket.io-client";

import { SOCKET_URL } from "../utils/api";
import logger from "../utils/logger";


class AdminSocket {
    private ioInstance = io(`${SOCKET_URL}/admin`, { withCredentials: true });
	
    constructor() {
        this.ioInstance.on('connect', () => {
            logger('WS: admin connected');
        });
		
        this.ioInstance.on('auth', (e) => {
            logger('WS: admin auth', e);
        });
    }
	
    onOrder(listener: (a: any) => void) {
        return this.ioInstance.on('order', listener);
    }
	
    disconnect() {
        this.ioInstance.disconnect();
    }
}

export default AdminSocket;
