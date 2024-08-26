
const PORT = process.env.PORT || 3000;

const app = require('./routes/index');

app.http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
