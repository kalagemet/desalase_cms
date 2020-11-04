import React, { Component } from 'react';
import { scroller } from 'react-scroll';
import { Button, Card, Container, Header, Icon, Image, Message, Segment, Statistic } from 'semantic-ui-react';
import apiData from '../../data/api-get';
import { Link } from 'react-router-dom';

class Produk extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            dataProduk:[],
            noProduk:false, 
            loading:true, 
            moreProduk: false,
            linkMore: '',
            loadingMore: false,
            header: 'Menampilkan Produk Populer',
            content:'Semoga anda menyukainya'
        };
    }
    
    componentDidMount(){
        this.filter();
        document.title = 'Etalase Desa | desalase.id'
    }

    componentDidUpdate(){
        document.title = this.state.header+' - Etalase Desa | desalase.id'
    }
    
    getDataProduk(url){
        fetch(url)
        .then(response => response.json())
        .then( response=> {
            if(response.next_page_url===null){
                this.setState({moreProduk:false})
            }else{
                this.setState({moreProduk:true, linkMore:response.next_page_url})
            }
            if(response.data.length===0){
                this.setState({ noProduk:true, loading:false})
            }else{
                this.setState({ dataProduk:response.data, loading:false})
            }
        })
        .catch(err=>{
            console.log(err)
            this.setState({ noProduk:true, loading:false})
        })
    }

    loadMoreProduk = () =>{
        this.setState({loadingMore:true})
        if(this.state.linkMore!==null){
            fetch(this.state.linkMore)
            .then(response => response.json())
            .then( response=> {
                if(response.next_page_url===null){
                    this.setState({moreProduk:false})
                }else{
                    this.setState({
                        moreProduk:true, 
                        linkMore:response.next_page_url
                    })
                }
                for (let i = 0; i < response.data.length; i++) {
                    this.state.dataProduk.push(response.data[i])
                }
                this.setState({loading:false, loadingMore:false})
            })
            .catch(err=>{
                console.log(err)
                alert(err)
            })
        }
    }
    
    filter(){
        let key = ''
        let tag = ''
        if (this.props.match) {
            key=this.props.match.params.key 
            tag=this.props.match.params.tag   
        }
        if(this.props.makanan) {
            this.setState({header: 'Menampilkan Produk Makanan',content:'makanan dari UMKM persembahan desalase.id'})
            this.getDataProduk(apiData.makanan)
        }else if (this.props.minuman) {
            this.setState({header: 'Menampilkan Produk Minuman',content:'minuman dari UMKM persembahan desalase.id'})
            this.getDataProduk(apiData.minuman)
        }else if (this.props.lain) {
            this.setState({header: 'Menampilkan Produk UMKM Lainya',content:'lainya dari UMKM persembahan desalase.id'})
            this.getDataProduk(apiData.lain)
        }else if (this.props.buah) {
            this.setState({header: 'Menampilkan Produk Buah',content:'produk buah segar'})
            this.getDataProduk(apiData.buah)
        }else if (this.props.tanaman) {
            this.setState({header: 'Menampilkan Produk Tanaman',content:'produk tanaman hasil bumi'})
            this.getDataProduk(apiData.tanaman)
        }else if (this.props.hewani) {
            this.setState({header: 'Menampilkan Produk Hewani',content:'produk olahan dari hewan'})
            this.getDataProduk(apiData.hewani)
        }else if (this.props.jasa) {
            this.setState({header: 'Menampilkan Produk Jasa',content:'produk jasa persembahan desalase.id'})
            this.getDataProduk(apiData.jasa)
        }else if (this.props.konveksi) {
            this.setState({header: 'Menampilkan Produk Konveksi',content:'produk konveksi dari desalase.id'})
            this.getDataProduk(apiData.konveksi)
        }else{
            if (tag) {
                this.setState({header: 'Produk #'+this.props.match.params.tag,content:'menampilkan produk yang berhubungan dengan '+this.props.match.params.tag})
                this.getDataProduk(apiData.tag+this.props.match.params.tag)
            }else if(key){
                this.setState({header: 'Hasil Pencarian "'+this.props.match.params.key+'"',content:'menampilkan produk yang berhubungan dengan '+this.props.match.params.key})
                this.getDataProduk(apiData.cari+this.props.match.params.key)
            }else{
                this.getDataProduk(apiData.favorite)
            }
        }
        if (!this.props.home) {
            scroller.scrollTo('divider-page', {
                duration: 800,
                delay: 0,
                smooth: "easeInOutQuart",
            });
        }
        // else if (this.props.tentang) {
        //     scroller.scrollTo('footer-container', {
        //         duration: 800,
        //         delay: 0,
        //         smooth: "easeInOutQuart",
        //     });
        // }
    }

    handleHapus=(e)=>{
        var conf = window.confirm('Anda Yakin menghapus '+e.target.name)
        if (conf) {
            var id = e.target.id
            this.setState({loading:true})
            fetch(apiData.hapusproduk+'?id='+id)
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

    render() {
        const {
            moreProduk,
            header,
            content,
            loading,
            dataProduk,
            noProduk,
            loadingMore
        } = this.state;
        return (
            <Container vertical className='produk-container'>
                <Button icon='plus circle' basic positive size='huge' content='Tambah Produk' as={Link} to={'/produk/add'} fluid />
                <Message as='h1'
                    visible
                    color='blue'
                    icon='sort amount down'
                    header={header}
                    content={content}
                /><br/>
                {noProduk ? 
                <Statistic className='no-produk-msg' label='Tidak ada produk yang dapat ditampilkan' value='Tidak Tersedia' text /> :
                <Segment vertical loading={loading}>
                    <Card.Group centered>
                        {dataProduk.map((d,i)=>(
                            <Card key={i} centered className='produk-card'>
                                <Image className='produk-img' style={{background:'url('+d.img+') no-repeat center'}} wrapped ui={false} />
                                <Card.Content textAlign='left'>
                                    <Card.Header>{d.nama}</Card.Header>
                                    <Card.Meta>{d.produsen}</Card.Meta>
                                    <Card.Description>
                                        <Header color='green' as='h2' textAlign='right'>
                                            Rp. {d.harga}
                                        </Header> 
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button.Group fluid vertical>
                                        <Button fluid color='yellow' as='a' href={'/produk/detail/'+d.id} >
                                            <Icon name='edit outline' />
                                            Edit
                                        </Button>
                                        <Button id={d.id} fluid basic color='orange' onClick={this.handleHapus} >
                                            <Icon name='trash alternate outline' />
                                            Hapus
                                        </Button>
                                    </Button.Group>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                    {moreProduk ?
                    <Button disabled={loadingMore} onClick={this.loadMoreProduk} loading={loadingMore} content='Lihat Lainnya' icon='arrow down' labelPosition='right' basic color='blue'/>
                    :<Message
                        color='yellow'
                        icon='zip'
                        header='Item terakhir'
                        content='Tidak tersedia lebih banyak lagi'
                    />}
                </Segment>}
            </Container>
        );
    }
}

export default Produk;