import React, { createRef, Component } from 'react';
import { Segment, Grid, Header, Divider, Ref, Rail, Sticky, Menu, Dropdown } from 'semantic-ui-react';
import '../styles/sass/katalog.scss';
import {Media, MediaContextProvider} from '../container/responsive/Media';
import { Link } from 'react-router-dom';

class Navigator extends Component{
    contextRef = createRef();
    state = { activeItem: 'Favorit', activeItemSub: null }
    handleItemClick = (e, {name, text}) =>{
        this.setState({ activeItem: name})
        if(text!=null){
            this.setState({activeItemSub: text})
        }
        window.scrollTo(0, window.innerHeight-70)
    }
    render() {
        return (
            <Ref innerRef={this.contextRef}>
                <Rail attached className='navigator-rail'>
                    <Sticky context={this.contextRef}>
                        <Segment textAlign='left' color='yellow'>
                            <Header textAlign='left' as='h2'>
                                Filter
                            </Header>
                            <Divider/>
                            <Menu className='menu-dropdown' secondary vertical>
                                <Dropdown as={Menu.Item} active={this.state.activeItem === 'Produk UMKM'} item text='Produk UMKM'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item 
                                            as={Link}
                                            to='/etalase/umkm/makanan'
                                            active={this.state.activeItemSub === 'Makanan'} 
                                            name='Produk UMKM' text='Makanan' 
                                            onClick={this.handleItemClick}
                                        />
                                        <Dropdown.Item 
                                            as={Link}
                                            to='/etalase/umkm/minuman'
                                            active={this.state.activeItemSub === 'Minuman'} 
                                            name='Produk UMKM' text='Minuman' 
                                            onClick={this.handleItemClick}
                                        />
                                        <Dropdown.Item 
                                            as={Link}
                                            to='/etalase/umkm/lainya'
                                            active={this.state.activeItemSub === 'Lainya'} 
                                            name='Produk UMKM' text='Lainya' 
                                            onClick={this.handleItemClick}
                                        />
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown as={Menu.Item} active={this.state.activeItem === 'Produk Pertanian'} item text='Produk Pertanian'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item 
                                            as={Link}
                                            to='/etalase/pertanian/buah'
                                            active={this.state.activeItemSub === 'Buah'} 
                                            name='Produk Pertanian' text='Buah' 
                                            onClick={this.handleItemClick}
                                        />
                                        <Dropdown.Item 
                                            as={Link}
                                            to='/etalase/pertanian/tanaman'
                                            active={this.state.activeItemSub === 'Tanaman'} 
                                            name='Produk Pertanian' 
                                            text='Tanaman' 
                                            onClick={this.handleItemClick}
                                        />
                                        <Dropdown.Item 
                                            as={Link}
                                            to='/etalase/pertanian/hewani'
                                            active={this.state.activeItemSub === 'Hewani'} 
                                            name='Produk Pertanian' 
                                            text='Hewani' 
                                            onClick={this.handleItemClick}
                                        />
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Menu.Item
                                    as={Link}
                                    to='/etalase/jasa'
                                    name='Jasa'
                                    active={this.state.activeItem === 'Jasa'}
                                    onClick={this.handleItemClick}
                                />
                                <Menu.Item
                                    as={Link}
                                    to='/etalase/konveksi'
                                    name='Konveksi'
                                    active={this.state.activeItem === 'Konveksi'}
                                    onClick={this.handleItemClick}
                                />
                            </Menu>
                        </Segment>
                    </Sticky>
                </Rail>
            </Ref>
        );
    }
}

export default function Kalatog(props){ 
    return (
        <MediaContextProvider>
            <Media greaterThan='mobile'>
                <Grid className='katalog-container' columns={2}>
                    <Grid.Column width={4}>
                        <Navigator/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {props.children}
                    </Grid.Column>
                </Grid>
            </Media>
            <Media at='mobile'>
                {props.children}
            </Media>
        </MediaContextProvider>
    );
}