// @refresh reset

import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Container, Icon, Input, Text} from "@yosmy/ui";

const InputEmailAndPassword = React.memo(({
    ui, onContinue, onForgot
}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [execution, setExecution] = useState({
        error: null,
        progress: false
    });

    const handleSubmit = () => {
        setExecution({
            error: null,
            progress: true
        });

        try {
            onContinue(
                email,
                password,
            )
        } catch ({message}) {
            setExecution({
                error: message,
                progress: false
            });
        }
    }

    const input = <>
        <Input
            value={email}
            placeholder={ui.texts.placeholder.email}
            start={<Container
                flow="row"
                align={{
                    main: "center",
                    cross: "center"
                }}
                padding={1}
            >
                <Icon
                    data={ui.icons.objects.email}
                />
            </Container>}
            onChange={(value) => {
                setEmail(value);
            }}
            onEnter={handleSubmit}
        />
        <Input
            margin={{
                top: 2
            }}
            value={password}
            placeholder={ui.texts.placeholder.password}
            start={<Container
                flow="row"
                align={{
                    main: "center",
                    cross: "center"
                }}
                padding={1}
            >
                <Icon
                    data={ui.icons.objects.password}
                />
            </Container>}
            onChange={(value) => {
                setPassword(value);
            }}
            onEnter={handleSubmit}
        />
        {execution.error && <Text
            type="error"
            margin={{
                top: 2
            }}
        >
            {execution.error}
        </Text>}
    </>

    const buttons = {
        continue: <Button
            type="primary"
            progress={execution.progress}
            disabled={execution.progress}
            onClick={handleSubmit}
        >
            <Text>{ui.texts.button.continue}</Text>
        </Button>,
        forgot: <Button
            type="tertiary"
            onClick={onForgot}
        >
            <Text>{ui.texts.button.forgot}</Text>
        </Button>
    };

    return <ui.layout
        progress={execution.progress}
        input={input}
        buttons={buttons}
    />;
}, () => {
    return true;
});

InputEmailAndPassword.propTypes = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired, // ({input, buttons}),
        texts: PropTypes.shape({
            placeholder: PropTypes.shape({
                email: PropTypes.string.isRequired,
                password: PropTypes.string.isRequired,
            }).isRequired,
            button: PropTypes.shape({
                continue: PropTypes.string.isRequired,
                forgot: PropTypes.string.isRequired,
            }).isRequired,
        }),
        icons: PropTypes.shape({
            objects: PropTypes.shape({
                email: PropTypes.func.isRequired,
                password: PropTypes.func.isRequired,
            })
        }).isRequired,
    }),
    /**
     * Fires when the Continue button is hit
     */
    onContinue: PropTypes.func.isRequired, // (email, password)
    onForgot: PropTypes.func.isRequired, // ()
};

export default InputEmailAndPassword;