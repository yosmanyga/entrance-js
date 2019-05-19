import React from 'react';
import PropTypes from 'prop-types';
import InputPhone from "./InputPhone.block";
import ConfirmPhone from "./ConfirmPhone.block";
import InputCode from "./InputCode.block";
import InputPassword from "./InputPassword.block";

class Identification extends React.Component {
    static propTypes = {
        ui: PropTypes.shape({
            layout: PropTypes.func.isRequired,
            icons: PropTypes.shape({
                actions: PropTypes.shape({
                    continue: PropTypes.func.isRequired,
                    back: PropTypes.func.isRequired,
                    down: PropTypes.func.isRequired,
                }),
                objects: PropTypes.shape({
                    code: PropTypes.func.isRequired,
                    help: PropTypes.func.isRequired,
                    password: PropTypes.func.isRequired,
                })
            }).isRequired,
        }).isRequired,
        api: PropTypes.shape({
            appriseIdentification: PropTypes.func.isRequired,
            completeIdentificationWithCode: PropTypes.func.isRequired,
            completeIdentificationWithPassword: PropTypes.func.isRequired,
            startIdentificationWithCode: PropTypes.func.isRequired
        }).isRequired,
        countries: PropTypes.shape({
            favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
            all: PropTypes.bool.isRequired
        }).isRequired,
        country: PropTypes.string,
        number: PropTypes.string,
        onFinish: PropTypes.func.isRequired, // (credential)
        onProgress: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        if (this.props.country) {
            this.state = {
                ...this.state,
                country: this.props.country
            }
        }

        if (this.props.number) {
            this.state = {
                ...this.state,
                number: this.props.number
            }
        }
    }

    state = {
        step: 'input_phone', // 'input_phone', 'confirm_phone', 'input_code', 'input_password'
        phone: {
            country: null,
            prefix: null,
            number: null
        },
    };

    render() {
        switch (this.state.step) {
            case 'input_phone':
                return <InputPhone
                    ui={{
                        layout: ({input, buttons}) => {
                            return <this.props.ui.layout
                                title="Regístrate o accede a tu cuenta"
                            >
                                {input}
                                {buttons}
                            </this.props.ui.layout>;
                        },
                        icons: {
                            actions: {
                                down: this.props.ui.icons.actions.down,
                                continue: this.props.ui.icons.actions.continue,
                            }
                        }
                    }}
                    phone={this.state.phone}
                    countries={this.props.countries}
                    onFinish={(phone, onInvalidNumber) => {
                        const {country, prefix, number} = phone;

                        this.props.onProgress(
                            true,
                            () => {
                                this.props.api.appriseIdentification(
                                    country,
                                    prefix,
                                    number,
                                    // onReturn
                                    () => {
                                        this.props.onProgress(
                                            false,
                                            () => {
                                                this.setState({
                                                    phone: {
                                                        country: country,
                                                        prefix: prefix,
                                                        number: number
                                                    },
                                                    step: 'input_password',
                                                });
                                            }
                                        );
                                    },
                                    // onInvalidNumber
                                    () => {
                                        this.props.onProgress(
                                            false,
                                            () => {
                                                onInvalidNumber();
                                            }
                                        );
                                    },
                                    // onUnknownPhone
                                    () => {
                                        this.props.onProgress(
                                            false,
                                            () => {
                                                this.setState({
                                                    phone: {
                                                        country: country,
                                                        prefix: prefix,
                                                        number: number
                                                    },
                                                    step: 'confirm_phone',
                                                });
                                            }
                                        );
                                    },
                                    // onUnknownSession
                                    () => {
                                        this.props.onProgress(
                                            false,
                                            () => {
                                                this.setState({
                                                    phone: {
                                                        country: country,
                                                        prefix: prefix,
                                                        number: number
                                                    },
                                                    step: 'confirm_phone',
                                                });
                                            }
                                        );
                                    },
                                    // onNoPasswordPhone
                                    () => {
                                        this.props.onProgress(
                                            false,
                                            () => {
                                                this.setState({
                                                    phone: {
                                                        country: country,
                                                        prefix: prefix,
                                                        number: number
                                                    },
                                                    step: 'confirm_phone',
                                                });
                                            }
                                        );
                                    },
                                )
                            }
                        );
                    }}
                />;
            case 'confirm_phone':
                return <ConfirmPhone
                    ui={{
                        layout: ({info, error, buttons}) => {
                            return <this.props.ui.layout
                                title="Verifica tu número"
                            >
                                {info}
                                {error}
                                {buttons}
                            </this.props.ui.layout>;
                        },
                        icons: {
                            actions: {
                                continue: this.props.ui.icons.actions.continue,
                                back: this.props.ui.icons.actions.back,
                            }
                        }
                    }}
                    phone={this.state.phone}
                    onFinish={(onPhoneInvalidNumber, onExceededStarts) => {
                        this.props.onProgress(
                            true,
                            () => {
                                this.props.api.startIdentificationWithCode(
                                    this.state.phone.country,
                                    this.state.phone.prefix,
                                    this.state.phone.number,
                                    // onReturn
                                    () => {
                                        this.props.onProgress(
                                            false,
                                            () => {
                                                this.setState({
                                                    step: 'input_code',
                                                });
                                            }
                                        );
                                    },
                                    // onPhoneInvalidNumberException
                                    () => {
                                        this.props.onProgress(
                                            false,
                                            () => {
                                                onPhoneInvalidNumber();
                                            }
                                        );
                                    },
                                    // onVerificationExceededStartsException
                                    () => {
                                        this.props.onProgress(
                                            false,
                                            () => {
                                                onExceededStarts();
                                            }
                                        );
                                    },
                                );
                            }
                        );
                    }}
                    onBack={() => {
                        this.setState({
                            step: 'input_phone',
                        });
                    }}
                />;
            case 'input_code':
                return <InputCode
                    ui={{
                        layout: ({info, input, error, buttons}) => {
                            return <this.props.ui.layout
                                title="Escribe el código de verificación"
                            >
                                {info}
                                {input}
                                {error}
                                {buttons}
                            </this.props.ui.layout>;
                        },
                        icons: {
                            actions: {
                                continue: this.props.ui.icons.actions.continue,
                                back: this.props.ui.icons.actions.back,
                            },
                            objects: {
                                code: this.props.ui.icons.objects.code,
                            }
                        }
                    }}
                    phone={this.state.phone}
                    onFinish={(code, onAttemptExceededCompletes, onWrongValueException) => {
                        this.props.onProgress(
                            true,
                            () => {
                                this.props.api.completeIdentificationWithCode(
                                    this.state.phone.country,
                                    this.state.phone.prefix,
                                    this.state.phone.number,
                                    code,
                                    // onReturn
                                    (credential) => {
                                        this.props.onProgress(
                                            false,
                                            () => {
                                                this.props.onFinish(credential);
                                            }
                                        );
                                    },
                                    // onVerificationAttemptExceededCompletesException
                                    () => {
                                        this.props.onProgress(
                                            false,
                                            () => {
                                                onAttemptExceededCompletes();
                                            }
                                        );
                                    },
                                    // onVerificationCodeWrongValueException
                                    () => {
                                        this.props.onProgress(
                                            false,
                                            () => {
                                                onWrongValueException();
                                            }
                                        );
                                    },
                                )
                            }
                        );
                    }}
                    onBack={() => {
                        this.setState({
                            step: 'input_phone',
                        });
                    }}
                />;
            case 'input_password':
                return <InputPassword
                    ui={{
                        layout: ({info, input, error, buttons}) => {
                            return <this.props.ui.layout
                                title="Accede usando tu pin"
                            >
                                {info}
                                {input}
                                {error}
                                {buttons}
                            </this.props.ui.layout>;
                        },
                        icons: {
                            actions: {
                                continue: this.props.ui.icons.actions.continue,
                                back: this.props.ui.icons.actions.back,
                            },
                            objects: {
                                password: this.props.ui.icons.objects.password,
                                help: this.props.ui.icons.objects.help,
                            }
                        }
                    }}
                    phone={this.state.phone}
                    onFinish={(password, onInvalidPassword) => {
                        this.props.onProgress(
                            true,
                            () => {
                                if (!password) {
                                    this.props.onProgress(
                                        false,
                                        () => {
                                            onInvalidPassword();
                                        }
                                    );

                                    return;
                                }

                                this.props.api.completeIdentificationWithPassword(
                                    this.state.phone.country,
                                    this.state.phone.prefix,
                                    this.state.phone.number,
                                    password,
                                    // onReturn
                                    (credential) => {
                                        this.props.onProgress(
                                            false,
                                            () => {
                                                this.props.onFinish(credential);
                                            }
                                        );
                                    },
                                    // onInvalidPassword
                                    () => {
                                        this.props.onProgress(
                                            false,
                                            () => {
                                                onInvalidPassword();
                                            }
                                        );
                                    },
                                )
                            }
                        );
                    }}
                    onBack={() => {
                        this.setState({
                            step: 'input_phone'
                        });
                    }}
                    onForgot={() => {
                        this.setState({
                            step: 'confirm_phone'
                        });
                    }}
                />;
            default:
                throw `Invalid step ${this.state.step}`
        }
    }
}

export default Identification;