import React from 'react';
import {EmptyLayout} from "@yosmy/ui";
import icons from "../_Icons";

import InputPhone from '../InputPhone';

export default {
    title: 'InputPhone',
    component: InputPhone,
};

const common = {
    ui: {
        layout: ({input, buttons}) => {
            return <EmptyLayout>
                {input}
                {buttons}
            </EmptyLayout>
        },
        icons: {
            actions: {
                expand: icons.actions.expand
            },
        }
    },
    countries: {
        favorites: ["CU", "US", "ES", "MX", "EC"],
        more: true
    },
    onContinue: (phone, onInvalidNumber) => {
        console.log(phone)
    }
};

const Template = () => {
    return <InputPhone
        {...common}
    />
};

export const Default = Template.bind({});

export const OnInvalidNumber = Template.bind({});
OnInvalidNumber.args = {
    onContinue: (phone, onInvalidNumber) => {
        onInvalidNumber();
    }
}
