import React, { Component } from 'react';
import { scroller } from 'react-scroll';
import { Button, Container, Divider, Form, Header, Image, Input, Segment } from 'semantic-ui-react';
import apiData from '../../data/api-get';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Tentang extends Component{
    constructor(props) {
        super(props);
        this.state = {
            logo:'',
            loading:true,
            tentang:[],
            newTentang:'',
            data:[],
            addTentangLoading: false,
            hapusLoading:false,
            updateLoading:false,
            disabledbutton:false
        }
    }

    modules = {
        toolbar : [
            ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
            ['blockquote', 'code-block'],                    // blocks
            // [{ 'header': 1 }, { 'header': 2 }],              // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
            // [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
            [{ 'direction': 'rtl' }],                        // text direction
            // [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
            [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
            // [{ 'font': [] }],                                // font family
            [{ 'align': [] }],                               // text align
            ['clean'],                                       // remove formatting
        ]
    }

    formats = [
        'header', 'font', 'background', 'color', 'code', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'script', 'align', 'direction',
        'link', 'image', 'code-block', 'formula', 'video'
    ]

    handleUpdate=(e)=>{
        var header=e.target.header
        var data=e.target.updateSub.id-100
        data = this.state.data[data]
        if(header.value==='' || data===''){
            header.focus()
        }else{
            var conf = window.confirm('Anda Yakin memperbarui '+header.value)
            if (conf) {
                this.setState({disabledbutton:true,updateLoading:true})
                var dataBody = {
                    'id' : e.target.id.value,
                    'header' : header.value,
                    'data' : data
                }
                fetch(apiData.updatetentang,{
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
                    this.setState({disabledbutton:false,updateLoading:false})
                })
                .catch(err=>{
                    alert(err)
                    console.log(err)
                    this.setState({disabledbutton:false,updateLoading:false})
                })
            }
        }
    }

    handleHapus=(e)=>{
        var conf = window.confirm('Anda Yakin menghapus '+e.target.name)
        if (conf) {
            var id = e.target.id
            this.setState({disabledbutton:true,hapusLoading:true})
            fetch(apiData.deltentang+'?id='+id,{
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
                this.setState({disabledbutton:false,hapusLoading:false})
            })
            .catch(err=>{
                alert(err)
                console.log(err)
                this.setState({disabledbutton:false,hapusLoading:false})
            })
        }
    }

    handleSubmitNew=(e)=>{
        var header = e.target.header
        var dataNew = this.state.newTentang
        if(header.value ==='' || dataNew===''){
            header.focus()
        }else{
            this.setState({disabledbutton:true,addTentangLoading:true})
            var data = {
                'header' : header.value,
                'data' : dataNew
            }
            fetch(apiData.addtentang,{
                method:'post',
                headers: {
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
                    'Content-Type': 'application/json'},
                body : JSON.stringify(data)
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
                this.setState({disabledbutton:false,addTentangLoading:false})
            })
            .catch(err=>{
                alert(err)
                console.log(err)
                this.setState({disabledbutton:false,addTentangLoading:false})
            })
        }
    }
    
    componentDidMount(){
        document.title = 'Tentang desalase.id'
        scroller.scrollTo('divider-page',{
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        })
        fetch(apiData.logo)
        .then(response => response.json())
        .then( response=> {
            this.setState({logo:response})
        })
        .catch(err=>{
            console.log(err)
        })
        fetch(apiData.tentang,{
            headers:{
                'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
            }
        })
        .then(response => response.json())
        .then( response=> {
            this.setState({loading:false,tentang:response})
            response.forEach((d,i)=>{
                const tmp = this.state.data.slice()
                tmp[i]=d.data
                this.setState({data:tmp})
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    onChangeTextArea=(e,i)=>{
        const tmp = this.state.data.slice()
        if(tmp[i]!==e){
            tmp[i]=e
            this.setState({data:tmp})
        }
    }

    onChangeNewTextArea=(e)=>{
        this.setState({newTentang:e})
    }

    render() {
        const {logo, loading, updateLoading, tentang, addTentangLoading, hapusLoading, disabledbutton} = this.state
        return (
            <Segment style={{zIndex:0}} loading={loading} vertical className='tentang-segment'>
                {loading?<br/>:
                <div>
                <Image centered size='medium' src={logo} />
                <br/>
                <Container textAlign='justified'>
                    {tentang.map((d,i)=>(
                        <div>
                        <Form onSubmit={this.handleUpdate}>
                            <Form.Field style={{display:'none'}}>
                                <Input name='id' disabled value={d.id}/>
                            </Form.Field>
                            <Form.Field>
                                <Input name='header' disabled={disabledbutton} id={'header_'+d.id} label='Header'  defaultValue={d.header}/>
                            </Form.Field>
                            <Form.Field>
                                <ReactQuill 
                                    disabled={disabledbutton}
                                    onChange={(e)=>this.onChangeTextArea(e,i)}
                                    defaultValue={d.data}
                                    theme='snow' 
                                    placeholder='Deskripsi'
                                    modules={this.modules}
                                    formats={this.formats}
                                />
                            </Form.Field>
                            <Button.Group fluid>
                                <Button type='submit' name='updateSub' id={i+100} color='yellow' loading={updateLoading} disabled={disabledbutton} content='Perbarui' />
                                <Button.Or text='/' />
                                <Button color='red' id={d.id} name={d.header} loading={hapusLoading} disabled={disabledbutton} onClick={this.handleHapus} content='Hapus' />
                            </Button.Group>
                        </Form>
                        <Divider/>
                        <br/></div>
                    ))}
                        <br/>
                        <Header textAlign='center'>Tambah</Header>
                        <Form onSubmit={this.handleSubmitNew} method='post'>
                            <Form.Field>
                                <Input disabled={disabledbutton} name='header' label='Header'/>
                            </Form.Field>
                            <Form.Field>
                                <ReactQuill 
                                    disabled={disabledbutton}
                                    onChange={this.onChangeNewTextArea}
                                    theme='snow' 
                                    placeholder='Deskripsi'
                                    modules={this.modules}
                                    formats={this.formats}
                                />
                            </Form.Field>
                            <Button type='submit' disabled={disabledbutton} loading={addTentangLoading} fluid basic color='blue' content='Tambah' />
                        </Form>
                </Container>
                </div>}
            </Segment>
        );
    }
}

export default Tentang;