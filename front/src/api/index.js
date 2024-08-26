import axios from "axios";

export default() => {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  })
  // Interceptar as requisições com erro de autorização...
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Verifica se o erro é "Unauthorized" (401 ou 403)
      if (error.response.status === 401 || error.response.status === 403) {
        // Redireciona para a rota de login (caso já não esteja)
        let domain = (new URL(window.location));
        if (domain.pathname !== '/') {
          sessionStorage.clear();
          window.location.href = `${domain.protocol}//${domain.hostname}:${domain.port}/`;
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
};
