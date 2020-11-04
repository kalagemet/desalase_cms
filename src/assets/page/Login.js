import React, { Component } from 'react'
import { Button, Container, Form, Header, Icon, Input, Segment } from 'semantic-ui-react';
import apiData from '../../data/api-get';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false
        }
    }

    componentDidMount(){
        if(localStorage.getItem('token')){
            // localStorage.removeItem('token')
            document.location.reload()
        }
    }
    
    loginHandler=(e)=>{
        if(!e.target.user.value){
            e.target.user.focus()
        }
        else if(!e.target.pass.value){
            e.target.pass.focus()
        }else{
            this.setState({loading:true})
            const fromData = new FormData()
            fromData.append('grant_type','password')
            fromData.append('client_id',apiData.client_id)
            fromData.append('client_secret',apiData.client_secret)
            fromData.append('username',e.target.user.value)
            fromData.append('password',e.target.pass.value)
            fetch(apiData.login, {
                method: 'POST',
                body: fromData
            })
            .then(response => response.json())
            .then( response=> {
                if(!response.error){
                    localStorage.setItem("token", JSON.stringify(response.access_token));
                }else{
                    alert('error '+response.error)
                    console.log(response)
                }
                this.setState({loading:false})
                document.location.reload()
            })
            .catch(err=>{
                console.log(err)
                this.setState({loading:false})
            })
        }
    }
    render() {
        const { loading } = this.state
        return (
            <Segment textAlign='center' vertical className='login-container'>
                <Header inverted as='h1' icon>
                    <Icon name='sign-in' />
                    LOGIN
                    <Header.Subheader>
                        Atur halaman desalase.id
                    </Header.Subheader>
                </Header>
                <Container className='login-form'>
                    <Form onSubmit={this.loginHandler}>
                        <Form.Field>
                            <Input name='user' focus icon='users' iconPosition='left' placeholder='username' />
                        </Form.Field>
                        <Form.Field>
                            <Input name='pass' type='password' focus icon='key' iconPosition='left' placeholder='password' />
                        </Form.Field>
                        <Button loading={loading} size='huge' type='submit' fluid positive>Masuk</Button>
                    </Form>
                </Container>
            </Segment>
        );
    }
}

export default Login;