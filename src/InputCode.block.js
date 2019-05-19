import React from 'react';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import {Button, Container, Input, Platform, Text} from '@yosmy/simple-ui';
import {Error, Phone} from '@yosmy/compound-ui';

class InputCode extends React.Component {
    static propTypes = {
        ui: PropTypes.shape({
            layout: PropTypes.func.isRequired, // (info, error, input, buttons),
            icons: PropTypes.shape({
                actions: PropTypes.shape({
                    continue: PropTypes.func.isRequired,
                    back: PropTypes.func.isRequired,
                }),
                objects: PropTypes.shape({
                    code: PropTypes.func.isRequired,
                })
            }).isRequired,
        }).isRequired,
        phone: PropTypes.shape({
            country: PropTypes.string,
            prefix: PropTypes.string,
            number: PropTypes.string,
        }),
        onFinish: PropTypes.func.isRequired, // (code, onInvalidCode)
        onBack: PropTypes.func.isRequired, // ()
    };

    state = {
        code: null,
        error: null,
        progress: false
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return difference(this.state, nextState);
    }

    render() {
        return <this.props.ui.layout
            info={<Container
                align={{
                    alignItems: "center"
                }}
            >
                <Phone
                    country={this.props.phone.country}
                    prefix={this.props.phone.prefix}
                    number={this.props.phone.number}
                />
                <Text
                    margin={{
                        top: 2
                    }}
                    center
                >
                    Te hemos enviado un SMS con el código de verificación, por favor, escríbelo a continuación.
                </Text>
            </Container>}
            input={<Container
                align={{
                    alignItems: "center"
                }}
            >
                <Input
                    start={this.props.ui.icons.objects.code}
                    value={this.state.code}
                    keyboard='number'
                    onChange={(value) => {
                        this.setState({
                            code: value
                        })
                    }}
                    onEnter={this._handleSubmit}
                    width={200}
                    margin={{
                        top: 2
                    }}
                />
            </Container>}
            error={this.state.error && <Error
                margin={{
                    top: 2
                }}
            >
                {this.state.error}
            </Error>}
            buttons={<Container
                flow={Platform.dimensions.isXsDown(this.props.width)
                    ? "column-reverse"
                    : "row"
                }
                align={Platform.dimensions.isXsDown(this.props.width)
                    ? {
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }
                    : {
                        justifyContent: "center",
                        alignItems: "center"
                    }
                }
                margin={{
                    top: 2
                }}
            >
                <Button
                    variant="cleared"
                    disabled={this.state.progress}
                    onClick={this.props.onBack}
                    margin={{
                        top: Platform.dimensions.isSmDown(this.props.width) ? 1 : undefined
                    }}
                >
                    <this.props.ui.icons.actions.back />
                    <Text>No recibí el código</Text>
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    progress={this.state.progress}
                    disabled={this.state.progress}
                    margin={{
                        left: Platform.dimensions.isSmDown(this.props.width) ? undefined : 1
                    }}
                    onClick={this._handleSubmit}
                >
                    <this.props.ui.icons.actions.continue />
                    <Text>Continuar</Text>
                </Button>
            </Container>}
        />
    }

    _handleSubmit = () => {
        if (!this.state.code) {
            this.setState({
                error: "El código no puede estar en blanco",
            });

            return;
        }

        this.setState(
            {
                error: null,
                progress: true
            }, () => {
                this.props.onFinish(
                    this.state.code,
                    // onExceededCompletes
                    () => {
                        this.setState({
                            error: "Has excedido el número máximo de intentos",
                            progress: false
                        });
                    },
                    // onWrongCode
                    () => {
                        this.setState({
                            error: "El código es incorrecto. Intenta otra vez",
                            progress: false
                        });
                    }
                )
            }
        );
    }
}

export default Platform.dimensions.withWidth()(InputCode);