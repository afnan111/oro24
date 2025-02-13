import apiClient from '../../api/apiClient';

const InventoryService = {
  fetchAllInventory: async (body) => {
   
    const response = await apiClient.post(
      '/HandOverProjectDelivery/inventory/floor-inventory-byBlock',
      body
    );
    return response.data;
  },
 
};

export default InventoryService;




