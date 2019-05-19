import React from 'react';
import {EmptyLayout} from "@yosmy/ui";
import icons from "../_Icons";

import InputCode from '../InputCode';

export default {
    title: 'InputCode',
    component: InputCode,
};

const common = {
    ui: {
        layout: ({input, error, buttons}) => {
            return <EmptyLayout>
                {input}
                {error}
                {buttons}
            </EmptyLayout>
        },
        icons: {
            objects: {
                code: icons.objects.code
            },
        }
    },
    phone: {
        country: "US",
        prefix: "1",
        number: "7867861234"
    },
    onContinue: (code, onDeniedAuthentication) => {
        console.log(code)
    },
    onBack: () => {
        console.log("back")
    }
};

const Template = ({...props}) => {
    return <InputCode
        {...common}
        {...props}
    />
};

export const Default = Template.bind({});

export const OnDeniedAuthentication = Template.bind({});
OnDeniedAuthentication.args = {
    onContinue: (code, onDeniedAuthentication) => {
        onDeniedAuthentication("An error message");
    }
}
