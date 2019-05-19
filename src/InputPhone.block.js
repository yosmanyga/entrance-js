import React from 'react';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import {Button, Container, Image, Input, Modal, Text} from '@yosmy/simple-ui';
import {CountryPicker, Error, Flag, ListItem} from '@yosmy/compound-ui';

class InputPhone extends React.Component {
    static propTypes = {
        ui: PropTypes.shape({
            layout: PropTypes.func.isRequired, // (input, buttons),
            icons: PropTypes.shape({
                actions: PropTypes.shape({
                    down: PropTypes.func.isRequired,
                    continue: PropTypes.func.isRequired,
                })
            }).isRequired,
        }),
        countries: PropTypes.shape({
            favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
            all: PropTypes.bool.isRequired
        }).isRequired,
        phone: PropTypes.shape({
            country: PropTypes.string,
            prefix: PropTypes.string,
            number: PropTypes.string,
        }),
        onFinish: PropTypes.func.isRequired, // (country, {prefix, number}, onInvalidNumber, onInvalidCode)
    };

    constructor(props) {
        super(props);

        if (this.props.phone) {
            this.state = {
                ...this.state,
                phone: this.props.phone
            }
        }
    }

    state = {
        phone: {
            country: null,
            prefix: null,
            number: null
        },
        error: null,
        progress: false
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return difference(this.state, nextState);
    }

    render() {
        return <this.props.ui.layout
            input={<Container
                flow="column"
                align={{
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}
                width="full"
            >
                <CountryPicker
                    ui={{
                        components: {
                            button: Button,
                            container: Container,
                            flag: Flag,
                            image: Image,
                            listItem: ListItem,
                            modal: Modal,
                            text: Text,
                        },
                        icons: {
                            actions: {
                                down: this.props.ui.icons.actions.down
                            }
                        }
                    }}
                    width={300}
                    country={this.state.phone.country}
                    favorites={this.props.countries.favorites}
                    all={this.props.countries.all}
                    messages={{
                        select: "Selecciona tu país"
                    }}
                    onSelect={({country, prefix}) => {
                        this.setState({
                            phone: {
                                ...this.state.phone,
                                country: country,
                                prefix: prefix,
                            }
                        });
                    }}
                />
                <Input
                    value={this.state.phone.number}
                    keyboard="number"
                    width={300}
                    placeholder="Teléfono"
                    start={() => {
                        if (!this.state.phone.prefix) {
                            return null;
                        }

                        return <Text>
                            +{this.state.phone.prefix}
                        </Text>
                    }}
                    margin={{
                        top: 2
                    }}
                    onChange={(value) => {
                        this.setState({
                            phone: {
                                ...this.state.phone,
                                number: value,
                            }
                        })
                    }}
                    onEnter={this._handleSubmit}
                />
                {this.state.error !== null ? <Error
                    margin={{
                        top: 1
                    }}
                >
                    {this.state.error}
                </Error> : null}
            </Container>}
            buttons={<Container
                flow="row wrap"
                align={{
                    justifyContent: "center"
                }}
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
            </Container>}
        />;
    }

    _normalize = (number) => {
        return number.replace(/\D/g,'');
    };

    _handleSubmit = () => {
        if (!this.state.phone.country) {
            this.setState({
                error: "Debes seleccionar el país",
            });

            return;
        }

        if (!this.state.phone.number) {
            this.setState({
                error: "Debes escribir tu número de teléfono",
            });

            return;
        }

        this.setState(
            {
                error: null,
                progress: true,
            },
            () => {
                this.props.onFinish(
                    {
                        ...this.state.phone,
                        number: this._normalize(this.state.phone.number)
                    },
                    // onInvalidNumber
                    () => {
                        this.setState({
                            error: "El número es incorrecto. Verifícalo",
                            progress: false
                        });
                    },
                )
            }
        );
    }
}

export default InputPhone;