// @refresh reset

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Container, Icon, Input, Text} from '@yosmy/ui';

// @refresh reset

const InputPassword = React.memo(({
   ui, onContinue, onForgot, onBack
}) => {
    const [password, setPassword] = useState(null);
    
    const [execution, setExecution] = useState({
        error: null,
        progress: false
    });

    const handleSubmit = () => {
        if (!password) {
            setExecution({
                error: 'Escribe el pin',
                progress: false
            });

            return;
        }

        setExecution({
            error: null,
            progress: true
        });

        onContinue(
            password,
            // onDenied
            (message) => {
                setExecution({
                    error: message,
                    progress: false
                });

                setPassword(null);
            }
        )
    };
    
    return <ui.layout
        progress={execution.progress}
        info={<Container
            align={{
                cross: "center"
            }}
        >
            {/*<Phone*/}
            {/*    country={phone.country}*/}
            {/*    prefix={phone.prefix}*/}
            {/*    number={phone.number}*/}
            {/*    humanized*/}
            {/*/>*/}
        </Container>}
        input={<Container
            align={{
                cross: "center"
            }}
        >
            <Input
                start={<Icon
                    data={ui.icons.objects.password}
                />}
                value={password}
                placeholder="Pin"
                keyboard='number'
                secure
                focus
                margin={{
                    // top: 2
                }}
                width={200}
                onChange={(value) => {
                    setExecution({
                        error: null,
                        progress: false
                    });

                    setPassword(value);
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
            margin={{
                top: 2
            }}
        >
            <Container
                flow="row"
                align={{
                    main: "center",
                    cross: "center"
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
                    <Text>Continuar</Text>
                </Button>
            </Container>
            <Container
                flow="row wrap"
                align={{
                    main: "center",
                    cross: "flex-start"
                }}
                margin={{
                    top: 2
                }}
            >
                <Button
                    type="tertiary"
                    disabled={execution.progress}
                    onClick={onForgot}
                >
                    <Text>Olvidé mi pin</Text>
                </Button>
            </Container>
        </Container>}
    />
}, () => {
    return true;
});

InputPassword.propTypes = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired, // (info, input, error, buttons),
        icons: PropTypes.shape({
            objects: PropTypes.shape({
                password: PropTypes.func.isRequired,
            })
        }).isRequired,
    }).isRequired,
    phone: PropTypes.shape({
        country: PropTypes.string.isRequired,
        prefix: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,
    onContinue: PropTypes.func.isRequired, // (password, onDenied)
    onBack: PropTypes.func.isRequired, // ()
    onForgot: PropTypes.func.isRequired, // ()
};

export default InputPassword;