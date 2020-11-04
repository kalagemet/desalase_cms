import React, { Component } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button, Container, Divider, Dropdown, Form, Grid, Header, Icon, Input, Segment, Statistic } from 'semantic-ui-react';
import apiData from '../../data/api-get';
import { scroller } from 'react-scroll';
import ReactQuill from 'react-quill';

class Detail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:true, 
            noDetail:false,
            linktree:[],
            nama:'',
            produsen:'',
            id:0,
            image:[],
            harga:'',
            kategori:[],
            spiner:true,
            defaultTag:[],
            tags:[],
            tagSelected:'',
            kategoriSelected:0,
            deskripsi:'',
        }
    }

    componentDidMount(){
        const {id} =  this.props.match.params;
        this.setState({id:id})
        this.scrollTop();
        fetch(apiData.detail+id)
        .then(response => response.json())
        .then( response=> {
            if (response.error) {
                this.setState({noDetail:true, loading:false})
            }else{
                var tmp = ''
                response.tags.map((d,i)=>{
                    tmp = tmp+d
                    if(i!==response.tags.length-1){
                        tmp=tmp+'|'
                    }
                })
                this.setState({ 
                    tagSelected:tmp,
                    nama:response.nama,
                    image:response.image,
                    produsen:response.produsen,
                    kategoriSelected:response.id_kategori,
                    deskripsi:response.deskripsi,
                    harga:response.harga.replace(',',''),
                    defaultTag:response.tags,
                    linktree:response.link,
                    loading:false,
                    disabled:false,
                    spiner:false,
                })
                document.title = this.state.nama+' - desalase.id'
            }
        })
        .catch(err=>{
            console.log(err)
            document.location.href='/produk/add'
        })
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

    handleHapus=(id)=>{
        var conf = window.confirm('Anda Yakin menghapus produk')
        if (conf) {
            this.setState({loading:true})
            fetch(apiData.hapusproduk+'?id='+id,{
                headers:{
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
                },
            })
            .then(response => response.json())
            .then( response=> {
                if(!response.error){
                    alert('berhasil')
                    document.location.reload()
                }else{
                    alert('error - '+response.msg)
                }
                this.setState({loading:false})
            })
            .catch(err=>{
                alert(err)
                console.log(err)
                this.setState({loading:false})
            })
        }
    }
    handleUpdate=(e)=>{
        var conf = window.confirm('Anda Yakin  ?')
        if (conf) {
            if(e.target.nama.value==='' ||
            e.target.produsen.value==='' ||
            e.target.id.value==='' ||
            this.state.kategoriSelected==='' ||
            this.state.deskripsi==='' ||
            this.state.tagSelected==='' ||
            e.target.harga.value===0 ||
            e.target.wa.value==='' ||
            e.target.tokped.value==='' ||
            e.target.shopee.value===''){
                alert('form tidak lengkap')
                document.location.reload()
            }else{
                this.setState({loading:true,disabled:true})
                const fromData = new FormData()
                fromData.append('id',e.target.id.value)
                fromData.append('nama',e.target.nama.value)
                fromData.append('desk',this.state.deskripsi)
                if(e.target.img.files.length>0){
                    for(const file of e.target.img.files){
                        fromData.append('img[]',file, file.name)
                    }
                }
                fromData.append('produsen',e.target.produsen.value)
                fromData.append('harga',e.target.harga.value)
                fromData.append('url',e.target.wa.value+'|'+e.target.tokped.value+'|'+e.target.shopee.value)
                fromData.append('tags',this.state.tagSelected)
                fromData.append('id_kategori',this.state.kategoriSelected)
                fetch(apiData.uppProduk, {
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
    }


    handleHapusGambar(e,id){
        var conf = window.confirm('Anda Yakin menghapus '+e+' dari produk?')
        if (conf) {
            this.setState({disabled:true,loading:true})
            var data = {
                'id' : id,
                'data' : e
            }
            fetch(apiData.hapusGambarProduk,{
                method:'post',
                headers: {
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(data)
            })
            .then(response => response.json())
            .then( response=> {
                if(!response.error){
                    alert('berhasil')
                    document.location.reload()
                }else{
                    alert('error - '+response.msg)
                }
                this.setState({disabled:true,loading:false})
            })
            .catch(err=>{
                alert(err)
                console.log(err)
                this.setState({disabled:true,loading:false})
            })
        }
    }

    render() {
        const {
            loading,
            spiner,
            id,
            kategori,
            harga,
            image,
            linktree,
            deskripsi,
            disabled,
            tags,
            kategoriSelected,
            defaultTag, 
            noDetail,
            nama,
            produsen
        } = this.state;
        return (
            <Container>
                {noDetail ? 
                <Statistic className='no-produk-msg' label='Tidak ada produk yang dapat ditampilkan' value='Tidak Tersedia' text /> 
                :
                <Segment loading={loading} vertical textAlign='left' className='detail-container'>
                    <Form onSubmit={this.handleUpdate}>
                        <Grid className='detail-group'>
                            <Grid.Column mobile={16} tablet={6} computer={6}>
                                <Segment style={{height:'300px'}} className='detail-image'>
                                    <Form.Field style={{display:'none'}} required>
                                        <Input disabled name='id' value={id}/>
                                    </Form.Field>
                                    {(image.length>0)?image.map((d,i)=>(
                                        <Button onClick={()=>this.handleHapusGambar(d,id)} type='button' style={{marginBottom:'5px'}} key={i} fluid icon color='orange' labelPosition='right'>
                                            <Icon name='close'/>
                                            Hapus Gambar {i+1}
                                        </Button>
                                    )):''}
                                    <Header as='h4' textAlign='center'>Tambah Gambar</Header>
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
                                            this.setState({tagSelected:tmp,defaultTag:value.value})
                                        }}
                                        onAddItem={(e,d)=>{
                                            const tmp = tags
                                            tmp.push({key:d.value,text:d.value,value:d.value})
                                            this.setState({tags:tmp})
                                        }}
                                        value={defaultTag}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={10} computer={10}>
                                <Header className='detail-deskripsi'>
                                    <Form.Field required>
                                        <Input disabled={disabled} defaultValue={nama} name='nama' fluid placeholder='Kopi Bubuk' label='Nama Produk' />
                                    </Form.Field>
                                    <Form.Field required>
                                        <Input disabled={disabled} defaultValue={produsen}  fluid name='produsen' placeholder='KWT Muda Mudi' label='Produsen' />
                                    </Form.Field>
                                    <Form.Field required>
                                        <Dropdown 
                                            onChange={(e,value)=>{this.setState({kategoriSelected:value.value})}}
                                            name='kategori' 
                                            value={kategoriSelected}
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
                                            value={deskripsi}
                                            modules={this.modules}
                                            formats={this.formats}
                                        />
                                    </Form.Field>
                                    <Form.Field required>
                                        <Input disabled={disabled} name='harga' pattern="[0-9]*" fluid placeholder="harga" onChange={(e)=>{
                                            const num = (e.target.validity.valid) ? e.target.value : harga
                                            this.setState({harga:num})
                                        }} value={harga} label='Harga' />
                                    </Form.Field>
                                </Header>
                                <Divider/>
                                    <Form.Field required>
                                        <Input disabled={disabled} defaultValue={linktree[0]} name='wa' placeholder='https://wa.me/xxxxxxxx' fluid label='Link Wa' />
                                    </Form.Field>
                                    <Form.Field required>
                                        <Input disabled={disabled} defaultValue={linktree[1]} name='tokped' fluid placeholder='https://tokopedia.com/xxxx' label='Link Tokopedia' />
                                    </Form.Field>
                                    <Form.Field required>
                                        <Input disabled={disabled} defaultValue={linktree[2]} name='shopee' fluid placeholder='https://shopee.com/xxxx' label='Link Shopee' />
                                    </Form.Field>
                            </Grid.Column>
                        </Grid>
                        <Container className='tags-container'>
                            <Button disabled={disabled} loading={disabled} type='submit' size='big' fluid icon='refresh' content='Update Produk' color='green' />
                            <br/><Button type='button' basic disabled={disabled} onClick={()=>this.handleHapus(id)} loading={disabled} size='big' fluid icon='trash' content='Hapus Produk' color='red'/>
                        </Container>
                    </Form>
                </Segment>}
                <Divider className='bootom-detail' />
            </Container>
        );
    }
}

export default Detail;