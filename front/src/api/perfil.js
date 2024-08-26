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
  async getPerfis() {    
    const resultado = await api().get('/perfil/select', config());
    return resultado.data;
  },
  async getPerfil(id) {
    const resultado = await api().get(`/perfil/select/${id}`, config());
    return resultado.data;
  },
  createPerfil(data) {
    return api().post('/perfil/insert', data, config());
  },
  updatePerfil(data) {
    return api().put(`/perfil/update/${data.id}`, data, config());
  },
  deletePerfil(id) {
    return api().delete(`/perfil/delete/${id}`, null, config());
  },
};
