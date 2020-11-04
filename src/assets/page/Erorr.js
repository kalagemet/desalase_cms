import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

class Error extends Component{
    componentDidMount(){
        scroller.scrollTo('divider-page',{
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    }
    render() {
        return (
            <Segment textAlign='center' vertical  className='web-404-container'>
                <Icon className='ikon' name='warning sign' size='massive' color='yellow'/>
                <Header as='h1' className='text_header'>
                    {this.props.error}
                    <Header.Subheader className='subHeader'>
                        {this.props.suberror}
                    </Header.Subheader>
                    <br/>
                    <Button color='blue' as={Link} to='/' content='Beranda'/>
                </Header>           
            </Segment>
        );
    }
}

export default Error;