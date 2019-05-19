import Authentication from './Authentication';
import ConfirmPhone from './ConfirmPhone';
import InputCode from './InputCode';
import InputEmailAndPassword from './InputEmailAndPassword';
import InputPassword from './InputPassword';
import InputPhone from './InputPhone';
import {saveCredential, getCredential, deleteCredential} from './Credential';
import {saveDevice, getDevice, deleteDevice, getDeviceData} from './Device';

export {
    Authentication,
    ConfirmPhone,
    InputCode,
    InputEmailAndPassword,
    InputPassword,
    InputPhone,
    saveCredential, getCredential, deleteCredential,
    saveDevice, getDevice, deleteDevice, getDeviceData
};