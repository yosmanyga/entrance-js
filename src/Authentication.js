import React, {useState} from 'react';
import PropTypes from 'prop-types';
import InputPhone from "./InputPhone";
import ConfirmPhone from "./ConfirmPhone";
import InputCode from "./InputCode";
import InputPassword from "./InputPassword";

const Authentication = ({
    ui, api, countries, onAuthenticate
}) => {
    const [step, setStep] = useState('input_phone'); // 'input_phone', 'confirm_phone', 'input_code', 'input_password'
    const [phone, setPhone] = useState({
        country: null,
        prefix: null,
        number: null
    });

    switch (step) {
        case 'input_phone':
            return <InputPhone
                ui={{
                    layout: ui.layouts.inputPhone,
                    icons: {
                        actions: {
                            expand: ui.icons.actions.expand
                        }
                    }
                }}
                phone={phone}
                countries={countries}
                onContinue={(phone, onInvalidNumber, onDenied) => {
                    const {country, prefix, number} = phone;

                    api.startAuthenticationWithPassword(
                        country,
                        prefix,
                        number,
                        // onReturn
                        () => {
                            setPhone({
                                country: country,
                                prefix: prefix,
                                number: number
                            });

                            setStep('input_password');
                        },
                        // onPhoneInvalidNumberException
                        () => {
                            onInvalidNumber();
                        },
                        // onUnsupportedAuthenticationException
                        () => {
                            setPhone({
                                country: country,
                                prefix: prefix,
                                number: number
                            });

                            setStep('confirm_phone');
                        },
                        // onDeniedAuthenticationException
                        () => {
                            onDenied();
                        },
                    )
                }}
            />;
        case 'confirm_phone':
            return <ConfirmPhone
                ui={{
                    layout: ui.layouts.confirmPhone,
                }}
                phone={phone}
                onContinue={(onDenied) => {
                    api.startAuthenticationWithCode(
                        phone.country,
                        phone.prefix,
                        phone.number,
                        // onReturn
                        () => {
                            setStep('input_code');
                        },
                        // onDenied
                        ({message}) => {
                            onDenied(message);
                        },
                    );
                }}
                onBack={() => {
                    setStep('input_phone');
                }}
            />;
        case 'input_code':
            return <InputCode
                ui={{
                    layout: ui.layouts.inputCode,
                    icons: {
                        objects: {
                            code: ui.icons.objects.code,
                        }
                    }
                }}
                phone={phone}
                onContinue={(code, onDeniedAuthentication) => {
                    api.completeAuthenticationWithCode(
                        phone.country,
                        phone.prefix,
                        phone.number,
                        code,
                        // onReturn
                        (credential) => {
                            onAuthenticate(credential);
                        },
                        // onDeniedAuthentication
                        ({message}) => {
                            onDeniedAuthentication(message);
                        },
                    )
                }}
                onBack={() => {
                    setStep('input_phone');
                }}
            />;
        case 'input_password':
            return <InputPassword
                ui={{
                    layout: ui.layouts.inputPassword,
                    icons: {
                        objects: {
                            password: ui.icons.objects.password,
                            help: ui.icons.objects.help,
                        }
                    }
                }}
                phone={phone}
                onContinue={(password, onDenied) => {
                    api.completeAuthenticationWithPassword(
                        phone.country,
                        phone.prefix,
                        phone.number,
                        password,
                        // onReturn
                        (credential) => {
                            onAuthenticate(credential);
                        },
                        // onDeniedAuthenticationException
                        ({message}) => {
                            onDenied(message);
                        },
                    )
                }}
                onBack={() => {
                    setStep('input_phone');
                }}
                onForgot={() => {
                    setStep('confirm_phone');
                }}
            />;
        default:
            throw `Invalid step ${step}`
    }
};

Authentication.propTypes = {
    ui: PropTypes.shape({
        layouts: PropTypes.shape({
            inputPhone: PropTypes.func.isRequired,
            confirmPhone: PropTypes.func.isRequired,
            inputCode: PropTypes.func.isRequired,
            inputPassword: PropTypes.func.isRequired,
        }).isRequired,
        icons: PropTypes.shape({
            actions: PropTypes.shape({
                expand: PropTypes.func.isRequired,
            }),
            objects: PropTypes.shape({
                code: PropTypes.func.isRequired,
                help: PropTypes.func.isRequired,
                password: PropTypes.func.isRequired,
            })
        }).isRequired,
    }).isRequired,
    api: PropTypes.shape({
        startAuthenticationWithPassword: PropTypes.func.isRequired,
        completeAuthenticationWithPassword: PropTypes.func.isRequired,
        startAuthenticationWithCode: PropTypes.func.isRequired,
        completeAuthenticationWithCode: PropTypes.func.isRequired,
    }).isRequired,
    countries: PropTypes.shape({
        favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
        more: PropTypes.bool.isRequired
    }).isRequired,
    onAuthenticate: PropTypes.func.isRequired, // (credential)
};

export default Authentication;