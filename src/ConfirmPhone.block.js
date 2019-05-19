import React from 'react';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import {Button, Container, Platform, Text} from '@yosmy/simple-ui';
import {Error, Phone} from '@yosmy/compound-ui';

class ConfirmPhone extends React.Component {
    static propTypes = {
        ui: PropTypes.shape({
            layout: PropTypes.func.isRequired, // (input, buttons),
            icons: PropTypes.shape({
                actions: PropTypes.shape({
                    continue: PropTypes.func.isRequired,
                })
            }).isRequired,
        }),
        phone: PropTypes.shape({
            country: PropTypes.string,
            prefix: PropTypes.string,
            number: PropTypes.string,
        }),
        onFinish: PropTypes.func.isRequired, // (onPhoneInvalidNumber, onExceededStarts)
        onBack: PropTypes.func.isRequired, // ()
    };

    state = {
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
                    <Text>Es correcto</Text>
                </Button>
                <Button
                    variant="cleared"
                    disabled={this.state.progress}
                    margin={{
                        top: Platform.dimensions.isXsDown(this.props.width) ? 1 : undefined,
                        left: Platform.dimensions.isXsDown(this.props.width) ? undefined : 1
                    }}
                    onClick={this.props.onBack}
                >
                    <this.props.ui.icons.actions.back />
                    <Text>Corregir número</Text>
                </Button>
            </Container>}
        />;
    }

    _handleSubmit = () => {
        this.setState({
            progress: true,
        }, () => {
            this.props.onFinish(
                // onPhoneInvalidNumber
                () => {
                    this.setState({
                        error: "El número es incorrecto",
                        progress: false
                    });
                },
                // onExceededStarts
                () => {
                    this.setState({
                        error: "Has excedido el número máximo de intentos",
                        progress: false
                    });
                }
            )
        });
    }
}

export default Platform.dimensions.withWidth()(ConfirmPhone);