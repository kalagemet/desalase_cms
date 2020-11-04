import React, { Component } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {  Button, Container, Divider, Dropdown, Form, Grid, Header, Input, Segment } from 'semantic-ui-react';
import apiData from '../../data/api-get';
import { scroller } from 'react-scroll';
import ReactQuill from 'react-quill';

class Add extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false, 
            disabled:false,
            harga:'',
            kategori:[],
            spiner:true,
            tags:[],
            tagSelected:'',
            kategoriSelected:0,
            deskripsi:'',
        }
    }
    modules = {
        toolbar : [
            ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
            // ['blockquote', 'code-block'],                    // blocks
            [{ 'header': 1 }, { 'header': 2 }],              // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
            // [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
            // [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
            // [{ 'direction': 'rtl' }],                        // text direction
            // [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
            // [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
            // [{ 'font': [] }],                                // font family
            [{ 'align': [] }],                               // text align
            // ['clean'],                                       // remove formatting
        ]
    }

    formats = [
        'header', 'font', 'background', 'color', 'code', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'script', 'align', 'direction',
        'link', 'image', 'code-block', 'formula', 'video'
    ]

    componentDidMount(){
        this.scrollTop();
        document.title = 'Tambah Produk | desalase.id'
        fetch(apiData.getKategori,{
            headers:{
                'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
            },
        })
        .then(response => response.json())
        .then( response=> {
            if(response.error){
                alert('gagal mengambil kategori')
            }else{
                this.setState({kategori:response.data,spiner:false})
            }
        })
        .catch(err=>{
            console.log(err)
        })
        fetch(apiData.getTags,{
            headers:{
                'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
            },
        })
        .then(response => response.json())
        .then( response=> {
            if(response.error){
                // alert('gagal mengambil tags')
            }else{
                this.setState({tags:response.data,spiner:false})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    scrollTop(){
        scroller.scrollTo('divider-page', {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    }

    handleUpload=(e)=>{
        if(e.target.nama.value==='' ||
        e.target.produsen.value==='' ||
        this.state.kategoriSelected==='' ||
        this.state.deskripsi==='' ||
        this.state.tagSelected==='' ||
        e.target.img.files.length===0 ||
        e.target.harga.value===0 ||
        e.target.wa.value==='' ||
        e.target.tokped.value==='' ||
        e.target.shopee.value===''){
            alert('form tidak lengkap')
            e.target.nama.focus()
        }else{
            this.setState({loading:true,disabled:true})
            const fromData = new FormData()
            fromData.append('nama',e.target.nama.value)
            fromData.append('desk',this.state.deskripsi)
            for(const file of e.target.img.files){
                fromData.append('img[]',file, file.name)
            }
            // fromData.append('img[]',e.target.img.files)
            fromData.append('produsen',e.target.produsen.value)
            fromData.append('harga',e.target.harga.value)
            fromData.append('url',e.target.wa.value+'|'+e.target.tokped.value+'|'+e.target.shopee.value)
            fromData.append('tags',this.state.tagSelected)
            fromData.append('id_kategori',this.state.kategoriSelected)
            fetch(apiData.addProduk, {
                method: 'POST',
                headers:{
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
                },
                body: fromData
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
                this.setState({loading:false,disabled:false})
            })
            .catch(err=>{
                console.log(err)
                this.setState({loading:false,disabled:false})
            })
        }
    }

    render() {
        const {harga, loading,tags, spiner, kategori, disabled} = this.state;
        return (
            <Container>
                <Segment loading={loading} vertical textAlign='left' className='detail-container'>
                    <Form onSubmit={this.handleUpload}>
                        <Grid className='detail-group'>
                            <Grid.Column mobile={16} tablet={6} computer={6}>
                                <Segment style={{height:'300px'}} className='detail-image'>
                                    <Form.Field required>
                                        <Input disabled={disabled} name='img'  multiple input={{accept:"image/x-png,image/gif,image/jpeg"}} type='file'  />
                                    </Form.Field>
                                </Segment>
                                <Form.Field required>
                                    <Dropdown disabled={disabled} loading={spiner} placeholder='tags' fluid search selection options={tags} multiple allowAdditions
                                        onChange={(e,value)=>{
                                            var tmp=''
                                            for(let i = 0;i<value.value.length;i++){
                                                tmp=tmp+value.value[i]
                                                if(i!==value.value.length-1){
                                                    tmp = tmp+'|'
                                                }
                                            }
                                            this.setState({tagSelected:tmp})
                                        }}
                                        onAddItem={(e,d)=>{
                                            const tmp = tags
                                            tmp.push({key:d.value,text:d.value,value:d.value})
                                            this.setState({tags:tmp})
                                        }}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={10} computer={10}>
                                <Header className='detail-deskripsi'>
                                    <Form.Field required>
                                        <Input disabled={disabled} name='nama' fluid placeholder='Kopi Bubuk' label='Nama Produk' />
                                    </Form.Field>
                                    <Form.Field required>
                                        <Input disabled={disabled} fluid name='produsen' placeholder='KWT Muda Mudi' label='Produsen' />
                                    </Form.Field>
                                    <Form.Field required>
                                        <Dropdown 
                                            onChange={(e,value)=>{this.setState({kategoriSelected:value.value})}}
                                            name='kategori' 
                                            loading={spiner} 
                                            placeholder='Kategori' 
                                            fluid 
                                            selection 
                                            options={kategori} 
                                            disabled={disabled} 
                                        />
                                    </Form.Field>
                                    <Form.Field required>
                                        <ReactQuill 
                                            name='deskripsi'
                                            theme='snow' 
                                            placeholder='Deskripsi'
                                            onChange={(e)=>this.setState({deskripsi:e})}
                                            modules={this.modules}
                                            formats={this.formats}
                                        />
                                    </Form.Field>
                                    <Form.Field required>
                                        <Input disabled={disabled}  name='harga' pattern="[0-9]*" fluid placeholder="harga" onChange={(e)=>{
                                            const num = (e.target.validity.valid) ? e.target.value : harga
                                            this.setState({harga:num})
                                        }} value={harga} label='Harga' />
                                    </Form.Field>
                                </Header>
                                <Divider/>
                                    <Form.Field required>
                                        <Input disabled={disabled}  name='wa' placeholder='https://wa.me/xxxxxxxx' fluid label='Link Wa' />
                                    </Form.Field>
                                    <Form.Field required>
                                        <Input disabled={disabled}  name='tokped' fluid placeholder='https://tokopedia.com/xxxx' label='Link Tokopedia' />
                                    </Form.Field>
                                    <Form.Field required>
                                        <Input disabled={disabled}  name='shopee' fluid placeholder='https://shopee.com/xxxx' label='Link Shopee' />
                                    </Form.Field>
                            </Grid.Column>
                        </Grid>
                        <Container className='tags-container'>
                            <Button disabled={disabled} loading={disabled} type='submit' size='big' fluid icon='plus' content='Tambah Produk' color='blue' labelPosition='right'/>
                        </Container>
                    </Form>
                </Segment>
                <Divider className='bootom-detail' />
            </Container>
        );
    }
}

export default Add;