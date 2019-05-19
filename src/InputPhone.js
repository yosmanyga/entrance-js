// @refresh reset

import React, {useState} from "react";
import PropTypes from "prop-types";
import {build} from "@yosmy/phone-build";
import {Button, Container, CountryPicker, Input, Text} from "@yosmy/ui";

const InputPhone = React.memo(({
    ui, phone: initialPhone, countries, onContinue
}) => {
    const [phone, setPhone] = useState(initialPhone || {
        country: null,
        prefix: null,
        number: null
    });

    const [execution, setExecution] = useState({
        error: null,
        progress: false
    });

    const handleSubmit = () => {
        if (!phone.country) {
            setExecution({
                error: "Selecciona el país",
                progress: false
            });

            return;
        }

        if (!phone.number) {
            setExecution({
                error: "Escribe el número de teléfono",
                progress: false
            });

            return;
        }

        let builtPhone;

        try {
            builtPhone = build(phone.number, phone.country);
        } catch (e) {
            setExecution({
                error: "El número es incorrecto. Verifícalo",
                progress: false
            });

            return;
        }

        setExecution({
            error: null,
            progress: true
        });

        onContinue(
            builtPhone,
            // onInvalidNumber
            () => {
                setExecution({
                    error: "El número es incorrecto. Verifícalo",
                    progress: false
                });
            }
        )
    }

    const input = <Container
        align={{
            cross: "center"
        }}
        margin={{
            top: 1
        }}
    >
        <CountryPicker
            ui={{
                icons: {
                    actions: {
                        expand: ui.icons.actions.expand
                    }
                }
            }}
            messages={{
                select: "País"
            }}
            country={phone.country}
            favorites={countries.favorites}
            more={countries.more}
            onSelect={({country, prefix}) => {
                setExecution({
                    error: null,
                    progress: false
                });

                setPhone((prev) => {
                    return {
                        ...prev,
                        country: country,
                        prefix: prefix,
                    };
                });
            }}
        />
        <Input
            value={phone.number}
            keyboard="number"
            placeholder="Teléfono"
            start={phone.prefix && <Text>
                +{phone.prefix}
            </Text>}
            margin={{
                top: 2
            }}
            onChange={(value) => {
                setExecution({
                    error: null,
                    progress: false
                });

                setPhone((prev) => {
                    return {
                        ...prev,
                        number: value,
                    };
                });
            }}
            onEnter={handleSubmit}
        />
        {execution.error !== null ? <Text
            type="error"
            margin={{
                top: 2
            }}
        >
            {execution.error}
        </Text> : null}
    </Container>;

    const buttons = <Container
        flow="row wrap"
        align={{
            main: "center"
        }}
        margin={{
            top: 2
        }}
    >
        <Button
            type="primary"
            progress={execution.progress}
            disabled={execution.progress}
            onClick={handleSubmit}
        >
            <Text>Continuar</Text>
        </Button>
    </Container>;

    return <ui.layout
        progress={execution.progress}
        input={input}
        buttons={buttons}
    />;
}, () => {
    return true;
});

InputPhone.propTypes = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired, // ({input, buttons}),
        icons: PropTypes.shape({
            actions: PropTypes.shape({
                expand: PropTypes.func.isRequired,
            })
        }).isRequired,
    }),
    countries: PropTypes.shape({
        favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
        more: PropTypes.bool.isRequired
    }).isRequired,
    phone: PropTypes.shape({
        country: PropTypes.string,
        prefix: PropTypes.string,
        number: PropTypes.string,
    }),
    onContinue: PropTypes.func.isRequired, // (phone, onInvalidNumber)
};

export default InputPhone;