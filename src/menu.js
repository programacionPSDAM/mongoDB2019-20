const menu = require('simple-menu');
const readline = require('readline-sync')
const client = require('./db/conexion')
const findDocuments = require('./db/findAll')
const removeDocuments=require('./db/removeByCountry')
const insertDocuments=require('./db/insertDocument')
const updateDocument=require('./db/updateCountryName')

const db = client.db("dbGeografica");

menu.reset();
 
menu.addText('Menú principal');
menu.addBreak('-', 60);
 
menu.addOption('Listar todos los datos', function() {
  console.log('Listar todos los datos');
  findDocuments(db, (err, docs) => {
    if (err) console.log(err)
    else {
      console.log(`Nº documentos: ${docs.length}`)
      console.log(docs)
      client.close()
    }
  })
  
});


menu.addOption('Listar ciudades según pais', () => {
  const nameCountry = readline.question("Introduce pais: ");
  console.log(`Introducido ${nameCountry}`)
  findDocuments(db, (err, docs) => {
    if (err) console.log(err)
    else {
      console.log(docs.filter(documento => documento.pais === nameCountry)
                      .map(documento => documento.ciudad))
      client.close()
    }
  })
});

menu.addOption('Borrar ciudades según pais', () => {
    const nameCountry = readline.question("Introduce pais: ");
    console.log(`Introducido ${nameCountry}`)
    removeDocuments(db, nameCountry, (err, docs) => {
      if (err) console.log(err)
      console.log(`Borrados:  ${docs.deletedCount}`)
      client.close()
    });
});



  menu.addOption('Insertar documento', () => {
    const nameCity = readline.question("Introduce ciudad: ");
    const nameCountry = readline.question("Introduce pais: ");
    const zone= readline.question("Zona horaria: ");
    const latitud = readline.question("latitud ciudad: ");
    const longitud = readline.question("longitud ciudad: ");
    const documento = { ciudad: nameCity,
    pais: nameCountry,
    zonaHoraria: zone,
    latitud: latitud * 1.0,
    longitud: longitud * 1.0}

    insertDocuments(db, documento, (err, docs) => {
      if (err) console.log(err)
      console.log(`${docs.insertedCount} documentos insertados`)
      client.close()
    });
});

 
menu.addOption('Actualizar pais', () => {
  const oldPais = readline.question("Introduce pais existente: ");
  const newPais = readline.question("Introduce nuevo pais: ");
  updateDocument(db, oldPais, newPais ,(err, docs) => {
    if (err) console.log(err)
    console.log(`${docs.modifiedCount} documentos actualizados`)
    client.close()
  });
});

menu.addBreak('-', 60);
menu.addQuit();
 
menu.init('What would you like to do?');