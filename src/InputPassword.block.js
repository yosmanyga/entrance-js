import React from 'react';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import {Button, Container, Input, Platform, Text} from '@yosmy/simple-ui';
import {Error, Phone} from '@yosmy/compound-ui';

class InputPassword extends React.Component {
    static propTypes = {
        ui: PropTypes.shape({
            layout: PropTypes.func.isRequired, // (info, error, input, buttons),
            icons: PropTypes.shape({
                actions: PropTypes.shape({
                    continue: PropTypes.func.isRequired,
                    back: PropTypes.func.isRequired,
                }),
                objects: PropTypes.shape({
                    password: PropTypes.func.isRequired,
                    help: PropTypes.func.isRequired,
                })
            }).isRequired,
        }).isRequired,
        phone: PropTypes.shape({
            country: PropTypes.string,
            prefix: PropTypes.string,
            number: PropTypes.string,
        }),
        onFinish: PropTypes.func.isRequired, // (password, onInvalidPassword)
        onBack: PropTypes.func.isRequired, // ()
        onForgot: PropTypes.func.isRequired, // ()
    };

    state = {
        password: null,
        error: null,
        progress: false
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return difference(this.state, nextState);
    }

    render() {
        return <this.props.ui.layout
            info={<Phone
                country={this.props.phone.country}
                prefix={this.props.phone.prefix}
                number={this.props.phone.number}
            />}
            input={<Container
                align={{
                    alignItems: "center"
                }}
            >
                <Input
                    start={this.props.ui.icons.objects.password}
                    value={this.state.password}
                    placeholder="Pin"
                    keyboard='number'
                    secure
                    onChange={(value) => {
                        this.setState({
                            password: value
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
            buttons={<Container>
                <Container
                    flow={Platform.dimensions.isXsDown(this.props.width)
                        ? "column"
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
                        variant="contained"
                        color="primary"
                        progress={this.state.progress}
                        disabled={this.state.progress}
                        onClick={this._handleSubmit}
                    >
                        <this.props.ui.icons.actions.continue />
                        <Text>Continuar</Text>
                    </Button>
                    <Button
                        variant="cleared"
                        disabled={this.state.progress}
                        onClick={this.props.onBack}
                        margin={{
                            top: Platform.dimensions.isSmDown(this.props.width) ? 1 : undefined,
                            left: Platform.dimensions.isSmDown(this.props.width) ? undefined : 1
                        }}
                    >
                        <this.props.ui.icons.actions.back />
                        <Text>Corregir número</Text>
                    </Button>
                </Container>
                <Container
                    flow="row wrap"
                    align={{
                        justifyContent: "center",
                        alignItems: "flex-start"
                    }}
                    margin={{
                        top: 2
                    }}
                >
                    <Button
                        variant="cleared"
                        disabled={this.state.progress}
                        onClick={this.props.onForgot}
                    >
                        <this.props.ui.icons.objects.help />
                        <Text>Olvidé mi pin</Text>
                    </Button>
                </Container>
            </Container>}
        />
    }

    _handleSubmit = () => {
        this.setState(
            {
                error: null,
                progress: true
            }, () => {
                this.props.onFinish(
                    this.state.password,
                    // onInvalidPassword
                    () => {
                        this.setState({
                            error: "El pin es incorrecto. Intente otra vez",
                            progress: false
                        });
                    }
                )
            }
        );
    };
}

export default Platform.dimensions.withWidth()(InputPassword);