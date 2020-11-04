let base_api = 'https://api.desalase.id';
// let base_api = 'http://localhost:5000';
let apiData = {
    'bannerImage' : base_api+'/getbanner',
    'setBanner' : base_api+'/setbanner',

    'logo' : base_api+'/getlogo',

    'footer': base_api+'/getfooterdata',
    'tambahToko':base_api+'/tambahtoko',
    'hapusToko':base_api+'/hapustoko',
    'updateToko':base_api+'/updatetoko',
    'tambahAlamat':base_api+'/tambahfoot',
    'hapusAlamat':base_api+'/hapusfoot',
    'updateAlamat':base_api+'/updatefoot',

    'favorite': base_api+'/getproduk',
    'new': base_api+'/getprodukbaru',
    'makanan': base_api+'/getprodukbykategori?kategori=makanan',
    'minuman': base_api+'/getprodukbykategori?kategori=minuman',
    'lain': base_api+'/getprodukbykategori?kategori=lain',
    'buah': base_api+'/getprodukbykategori?kategori=buah',
    'tanaman': base_api+'/getprodukbykategori?kategori=tanaman',
    'hewani': base_api+'/getprodukbykategori?kategori=hewani',
    'jasa': base_api+'/getprodukbykategori?kategori=jasa',
    'konveksi': base_api+'/getprodukbykategori?kategori=konveksi',
    'detail' :base_api+'/getdetail?id=',
    'tag' :base_api+'/caritag?tag=',
    'cari' :base_api+'/cariproduk?key=',
    'hapusproduk' : base_api+'/hapusproduk',

    'tentang' :base_api+'/gettentangadmin', 
    'addtentang' : base_api+'/puttentang',
    'updatetentang' : base_api+'/updatetentang',
    'deltentang' : base_api+'/deletetentang',

    'getKategori' : base_api+'/getkategori',
    'getTags' : base_api+'/gettags',

    'addProduk': base_api+'/saveproduk',
    'uppProduk': base_api+'/updateproduk',

    'hapusGambarProduk': base_api+'/delgambarproduk',

    'login' : base_api+'/oauth/token',
    'client_id':2,
    'client_secret':'AbmLYlIeor9p47Qt4Tz5Ovi19vEKzbDvINeQeTIQ'
}

export default apiData;