import api from './index';

const config = () => {
  const tokenSessao = sessionStorage.getItem('token');
  const tokenLocal = localStorage.getItem('token');
  const token = tokenSessao?tokenSessao:tokenLocal;
  return {
    headers: { 'Authorization': `${token}` }
  }
}
export default {
  async buscarImagem(id) {
    const resultado = await api().get(`/imagem/select/${id}`, config());
    //console.log(`Em buscar imagem length: ${JSON.stringify(resultado.data)}`)
    return resultado.data;
  },
  criarImagem(data) {
    return api().post('/imagem/insert', data, config());
  },
  atualizarImagem(data) {
    return api().put(`/imagem/update/${data.id}`, data, config());
  },
  excluirImagem(id) {
    return api().delete(`/imagem/delete/${id}`, null, config());
  },
};
