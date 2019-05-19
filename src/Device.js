import Platform from "@yosmy/platform";

const saveDevice = async (device) => {
    await Platform.secure.set("device", device)
};

const getDevice = async () => {
    const device = await Platform.secure.get("device");

    if (typeof device === "undefined") {
        return false;
    }

    return device;
}

const deleteDevice = async () => {
    await Platform.secure.delete("device")
};

const getDeviceData = async () => {
    let data = await Promise.all([
        Platform.application.raw(),
        Platform.cellular.raw(),
        Platform.device.raw(),
        Platform.network.raw(),
    ]);

    data = JSON.stringify({
        application: data[0],
        cellular: data[1],
        device: data[2],
        network: data[3],
    })

    return data;
};

export {
    saveDevice,
    getDevice,
    deleteDevice,
    getDeviceData,
};