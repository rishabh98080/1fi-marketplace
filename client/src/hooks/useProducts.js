import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/marketplaceApi';

export function useProducts(initialFilters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState(initialFilters);

  const loadProducts = useCallback(async (currentFilters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProducts(currentFilters);
      if (response && response.success) {
        setProducts(response.data);
        setTotal(response.total);
      }
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(filters);
  }, [filters, loadProducts]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // reset to first page upon filter change
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      search: '',
      brand: '',
      sort: 'relevance'
    });
  };

  const refetch = () => {
    loadProducts(filters);
  };

  return {
    products,
    loading,
    error,
    total,
    filters,
    updateFilter,
    resetFilters,
    refetch
  };
}
