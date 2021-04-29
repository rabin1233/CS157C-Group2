import React, { Component } from 'react';

import { Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }

        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.name = this.name.bind(this);
    }
    email(event) {
        this.setState({ email: event.target.value })
    }
    password(event) {
        this.setState({ password: event.target.value })
    }
    name(event) {
        this.setState({ name: event.target.value })
    }

    signup(event) {
        event.preventDefault();
        fetch('http://localhost:4000/user/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                name: this.state.name,
                password: this.state.password,
                email: this.state.email,

            })
        }).then((Response) => Response.json())
            .then((Result) => {
                if (Result.Status == 'Success')
                    this.props.history.push("/navbar");
                else
                    alert('Sorrrrrry !!!! Un-authenticated User !!!!!')
            })
    }
    
    render() {
        console.log(this.state);
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form onSubmit={this.signup}>
                                        <div className="row" className="mb-2 pageheading">
                                        <h2 style={{textAlign: 'center'}}>Signup</h2>
                                        </div>
                                        <InputGroup className="mb-3">
                                            <Input type="text" onChange={this.name} placeholder="Enter  Your Name" />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="text" onChange={this.email} placeholder="Enter Email" />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input type="password" onChange={this.password} placeholder="Enter Password" />
                                        </InputGroup>
                                        <Button color="success" block>Create Account</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Signup;