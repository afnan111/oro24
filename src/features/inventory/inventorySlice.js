import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import InventoryService from './InventoryService';

export const fetchAllInventory = createAsyncThunk(
  'inventory/fetchAllInventory',
  async (_, { rejectWithValue }) => {
    try {
    
      const data = await InventoryService.fetchAllInventory({
        ProjectID: 1,
        apt_type: 'All',
        block: 'All',
        ProjectDeliveryStatusID: 1,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: [],     
    loading: false,
    error: null,
    selectedUnits: [],
  },
  
  reducers: {
    toggleUnitSelection: (state, action) => {
      const unitId = action.payload;
      if (state.selectedUnits.includes(unitId)) {
        
        state.selectedUnits = state.selectedUnits.filter((id) => id !== unitId);
      } else {
      
        state.selectedUnits.push(unitId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; 
      })
      .addCase(fetchAllInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleUnitSelection } = inventorySlice.actions;
export default inventorySlice.reducer;
