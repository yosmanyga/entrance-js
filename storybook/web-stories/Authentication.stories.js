import React from 'react';
import {Container, EmptyLayout, Text} from "@yosmy/ui";
import icons from "../_Icons";

import Authentication from '../Authentication';

export default {
    title: 'Authentication',
    component: Authentication,
};

const common = {
    ui: {
        layouts: {
            inputPhone: ({input, buttons}) => {
                return <EmptyLayout title="Regístrate o accede a tu cuenta">
                    <Text>Bienvenido a CubaMessenger</Text>
                    <Text>Escribe tu teléfono para comenzar</Text>
                    {input}
                    {buttons}
                </EmptyLayout>
            },
            confirmPhone: ({phone, error, buttons}) => {
                return <EmptyLayout title="Verifica tu número para enviarte un sms">
                    <Text>
                        Verifica tu número para enviarte un sms
                    </Text>
                    {phone}
                    {error}
                    {buttons}
                </EmptyLayout>
            },
            inputCode: ({phone, input, error, buttons}) => {
                return <EmptyLayout title="Escribe el código que recibiste por sms">
                    <Text>
                        Te hemos enviado un código de verificación por SMS.
                    </Text>
                    <Text>
                        Escribe el código recibido en el espacio a continuación.
                    </Text>
                    {input}
                    <Container
                        flow="row"
                    >
                        <Text
                            margin={{
                                right: 1
                            }}
                        >
                            El código fue enviado el número:
                        </Text>
                        {phone}
                    </Container>
                    {error}
                    {buttons}
                </EmptyLayout>
            },
            inputPassword: ({phone, input, error, buttons}) => {
                return <EmptyLayout title="Accede usando tu pin">
                    {phone}
                    {input}
                    {error}
                    {buttons}
                </EmptyLayout>
            }
        },
        icons: {
            actions: {
                expand: icons.actions.expand
            },
            objects: {
                code: icons.objects.code,
                help: icons.objects.help,
                password: icons.objects.password,
            }
        }
    },
    api: {
        startAuthenticationWithPassword: (country, prefix, number, onReturn, onPhoneInvalidNumberException, onUnsupportedAuthenticationException) => {
            onUnsupportedAuthenticationException();
        },
        completeAuthenticationWithPassword: () => {},
        startAuthenticationWithCode: (country, prefix, number, onReturn) => {
            onReturn();
        },
        completeAuthenticationWithCode: () => {},
    },
    countries: {
        favorites: ["CU", "US", "ES", "MX", "EC"],
            more: true
    },
    onAuthenticate: () => {}
};

const Template = () => {
    return <Authentication
        {...common}
    />
};

export const Default = Template.bind({});

