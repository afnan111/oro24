import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';

const DashboardHome = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [activeBlock, setActiveBlock] = useState('BLOCK 1');
  const [selectedApartmentType, setSelectedApartmentType] = useState('All');

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        // Fetch token
        const tokenResponse = await fetch('https://oro24world.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': 'KYCTY',
          },
          body: JSON.stringify({
            email: 's.amreen@yopmail.com',
            password: '123',
          }),
        });

        if (!tokenResponse.ok) {
          throw new Error('Failed to fetch token');
        }

        const tokenData = await tokenResponse.json();
        const token = tokenData.token;

        // Fetch inventory data with the token
        const inventoryResponse = await fetch('https://oro24world.com/api/HandOverProjectDelivery/inventory/floor-inventory-byBlock', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            ProjectID: 1,
            apt_type: 'All',
            block: 'All',
            ProjectDeliveryStatusID: 1,
          }),
        });

        if (!inventoryResponse.ok) {
          throw new Error('Failed to fetch inventory');
        }

        const inventoryData = await inventoryResponse.json();
        const projectDeliveries = inventoryData[0]?.ProjectDeliveries || [];
        setItems(projectDeliveries);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenAndData();
  }, []);

  const handleBlockClick = (block) => setActiveBlock(block);
  const handleUnitClick = (unitId) => setSelectedUnits((prev) =>
    prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId]
  );

  const handleAssignInspection = async () => {
    try {
      const selectedItems = items.filter(item => selectedUnits.includes(item.ProjectDeliveryID));

      if (selectedItems.length > 0) {
        const payload = selectedItems.map((unit) => ({
          InventoryID: unit.ProjectDeliveryID,
          Spaces: [
            {
              SpaceID: 5, 
              Space: 'Bedroom',
              Activities: [
                { Activity: 'HVAC', ActivityID: 7 },
                { Activity: 'Ceiling', ActivityID: 1 },
                { Activity: 'Wiring Accessories', ActivityID: 18 },
                { Activity: 'Glass & Aluminium', ActivityID: 5 },
                { Activity: 'Wall', ActivityID: 15 },
                { Activity: 'Door', ActivityID: 2 },
                { Activity: 'Joinery', ActivityID: 8 },
                { Activity: 'Fire Protection', ActivityID: 3 },
                { Activity: 'Lights', ActivityID: 9 },
                { Activity: 'Tiling', ActivityID: 14 },
              ],
            },
          ],
        }));

        const response = await fetch('https://oro24world.com/api/HandOverProjectDelivery/add-inspection-space', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Failed to assign inspection');
        }

        alert('Inspection Assigned Successfully');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredItems = items.filter((unit) => {
    const floorMatch = `Floor 1`.toLowerCase().trim() === unit.FloorNo.toLowerCase().trim() || `Floor 2`.toLowerCase().trim() === unit.FloorNo.toLowerCase().trim();
    const apartmentTypeMatch = selectedApartmentType === 'All' || unit.ApartmentType === selectedApartmentType;
    return floorMatch && apartmentTypeMatch;
  });

  return (
    <div className="dashboard-home">
      <h3>Torino by ORO24</h3>

      <div className="block-tabs">
        {['BLOCK 1', 'BLOCK 2', 'BLOCK 3', 'BLOCK 4', 'BLOCK 5'].map((block) => (
          <button
            key={block}
            className={`block-tab ${activeBlock === block ? 'active' : ''}`}
            onClick={() => handleBlockClick(block)}
          >
            {block}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="apartment-filter">
          <button
            style={{ backgroundColor: 'none', border: 'none', color: 'black' }}
            onClick={() => setSelectedApartmentType('All')}
          >
            <h1 style={{ marginRight: '42px', backgroundColor: 'none' }}>Floor 1</h1>
          </button>
          <button
            className={`filter-button ${selectedApartmentType === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedApartmentType('All')}
          >
            All
          </button>
          <button
            className={`filter-button ${selectedApartmentType === 'Studio' ? 'active' : ''}`}
            onClick={() => setSelectedApartmentType('Studio')}
          >
            Studio
          </button>
          <button
            className={`filter-button ${selectedApartmentType === '1 Bedroom' ? 'active' : ''}`}
            onClick={() => setSelectedApartmentType('1 Bedroom')}
          >
            1 Bedroom
          </button>
          <button
            className={`filter-button ${selectedApartmentType === '2 Bedroom' ? 'active' : ''}`}
            onClick={() => setSelectedApartmentType('2 Bedroom')}
          >
            2 Bedroom
          </button>
          <button
            className={`filter-button ${selectedApartmentType === '3 Bedroom' ? 'active' : ''}`}
            onClick={() => setSelectedApartmentType('3 Bedroom')}
          >
            3 Bedroom
          </button>
        </div>
      </div>

      <div className="floors-container">
        {[1, 2].map((floor) => (
          <div key={floor} className="floor-column">
            <div className="units-grid">
              {loading && <p>Loading units...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {filteredItems.length > 0 ? (
                filteredItems
                  .filter((unit) => {
                    return `Floor ${floor}`.toLowerCase().trim() === unit.FloorNo.toLowerCase().trim();
                  })
                  .map((unit) => (
                    <div
                      key={unit.ProjectDeliveryID}
                      className={`unit-box ${selectedUnits.includes(unit.ProjectDeliveryID) ? 'selected' : ''}`}
                      onClick={() => handleUnitClick(unit.ProjectDeliveryID)}
                      style={{ width: '162px', height: '36px' }}
                    >
                      <span className="apartment-type">
                        {unit.ApartmentType === 'Studio' ? 'S' :
                          unit.ApartmentType === '1 Bedroom' ? '1B' :
                          unit.ApartmentType === '2 Bedroom' ? '2B' :
                          unit.ApartmentType === '3 Bedroom' ? '3B' : unit.ApartmentType}
                      </span>
                      {' '}{unit.UnitNo} -{' '}
                    </div>
                  ))
              ) : (
                <p>No units found for this floor</p>
              )}
            </div>

            
          </div>
        ))}
      </div>

      {/* Floating Footer */}
      <div className="floating-footer">
        <h4>You have Selected {selectedUnits.length} Units</h4>
        <button onClick={handleAssignInspection}>Assign Inspection</button>
      </div>
    </div>
  );
};

export default DashboardHome;
