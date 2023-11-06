const app = require('./app'); 

app.db.migrate.latest()
  .then(() => {
    console.log('Migrações aplicadas com sucesso');
    process.exit(0);
  })
  .catch(error => {
    console.error('Falha ao aplicar migrações:', error);
    process.exit(1);
  });
