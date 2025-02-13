import apiClient from '../../api/apiClient';

const AuthService = {
  login: async (email, password) => {
   
    const response = await apiClient.post('/token', { email, password });

    return response.data;
  },
  
};

export default AuthService;
