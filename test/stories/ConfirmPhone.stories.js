import React from 'react';
import {storiesOf} from '@storybook/react';
import Check from '@material-ui/icons/Check';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
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
        selected: RadioButtonChecked,
        unselected: RadioButtonUnchecked,
    }
};

const country = {
    iso: "CU",
    prefix: "53",
    name: "Cuba"
};

const number = "53377172";

storiesOf('ConfirmPhone', module)
    .add('default', () => (
        <Root theme={theme}>
            <ConfirmPhone
                ui={ui}
                country={country}
                number={number}
                onFinish={() => {
                }}
            />
        </Root>
    ));

storiesOf('ConfirmPhone', module)
    .add('with error', () => (
        <Root theme={theme}>
            <ConfirmPhone
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