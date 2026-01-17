import React, { createContext, useContext, useState } from 'react';

// Initial pool data - this would typically come from backend API
const INITIAL_POOLS = [
  {
    id: 1,
    name: 'Security Guards',
    skillCategory: 'Security Services',
    categoryLabel: 'Security Gard (skill category)',
    candidates: 50,
    workType: 'Contract',
    wageRange: '15k-20k',
    travel: 'Local Only',
    state: 'Maharashtra',
    city: 'Mumbai',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'Delivery Partners',
    skillCategory: 'Delivery Services',
    categoryLabel: 'Delivery People (skill category)',
    candidates: 100,
    workType: 'Full-time',
    wageRange: '18k-25k',
    travel: 'Within State',
    state: 'Maharashtra',
    city: 'Pune',
    status: 'active',
    createdAt: '2024-02-20T14:45:00Z',
  },
  {
    id: 3,
    name: 'Transportation',
    skillCategory: 'Transportation',
    categoryLabel: 'Driver (skill category)',
    candidates: 60,
    workType: 'Contract',
    wageRange: '20k-30k',
    travel: 'Pan India',
    state: 'Karnataka',
    city: 'Bengaluru',
    status: 'new',
    createdAt: '2024-03-10T09:15:00Z',
  },
  {
    id: 4,
    name: 'Maintenance',
    skillCategory: 'Maintenance',
    categoryLabel: 'Custodial Staff (skill category)',
    candidates: 50,
    workType: 'Part-time',
    wageRange: '12k-18k',
    travel: 'Local Only',
    state: 'Delhi',
    city: 'New Delhi',
    status: 'inactive',
    createdAt: '2024-03-25T11:00:00Z',
  },
];

// Create the context
const PoolsContext = createContext();

// Provider component
export const PoolsProvider = ({ children }) => {
  const [pools, setPools] = useState(INITIAL_POOLS);
  const [isLoading, setIsLoading] = useState(false);

  // Add a new pool - Backend friendly structure
  const addPool = (poolData) => {
    // Generate new pool object with all required fields for backend
    const newPool = {
      id: Date.now(), // Temporary ID - backend would assign real ID
      name: poolData.poolName,
      skillCategory: poolData.skillCategory,
      categoryLabel: `${poolData.skillCategory} (skill category)`,
      candidates: 0, // New pool starts with 0 candidates
      workType: poolData.workType,
      wageRange: poolData.wageRange || '',
      travel: poolData.travel,
      state: poolData.state,
      city: poolData.city,
      status: 'new', // New pools start with 'new' status
      createdAt: new Date().toISOString(),
    };

    // Add to local state (in real app, this would be after successful API call)
    setPools(prevPools => [newPool, ...prevPools]);

    // Return the pool data that would be sent to backend
    // This is the structure backend would expect
    return {
      success: true,
      data: newPool,
      // Backend API payload structure
      apiPayload: {
        pool_name: poolData.poolName,
        skill_category: poolData.skillCategory,
        work_type: poolData.workType,
        wage_range: poolData.wageRange || null,
        travel_preference: poolData.travel,
        location: {
          state: poolData.state,
          city: poolData.city,
        },
      },
    };
  };

  // Update an existing pool
  const updatePool = (poolId, updatedData) => {
    setPools(prevPools =>
      prevPools.map(pool =>
        pool.id === poolId
          ? { ...pool, ...updatedData, updatedAt: new Date().toISOString() }
          : pool
      )
    );

    return {
      success: true,
      apiPayload: {
        pool_id: poolId,
        ...updatedData,
      },
    };
  };

  // Delete a pool
  const deletePool = (poolId) => {
    setPools(prevPools => prevPools.filter(pool => pool.id !== poolId));

    return {
      success: true,
      apiPayload: {
        pool_id: poolId,
      },
    };
  };

  // Get pool by ID
  const getPoolById = (poolId) => {
    return pools.find(pool => pool.id === poolId);
  };

  // Get pools summary for dashboard
  const getPoolsSummary = () => {
    const totalPools = pools.length;
    const totalCandidates = pools.reduce((sum, pool) => sum + pool.candidates, 0);
    const activePools = pools.filter(pool => pool.status === 'active').length;
    const newPools = pools.filter(pool => pool.status === 'new').length;

    return {
      totalPools,
      totalCandidates,
      activePools,
      newPools,
    };
  };

  // Simulate API fetch (for future backend integration)
  const fetchPools = async () => {
    setIsLoading(true);
    try {
      // In real app: const response = await api.get('/pools');
      // setPools(response.data);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      setIsLoading(false);
      return { success: true, data: pools };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const value = {
    pools,
    isLoading,
    addPool,
    updatePool,
    deletePool,
    getPoolById,
    getPoolsSummary,
    fetchPools,
  };

  return (
    <PoolsContext.Provider value={value}>
      {children}
    </PoolsContext.Provider>
  );
};

// Custom hook for using pools context
export const usePools = () => {
  const context = useContext(PoolsContext);
  if (!context) {
    throw new Error('usePools must be used within a PoolsProvider');
  }
  return context;
};

export default PoolsContext;
