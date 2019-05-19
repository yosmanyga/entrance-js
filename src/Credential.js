import Platform from "@yosmy/platform";

const saveCredential = async (credential) => {
    await Platform.secure.set("credential", credential)
};

const getCredential = async () => {
    const credential = await Platform.secure.get("credential");

    if (typeof credential === "undefined") {
        return false;
    }

    return credential;
}

const deleteCredential = async () => {
    await Platform.secure.delete("credential")
};

export {
    saveCredential,
    getCredential,
    deleteCredential
}