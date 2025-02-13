import apiClient from '../../api/apiClient';

const AuthService = {
  login: async (email, password) => {
    // This matches the given "Request URL: https://oro24world.com/api/token"
    // with "x-app-id: KYCTY" header
    const response = await apiClient.post('/token', { email, password });
    // Suppose the API returns { token: "...", ... }
    return response.data;
  },
  // Add other methods for register, etc. if needed
};

export default AuthService;
