// @refresh reset

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Container, Icon, Input, Text} from '@yosmy/ui';
import {Phone} from '@yosmy/phone';

const InputCode = React.memo(({
    ui, phone, onContinue, onBack
}) => {
    const [code, setCode] = useState(null);

    const [execution, setExecution] = useState({
        error: null,
        progress: false
    });

    const handleSubmit = () => {
        if (!code) {
            setExecution({
                error: 'Escribe el código de verificación',
                progress: false
            });

            return;
        }

        setExecution({
            error: null,
            progress: true
        });

        onContinue(
            code,
            // onDeniedAuthentication
            (message) => {
                setExecution({
                    error: message,
                    progress: false
                });

                setCode(null);
            }
        )
    }

    return <ui.layout
        progress={execution.progress}
        phone={<Phone
            country={phone.country}
            prefix={phone.prefix}
            number={phone.number}
            humanized
        />}
        input={<Container
            align={{
                cross: "center"
            }}
        >
            <Input
                start={<Icon data={ui.icons.objects.code} />}
                value={code}
                keyboard='number'
                focus
                margin={{
                    // top: 2
                }}
                // width={200}
                onChange={(value) => {
                    setExecution({
                        error: null,
                        progress: false
                    });

                    setCode(value);
                }}
                onEnter={handleSubmit}
            />
        </Container>}
        error={execution.error && <Text
            type="error"
            margin={{
                top: 2
            }}
        >
            {execution.error}
        </Text>}
        buttons={<Container
            flow="row"
            align={{
                main: "center",
                cross: "center"
            }}
            margin={{
                top: 2
            }}
        >
            <Button
                type="secondary"
                disabled={execution.progress}
                onClick={onBack}
            >
                <Text>Regresar</Text>
            </Button>
            <Button
                type="primary"
                progress={execution.progress}
                disabled={execution.progress}
                margin={{
                    left: 1
                }}
                onClick={handleSubmit}
            >
                <Text>Continuar</Text>
            </Button>
        </Container>}
    />
}, () => {
    return true;
});

InputCode.propTypes = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired, // ({info, input, error, buttons}),
        icons: PropTypes.shape({
            objects: PropTypes.shape({
                code: PropTypes.func.isRequired,
            })
        }).isRequired,
    }).isRequired,
    phone: PropTypes.shape({
        country: PropTypes.string.isRequired,
        prefix: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,
    onContinue: PropTypes.func.isRequired, // (code, onDeniedAuthentication)
    onBack: PropTypes.func.isRequired, // ()
}

export default InputCode;