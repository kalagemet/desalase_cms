import React, { useState } from 'react';
import { Button, Divider, Header, Icon, Input, Segment } from 'semantic-ui-react';
import apiData from '../../data/api-get';
import Kalatog from './Katalog';

export function Home(props){
    const [banner, setBanner] = useState('') 
    const [img, setImg] = useState('') 
    const [proses, setProses] = useState(false) 
    fetch(apiData.bannerImage)
    .then(response => response.json())
    .then( response=> {
        setBanner(response)
    })
    .catch(err=>{
        console.log(err)
    })
    return (
        <div className='page'>
            <div className='banner-image' style={{backgroundImage:'url('+banner+')'}}>
                <Header as='h1'>Admin Web Page</Header>
                <br/>
                <br/>
                <Input
                    size='big'
                    type='file'
                    id='setB'
                    className='home-search'
                    input={{accept: '.jpg'}}
                    placeholder='Upload banner image'
                    onChange={(e)=>setImg(e.target.files[0])}
                    action={
                        <Button as='a' onClick={
                            ()=>{
                                if (img && !proses) {
                                    setProses(true)
                                    const fromData = new FormData()
                                    fromData.append('image',img)
                                    fetch(apiData.setBanner, {
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
                                        setProses(false)
                                    })
                                    .catch(err=>{
                                        console.log(err)
                                        setProses(false)
                                    })
                                }else{
                                    document.getElementById('setB').focus();
                                }
                            }
                        } 
                        icon={<Icon size='large' loading={proses} name={proses ? 'circle notched' : 'upload'} circular inverted link />} />
                    }
                />
            </div>
            <Divider className='divider-page' />
            <Segment className='page-content' vertical>
                <Kalatog>
                    {props.children}
                </Kalatog>
            </Segment>
        </div>
    );
}