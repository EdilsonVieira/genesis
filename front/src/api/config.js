import api from './index';

const getHeaders = () => {
  const tokenSessao = sessionStorage.getItem('token');
  const tokenLocal = localStorage.getItem('token');
  const token = tokenSessao?tokenSessao:tokenLocal;
  return {
    headers: { 'Authorization': `${token}` }
  }
}
export default {
  async buscar() {
    const resultado = await api().get(`/config/select`, getHeaders());
    return resultado.data;
  },
  definir(data) {
    return api().put(`/config/update`, data, getHeaders());
  }
};
