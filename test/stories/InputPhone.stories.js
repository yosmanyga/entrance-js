import React from 'react';
import {storiesOf} from '@storybook/react';
import InputPhone from "../../src/InputPhone.block";
import Check from '@material-ui/icons/Check';
import {Container, Root} from '@yosmy/ui';

const theme = {
    spacing: {
        unit: 1
    },
};

const ui = {
    layout: ({info, input, buttons}) => {
        return <Container center>
            {info}
            {input}
            {buttons}
        </Container>;
    },
    icons: {
        ok: Check,
    }
};

const country = {
    iso: "CU",
    prefix: "53",
    name: "Cuba"
};

const number = "53377172";

storiesOf('InputPhone', module)
    .add('default', () => (
        <Root theme={theme}>
            <InputPhone
                ui={ui}
                country={country}
                number={number}
                onFinish={() => {
                }}
            />
        </Root>
    ));

storiesOf('InputPhone', module)
    .add('with error', () => (
        <Root theme={theme}>
            <InputPhone
                ui={ui}
                country={country}
                number={number}
                onFinish={(country, prefix, number) => {
                    return new Promise((resolve, reject) => {
                        reject("El numero es incorrecto");
                    });
                }}
            />
        </Root>
    ));