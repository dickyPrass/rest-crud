const express = require('express')
const app = express()
const port = 3000


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(express.static('IniPublic'));



var mysql      = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'counter'
});





app.get('/show', (req, res) => {
  connection.query('SELECT * FROM produk', function (error, results, fields) {
   try {
      if(error)throw error;
      res.send({status: 'true', data: results})
   } catch (error) {
    console.log(error);
    res.send({status: 'false', message: 'Ada yang salah'})
   }
    
  });
})

app.post('/insert', (req, res) => {
  let namaMerk = req.body.namaMerk
  let harga = req.body.harga

  pool.query('INSERT INTO produk (merk,harga) VALUES ("' + namaMerk + '" , "' + harga + '");', function(error, results,fields){
    try {
      if(error)throw error;
      res.send({status: 'true', data: results})
   } catch (error) {
    console.log(error);
    res.send({status: 'false', message: 'Ada yang salah'})
   }
    
  });
  

 
})

app.post('/update', (req, res) => {
  let idData = req.body.idData
  let namaMerk = req.body.namaMerk
  let harga = req.body.harga

  pool.query('UPDATE produk SET merk = "'+ namaMerk+'", harga = "'+harga+'" WHERE ID = "'+idData+'";', function(error, results,fields){
    try {
      if(error)throw error;
      res.send({status: 'true',message: 'Data Berhasil di Ubah'})
   } catch (error) {
    console.log(error);
    res.send({status: 'false', message: 'Ada yang salah'})
   }
    
  });

})

app.post('/delete', (req, res) => {
  let idData = req.body.idData

  pool.query('DELETE FROM produk WHERE ID = "'+idData+'";', function(error, results,fields){
    try {
      if(error)throw error;
      res.send({status: 'true',message: 'Data Berhasil di HAPUSSS'})
   } catch (error) {
    console.log(error);
    res.send({status: 'false', message: 'Ada yang salah'})
   }
    
  });
  

  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})