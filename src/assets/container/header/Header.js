import React, { Component } from 'react';
import { Button, Divider, Dropdown, Grid, Icon, Image, Input, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { Media, MediaContextProvider } from '../responsive/Media';
import apiData from '../../../data/api-get';
import { Link, Redirect } from 'react-router-dom';
import { scroller } from 'react-scroll';

class DesktopHeader extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            isLoading:true, 
            activeItem: 'Beranda',
            logo: '',
            cari:''
        }
    }
    
    scrollToSection = (className) => {
        scroller.scrollTo(className, {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    };

    componentDidMount(){
        window.addEventListener("scroll", this.headerOnScroll);
        fetch(apiData.logo)
        .then(response => response.json())
        .then( response=> {
            this.setState({logo:response})
        })
        .catch(err=>{
            console.log(err)
        })
    };

    // make header on scrolll
    headerOnScroll(){
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 100,
            headerElement = document.getElementById('desktop-header'),
            wrapper = document.getElementById('wrapper');
        if(window.innerWidth > shrinkOn){
            if(distanceY > shrinkOn){
                if(headerElement!=null){
                    headerElement.classList.add("scroll");
                }
                if(wrapper!=null){
                    wrapper.classList.add("scroll");
                }
            } else {
                if(headerElement!=null){
                    headerElement.classList.remove("scroll");
                }
                if(wrapper!=null){
                    wrapper.classList.remove("scroll");
                }
            }
        }
    }

    handleItemClick = (e, { name }) => 
    {
        this.setState({ activeItem: name });
        if (name==='Beranda') {
            this.scrollToSection('app-layout')
        }
        else if (name==='Tentang') {
            this.scrollToSection('divider-page')
        }
        else if (name==='Etalase') {
            this.scrollToSection('divider-page')
        }
    }

    render() {
        const {activeItem, logo, cari} = this.state;
        return (
            <Media greaterThan='tablet'>
                <Segment className='desktop-header' id='desktop-header' vertical>
                    <Grid centered columns={3} >
                        <Grid.Column width={3} stretched className='header-logo-container'>
                            <Image className='header-logo' href='/' alt='desalase.id logo' src={logo} />
                        </Grid.Column>
                        <Grid.Column width={10} className='cari-header-container' stretched>
                            <Input
                                size='small'
                                className='cari-header'
                                placeholder='Cari Produk...'
                                onChange={e=>this.setState({cari:e.target.value})}
                                action={{
                                    icon:<Icon name='search' circular inverted link />,
                                    href:'/etalase/cari/'+cari
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Menu secondary className='desktop-menu'>
                                <Menu.Menu position='right'>
                                    <Menu.Item className='menu-item'
                                        // as={Link}
                                        // to={'/'}
                                        name='Beranda'
                                        active={activeItem === 'Beranda'}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item className='menu-item'
                                        // as={Link}
                                        // to={'/etalase'}
                                        name='Etalase'
                                        active={activeItem === 'Etalase'}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item className='menu-item'
                                        as={Link}
                                        to={'/tentang'}
                                        name='Tentang'
                                        active={activeItem === 'Tentang'}
                                        onClick={this.handleItemClick}
                                    />
                                </Menu.Menu>
                            </Menu>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Media>
        );
    }
}

class MobileHeader extends Component{
    constructor(props) {
        super(props);
        this.state = { cari:'',logo: '', headerVisible : false, activeItem: 'Beranda', activeItemSub:null, redirect:null};
    }
    
    componentDidMount(){
        window.addEventListener("scroll", this.headerOnScroll);
        fetch(apiData.logo)
        .then(response => response.json())
        .then( response=> {
            this.setState({logo:response})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    // make header on scrolll
    headerOnScroll(){
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 300,
            headerElement = document.getElementById('mobile-header'),
            wrapper = document.getElementById('wrapper');
        if(window.innerWidth > shrinkOn){
            if(distanceY > shrinkOn){
                if(headerElement!=null){
                    headerElement.classList.add("scroll");
                }
                if(wrapper!=null){
                    wrapper.classList.add("scroll");
                }
            } else {
                if(headerElement!=null){
                    headerElement.classList.remove("scroll");
                }
                if(wrapper!=null){
                    wrapper.classList.remove("scroll");
                }
            }
        }
    }
    
    handleToggle = () => this.setState({ headerVisible: !this.state.headerVisible });

    handleItemClick = (e, { name, text }) => 
    {
        this.setState({ activeItem: name });
        if (name==='Beranda') {
            window.scrollTo(0,0);
        }
        else if (name==='Tentang') {
            window.scrollTo(0, document.body.scrollHeight);
        }
        else if (text!=null) {
            this.setState({activeItemSub: text})
            window.scrollTo(0, window.innerHeight-70)
        }else{
            window.scrollTo(0, window.innerHeight-70)
        }
        this.handleToggle();
    }

    render() {
        const { cari, headerVisible, redirect, logo, activeItem } = this.state;

        if(redirect!=null){
            return <Redirect push to={redirect} />
        }
        return (
            <Media lessThan='computer'>
                <Sidebar
                    as={Segment}
                    className='menu-header-mobile'
                    animation='push'
                    direction='left'
                    visible={headerVisible}
                >
                    <Segment className='mobile-header' vertical>
                        <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Image floated='left' href='/' className='header-logo-mobile' src={logo} />   
                                </Grid.Column>
                                <Grid.Column>
                                    <Button onClick={this.handleToggle} floated='right' className='header-button-mobile' icon>
                                        <Icon size='big' name='arrow left'/>
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    <Menu className='item-menu-mobile' vertical text>
                        <Menu.Item as={Link} to='/beranda' name='Beranda' active={activeItem==='Beranda'} onClick={this.handleItemClick} />
                        <Divider/>
                        <Dropdown className={this.state.activeItem==='Produk UMKM' ? 'on':''} as={Menu.Item} simple item text='Produk UMKM'>
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
                        <Dropdown as={Menu.Item} className={this.state.activeItem==='Produk Pertanian' ? 'on':''} simple item text='Produk Pertanian' >
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
                        <Menu.Item as={Link} to='/etalase/jasa' name='Jasa' active={activeItem==='Jasa'} onClick={this.handleItemClick} />
                        <Menu.Item as={Link} to='/etalase/konveksi' name='Konveksi' active={activeItem==='Konveksi'} onClick={this.handleItemClick} />
                        <Divider/>
                        <Menu.Item as={Link} to='/tentang' name='Tentang' active={activeItem==='Tentang'} onClick={this.handleItemClick} />
                    </Menu>
                </Sidebar>
                <Segment className='mobile-header' id='mobile-header' vertical>
                    <Grid centered>
                        <Grid.Row columns={3}>
                            <Grid.Column width={4} className='img-header-container'>
                                <Image floated='left' href='/' className='header-logo-mobile' alt='desalase.id logo'  src={logo} />   
                            </Grid.Column>
                            <Grid.Column width={9} className='cari-header-container' stretched>
                                <Input
                                    size='small'
                                    className='cari-header'
                                    placeholder='Cari Produk...'
                                    onChange={e=>this.setState({cari:e.target.value})}
                                    action={{
                                        icon:<Icon name='search' circular inverted link />,
                                        href:'/etalase/cari/'+cari
                                    }}
                                />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Button onClick={this.handleToggle} floated='right' className='header-button-mobile' icon>
                                    <Icon size='big' name='list ul'/>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Media>
        );
    }
}

class Header extends Component{
    render() {
        return (
            <MediaContextProvider>
                <DesktopHeader/>
                <MobileHeader/>
            </MediaContextProvider>
        );
    }
}

export default Header;