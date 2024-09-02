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
  buscarImagem(id) {
    const resultado = api().get(`/imagem/select/${id}`, config());
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
