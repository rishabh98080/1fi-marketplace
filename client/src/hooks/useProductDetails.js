import { useState, useEffect, useCallback } from 'react';
import { fetchProductBySlug, fetchEmiPlans } from '../services/marketplaceApi';

export function useProductDetails(slugOrId) {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [emiPlans, setEmiPlans] = useState([]);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDetails = useCallback(async () => {
    if (!slugOrId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductBySlug(slugOrId);
      setProduct(data);
      
      // Select initial variant
      const defaultVar = data.variants?.find(v => v.isDefault) || data.variants?.[0] || null;
      setSelectedVariant(defaultVar);

      // Select initial EMI plans
      const plans = data.emiPlans || [];
      setEmiPlans(plans);

      // Default to recommended plan (e.g. 12M) or first plan
      const rec = plans.find(p => p.isRecommended) || plans[0] || null;
      setSelectedEmiPlan(rec);
    } catch (err) {
      setError(err.message || 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  }, [slugOrId]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  // When variant changes, check if we need to fetch updated EMI plans for the new price
  const changeVariant = useCallback(async (variant) => {
    setSelectedVariant(variant);
    if (!product || !variant) return;

    // If variant price differs from base product price, recalculate EMI schedule dynamically
    if (variant.price !== product.basePrice) {
      try {
        const dynamicPlans = await fetchEmiPlans(product.id, variant.id, variant.price);
        if (dynamicPlans && dynamicPlans.length > 0) {
          setEmiPlans(dynamicPlans);
          // Preserve matching tenure if possible
          setSelectedEmiPlan(prev => {
            if (!prev) return dynamicPlans[0];
            const matching = dynamicPlans.find(p => p.tenureMonths === prev.tenureMonths);
            return matching || dynamicPlans[0];
          });
        }
      } catch (err) {
        console.warn('Could not fetch dynamic EMI plans for variant price:', err);
      }
    }
  }, [product]);

  return {
    product,
    selectedVariant,
    setSelectedVariant: changeVariant,
    emiPlans,
    selectedEmiPlan,
    setSelectedEmiPlan,
    loading,
    error,
    refetch: loadDetails
  };
}
