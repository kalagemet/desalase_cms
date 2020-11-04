import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Dimmer, Divider, Form, Grid, Header, Input, Label, List, Loader } from 'semantic-ui-react';
import apiData from '../../../data/api-get';

class Footer extends Component{
    constructor(props) {
        super(props);
        this.state ={
            footerData: [],
            isLoading: true,
            disabledButton: false,
            loading:false
        }
    }
    
    componentDidMount(){
        fetch(apiData.footer)
        .then(response => response.json())
        .then( response=> {
            this.setState({footerData:response, isLoading:false})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleHapusToko=(e)=>{
        var conf = window.confirm('Anda Yakin menghapus '+e.target.name)
        if (conf) {
            var id = e.target.id
            this.setState({disabledButton:true,loading:true})
            fetch(apiData.hapusToko+'?id='+id,{
                headers:{
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
                }
            })
            .then(response => response.json())
            .then( response=> {
                if(!response.error){
                    alert('berhasil')
                    document.location.reload()
                }else{
                    alert('error - '+response.msg)
                }
                this.setState({disabledButton:false,loading:false})
            })
            .catch(err=>{
                alert(err)
                console.log(err)
                this.setState({disabledButton:false,loading:false})
            })
        }
    }
    handleHapusAlamat=(e)=>{
        var conf = window.confirm('Anda Yakin menghapus '+e.target.name)
        if (conf) {
            var id = e.target.id
            this.setState({disabledButton:true,loading:true})
            fetch(apiData.hapusAlamat+'?id='+id,{
                headers:{
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
                }
            })
            .then(response => response.json())
            .then( response=> {
                if(!response.error){
                    alert('berhasil')
                    document.location.reload()
                }else{
                    alert('error - '+response.msg)
                }
                this.setState({disabledButton:false,loading:false})
            })
            .catch(err=>{
                alert(err)
                console.log(err)
                this.setState({disabledButton:false,loading:false})
            })
        }
    }

    handleTambahToko=(e)=>{
        if(e.target.icon.value==='')e.target.icon.focus()
        else if(e.target.header.value==='')e.target.header.focus()
        else if(e.target.data.value==='')e.target.data.focus()
        else if(e.target.link.value==='')e.target.link.focus()
        else{
            this.setState({disabledButton:true,loading:true})
            var dataBody = {
                'icon' : e.target.icon.value,
                'header' : e.target.header.value,
                'data' : e.target.data.value,
                'link' : e.target.link.value
            }
            fetch(apiData.tambahToko,{
                method:'post',
                headers: {
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
                    'Content-Type': 'application/json'},
                body : JSON.stringify(dataBody)
            })
            .then(response => response.json())
            .then( response=> {
                if(!response.error){
                    alert('berhasil')
                    console.log(response.msg)
                    document.location.reload()
                }else{
                    alert('error - '+response.msg)
                }
                this.setState({disabledButton:false,loading:false})
            })
            .catch(err=>{
                alert(err)
                console.log(err)
                this.setState({disabledButton:false,loading:false})
            })
        }
    }
    handleTambahAlamat=(e)=>{
        if(e.target.icon.value==='')e.target.icon.focus()
        else if(e.target.header.value==='')e.target.header.focus()
        else if(e.target.data.value==='')e.target.data.focus()
        else if(e.target.link.value==='')e.target.link.focus()
        else{
            this.setState({disabledButton:true,loading:true})
            var dataBody = {
                'icon' : e.target.icon.value,
                'header' : e.target.header.value,
                'data' : e.target.data.value,
                'link' : e.target.link.value
            }
            fetch(apiData.tambahAlamat,{
                method:'post',
                headers: {
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
                    'Content-Type': 'application/json'},
                body : JSON.stringify(dataBody)
            })
            .then(response => response.json())
            .then( response=> {
                if(!response.error){
                    alert('berhasil')
                    console.log(response.msg)
                    document.location.reload()
                }else{
                    alert('error - '+response.msg)
                }
                this.setState({disabledButton:false,loading:false})
            })
            .catch(err=>{
                alert(err)
                console.log(err)
                this.setState({disabledButton:false,loading:false})
            })
        }
    }

    handleUpdateToko=(e)=>{
        if(e.target.icon.value==='')e.target.icon.focus()
        else if(e.target.header.value==='')e.target.header.focus()
        else if(e.target.data.value==='')e.target.data.focus()
        else if(e.target.id.value==='')e.target.data.focus()
        else if(e.target.link.value==='')e.target.link.focus()
        else{
            var conf = window.confirm('Anda Yakin memperbarui '+e.target.header.value)
            if (conf) {
                this.setState({disabledButton:true,loading:true})
                var dataBody = {
                    'id' : e.target.id.value,
                    'icon' : e.target.icon.value,
                    'header' : e.target.header.value,
                    'data' : e.target.data.value,
                    'link' : e.target.link.value
                }
                fetch(apiData.updateToko,{
                    method:'post',
                    headers: {
                        'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(dataBody)
                })
                .then(response => response.json())
                .then( response=> {
                    if(!response.error){
                        alert('berhasil')
                        console.log(response.msg)
                        document.location.reload()
                    }else{
                        alert('error - '+response.msg)
                    }
                    this.setState({disabledButton:false,loading:false})
                })
                .catch(err=>{
                    alert(err)
                    console.log(err)
                    this.setState({disabledButton:false,loading:false})
                })
            }
        }
    }
    handleUpdateAlamat=(e)=>{
        if(e.target.icon.value==='')e.target.icon.focus()
        else if(e.target.header.value==='')e.target.header.focus()
        else if(e.target.data.value==='')e.target.data.focus()
        else if(e.target.id.value==='')e.target.data.focus()
        else if(e.target.link.value==='')e.target.link.focus()
        else{
            var conf = window.confirm('Anda Yakin memperbarui '+e.target.header.value)
            if (conf) {
                this.setState({disabledButton:true,loading:true})
                var dataBody = {
                    'id' : e.target.id.value,
                    'icon' : e.target.icon.value,
                    'header' : e.target.header.value,
                    'data' : e.target.data.value,
                    'link' : e.target.link.value
                }
                fetch(apiData.updateAlamat,{
                    method:'post',
                    headers: {
                        'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
                        'Content-Type': 'application/json'},
                    body : JSON.stringify(dataBody)
                })
                .then(response => response.json())
                .then( response=> {
                    if(!response.error){
                        alert('berhasil')
                        console.log(response.msg)
                        document.location.reload()
                    }else{
                        alert('error - '+response.msg)
                    }
                    this.setState({disabledButton:false,loading:false})
                })
                .catch(err=>{
                    alert(err)
                    console.log(err)
                    this.setState({disabledButton:false,loading:false})
                })
            }
        }
    }

    render() {
        const {footerData, isLoading, loading, disabledButton} = this.state;
        return (
            <Container fluid className='footer-container'>
                {isLoading ? 
                <Dimmer inverted active={isLoading}>
                    <Loader size='huge' inline indeterminate/>
                </Dimmer> :
                <Grid>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={16} computer={6}>
                            <Grid.Row>
                                <Header inverted as='h1'>Desalase.id</Header>
                                <Divider inverted/>
                            </Grid.Row>
                            {footerData.alamat.map((data, i) => (
                                <Grid.Row key={i}>
                                    <Form onSubmit={this.handleUpdateAlamat}>
                                        <Input name='id' size='mini' value={data.id} disabled style={{display:'none'}} focus />
                                        <Input name='icon' disabled={disabledButton} defaultValue={data.icon} label={{ icon: data.icon }} labelPosition='left corner' size='mini' style={{width:'30%'}} focus />
                                        <Input name='header' disabled={disabledButton} defaultValue={data.header} label={{ icon: 'text width' }} labelPosition='left corner' size='mini' style={{width:'70%'}} focus />
                                        <Input name='data' disabled={disabledButton} defaultValue={data.data} label='subHeader' size='mini' fluid focus />
                                        <Input name='link' disabled={disabledButton} defaultValue={data.link} label='link' size='mini' fluid focus />
                                        <Button.Group size='mini' fluid>
                                            <Button type='submit' color='yellow' loading={loading} disabled={disabledButton} content='Simpan' size='mini' />
                                            <Button id={data.id} loading={loading} disabled={disabledButton} name={'alamat-'+data.header} onClick={this.handleHapusAlamat} color='red' content='Hapus' size='mini' />
                                        </Button.Group>
                                    </Form>
                                    <Divider inverted/>
                                </Grid.Row>
                            ))}
                            <Grid.Row>
                                <Form onSubmit={this.handleTambahAlamat}>
                                    <Input disabled={disabledButton} name='icon' placeholder='icon' label={{ icon: 'plus' }} labelPosition='left corner' size='mini' style={{width:'30%'}} focus />
                                    <Input disabled={disabledButton} name='header' placeholder='header' label={{ icon: 'text width' }} labelPosition='left corner' size='mini' style={{width:'70%'}} focus />
                                    <Input disabled={disabledButton} name='data' placeholder='deskripsi' label='subHeader' size='mini' fluid focus />
                                    <Input disabled={disabledButton} name='link' placeholder='url' label='link' size='mini' fluid focus />
                                    <Button loading={loading} color='green' type='submit' content='Simpan' size='mini' fluid />
                                </Form>
                            </Grid.Row>
                        </Grid.Column>

                        <Grid.Column mobile={16} tablet={16} computer={5}>
                            <Grid.Row>
                                <Header inverted as='h1'>Toko Online</Header>
                                <Divider inverted/>
                            </Grid.Row>
                            {footerData.toko.map((data, i) => (
                                <Grid.Row key={i}>
                                    <Form onSubmit={this.handleUpdateToko}>
                                        <Input name='id' size='mini' value={data.id} disabled style={{display:'none'}} focus />
                                        <Input name='icon' disabled={disabledButton} defaultValue={data.icon} label={{ icon: data.icon }} labelPosition='left corner' size='mini' style={{width:'30%'}} focus />
                                        <Input name='header' disabled={disabledButton} defaultValue={data.header} label={{ icon: 'text width' }} labelPosition='left corner' size='mini' style={{width:'70%'}} focus />
                                        <Input name='data' disabled={disabledButton} defaultValue={data.data} label='subHeader' size='mini' fluid focus />
                                        <Input name='link' disabled={disabledButton} defaultValue={data.link} label='link' size='mini' fluid focus />
                                        <Button.Group size='mini' fluid>
                                            <Button type='submit' color='yellow' loading={loading} disabled={disabledButton} content='Simpan' size='mini' />
                                            <Button id={data.id} loading={loading} disabled={disabledButton} name={'toko-'+data.header} onClick={this.handleHapusToko} color='red' content='Hapus' size='mini' />
                                        </Button.Group>
                                    </Form>
                                    <Divider inverted/>
                                </Grid.Row>
                            ))}
                            <Grid.Row>
                                <Form onSubmit={this.handleTambahToko}>
                                    <Input disabled={disabledButton} name='icon' placeholder='icon' label={{ icon: 'plus' }} labelPosition='left corner' size='mini' style={{width:'30%'}} focus />
                                    <Input disabled={disabledButton} name='header' placeholder='header' label={{ icon: 'text width' }} labelPosition='left corner' size='mini' style={{width:'70%'}} focus />
                                    <Input disabled={disabledButton} name='data' placeholder='deskripsi' label='subHeader' size='mini' fluid focus />
                                    <Input disabled={disabledButton} name='link' placeholder='url' label='link' size='mini' fluid focus />
                                    <Button loading={loading} color='green' type='submit' content='Simpan' size='mini' fluid />
                                </Form>
                            </Grid.Row>
                        </Grid.Column>

                        <Grid.Column mobile={16} tablet={16} computer={5}>
                            <Grid.Row>
                                <Header inverted as='h1'>Peta Situs</Header>
                                <Divider inverted/>
                            </Grid.Row>
                                <Grid.Row as={Link} to='#'>
                                    <List inverted as={Header}>
                                        <List.Item as={Link} to='/'>Beranda</List.Item>
                                        <List.Item as={Link} to='/etalase'>Etalase</List.Item>
                                        <List.Item as={Link} to='blog'>Blog{' '}<Label color='red' size='mini' tag>Comming soon</Label></List.Item>
                                        <List.Item as={Link} to='/tentang'>Tentang</List.Item>
                                        <List.Item as={Link} onClick={()=>{
                                            var conf = window.confirm('Anda Yakin ? ')
                                            if (conf) {
                                                localStorage.removeItem("token")
                                                document.location.reload()
                                            }
                                        }}>Keluar</List.Item>
                                    </List>
                                </Grid.Row>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
                }
            </Container>
        );
    }
}

export default Footer;