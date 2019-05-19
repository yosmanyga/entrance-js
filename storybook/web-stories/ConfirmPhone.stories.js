import React from 'react';
import {EmptyLayout} from "@yosmy/ui";

import ConfirmPhone from '../ConfirmPhone';

export default {
    title: 'ConfirmPhone',
    component: ConfirmPhone,
};

const common = {
    ui: {
        layout: ({info, error, buttons}) => {
            return <EmptyLayout>
                {info}
                {error}
                {buttons}
            </EmptyLayout>
        },
    },
    phone: {
        country: "US",
        prefix: "1",
        number: "7867861234"
    },
    onContinue: (onDenied) => {
        console.log("onContinue")
    },
    onBack: () => {
        console.log("back")
    }
};

const Template = () => {
    return <ConfirmPhone
        {...common}
    />
};

export const Default = Template.bind({});

