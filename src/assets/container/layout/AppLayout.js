import React from 'react';
import '../../styles/sass/style.scss';
import { Container } from 'semantic-ui-react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Home } from '../../page/Home';
import Login from '../../page/Login';

export function AppLayout(props){
    const token = localStorage.getItem('token')
    return(
        <div className="app-layout">
            {token ?
            <Container className="content-container">
                <Header/>
                <Home>
                    {props.children}
                </Home>
                <Footer/>
            </Container>:
            <Login/>}
        </div>
    )
}