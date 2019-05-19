// @refresh reset

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Container, Text} from '@yosmy/ui';
import {Phone} from '@yosmy/phone';

const ConfirmPhone = React.memo(({
    ui, phone, onContinue, onBack
}) => {
    const [execution, setExecution] = useState({
        error: null,
        progress: false
    });

    const handleSubmit = () => {
        setExecution({
            error: null,
            progress: true
        });

        onContinue(
            // onDenied
            (message) => {
                setExecution({
                    error: message,
                    progress: false
                });
            },
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
                margin={{
                    left: 1
                }}
                progress={execution.progress}
                disabled={execution.progress}
                onClick={handleSubmit}
            >
                <Text>Sí, es correcto</Text>
            </Button>
        </Container>}
    />;
}, () => {
    return true;
});

ConfirmPhone.propTypes = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired, // (phone, error, buttons),
    }),
    phone: PropTypes.shape({
        country: PropTypes.string.isRequired,
        prefix: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,
    onContinue: PropTypes.func.isRequired, // (onDenied)
    onBack: PropTypes.func.isRequired, // ()
};

export default ConfirmPhone;