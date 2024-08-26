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
  async getUsers() {    
    const resultado = await api().get('/user/select', config());
    return resultado.data;
  },
  async getUser(id) {
    const resultado = await api().get(`/user/select/${id}`, config());
    return resultado.data;
  },
  createUser(data) {
    return api().post('/user/insert', data, config());
  },
  updateUser(data) {
    return api().put(`/user/update/${data.id}`, data, config());
  },
  deleteUser(id) {
    return api().delete(`/user/delete/${id}`, null, config());
  },
};
