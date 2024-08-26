import api from './index';

// solicitar requisicao ao servidor
export default {

  async login(data) {
    const resultado = await api().post(`auth/login`, data);
    const token = resultado.data.token;
    sessionStorage.setItem('token', token);
    return resultado.data;
  },


}  
