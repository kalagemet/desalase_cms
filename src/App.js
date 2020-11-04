import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppLayout } from './assets/container/layout/AppLayout';
import Detail from './assets/page/Detail';
import Add from './assets/page/Add';
import Error from './assets/page/Erorr';
import Produk from './assets/page/Produk';
import Tentang from './assets/page/Tentang';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Switch>
          <Route exact path='/' component={()=><Produk makanan home />}/>
          <Route path='/beranda' component={()=><Produk makanan home />}/>
          <Route path='/tentang' component={Tentang} />
          <Route exact path='/etalase' component={()=><Produk makanan />}/>
          <Route path='/etalase/jasa' component={()=><Produk jasa />}/>
          <Route path='/etalase/konveksi' component={()=><Produk konveksi />}/>
          <Route exact path='/etalase/umkm/' component={()=><Produk makanan />}/>
          <Route path='/etalase/umkm/makanan' component={()=><Produk makanan />}/>
          <Route path='/etalase/umkm/minuman' component={()=><Produk minuman />}/>
          <Route path='/etalase/umkm/lainya' component={()=><Produk lain />}/>
          <Route exact path='/etalase/pertanian/' component={()=><Produk buah />}/>
          <Route path='/etalase/pertanian/buah' component={()=><Produk buah />}/>
          <Route path='/etalase/pertanian/tanaman' component={()=><Produk tanaman />}/>
          <Route path='/etalase/pertanian/hewani' component={()=><Produk hewani />}/>

          <Route exact path='/etalase/tags' component={()=><Produk fav />}/>
          <Route path='/etalase/tags/:tag' component={Produk}/>

          <Route exact path='/etalase/cari' component={()=><Produk fav />}/>
          <Route path='/etalase/cari/:key' component={Produk}/>

          <Route exact path='/produk/detail' component={Detail}/>
          <Route exact path='/produk/add' component={Add}/>
          <Route path='/produk/detail/:id' component={Detail}/>

          <Route path='*' component={()=><Error error='404' suberror='halaman yang anda tuju tidak tersedia' />}/>
        </Switch>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
