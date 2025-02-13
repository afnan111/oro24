import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import InventoryService from './InventoryService';

export const fetchAllInventory = createAsyncThunk(
  'inventory/fetchAllInventory',
  async (_, { rejectWithValue }) => {
    try {
      // You can pass parameters if needed. For now, we hardcode as per your example.
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
    items: [],     // Ensure items is always an array
    loading: false,
    error: null,
    selectedUnits: [],
  },
  
  reducers: {
    toggleUnitSelection: (state, action) => {
      const unitId = action.payload;
      if (state.selectedUnits.includes(unitId)) {
        // If already selected, remove it
        state.selectedUnits = state.selectedUnits.filter((id) => id !== unitId);
      } else {
        // Otherwise, add it
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
        state.items = action.payload; // adapt to match the actual API response shape
      })
      .addCase(fetchAllInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleUnitSelection } = inventorySlice.actions;
export default inventorySlice.reducer;
