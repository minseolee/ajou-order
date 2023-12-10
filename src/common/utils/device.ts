const DEVICE = Object.freeze({
    MOBILE: 'MOBILE',
    PC: 'PC'
});

function detectDeviceType() {
    const ua = navigator.userAgent;
	
    if (/Mobi|Android/i.test(ua)) {
        return DEVICE.MOBILE;
    } else {
        return DEVICE.PC;
    }
}


export { DEVICE, detectDeviceType };
