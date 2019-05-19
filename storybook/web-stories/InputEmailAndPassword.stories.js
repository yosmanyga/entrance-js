import React from 'react';
import {EmptyLayout} from "@yosmy/ui";
import icons from "../_Icons";

import InputEmailAndPassword from '../InputEmailAndPassword';

export default {
    title: 'InputEmailAndPassword',
    component: InputEmailAndPassword,
};

const common = {
    ui: {
        layout: ({input, buttons}) => {
            return <EmptyLayout>
                {input}
                {buttons.continue}
                {buttons.forgot}
            </EmptyLayout>
        },
        texts: {
            placeholder: {
                email: "Email",
                password: "Password"
            },
            button: {
                continue: "Login",
                forgot: "Forgot password?",
            }
        },
        icons: {
            objects: {
                email: icons.objects.email,
                password: icons.objects.password,
            },
        }
    },
    onContinue: (email, password) => {
        console.log(email, password)
    },
    onForgot: () => {}
};

const Template = () => {
    return <InputEmailAndPassword
        {...common}
    />
};

export const Default = Template.bind({});

