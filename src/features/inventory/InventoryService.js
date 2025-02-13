import apiClient from '../../api/apiClient';

const InventoryService = {
  fetchAllInventory: async (body) => {
    // POST to /HandOverProjectDelivery/inventory/floor-inventory-byBlock
    const response = await apiClient.post(
      '/HandOverProjectDelivery/inventory/floor-inventory-byBlock',
      body
    );
    return response.data;
  },
  // Add other calls, e.g. GET Spaces, Assign Inspection, etc.
};

export default InventoryService;




