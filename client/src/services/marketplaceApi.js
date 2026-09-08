/**
 * 1Fi Marketplace API Client Layer
 * Encapsulates all dynamic backend REST calls.
 * UI components consume this service layer rather than hardcoding business data.
 */

const API_BASE = '/api';

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    throw err;
  }
}

export async function fetchProducts(params = {}) {
  try {
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.set('search', params.search);
    if (params.category && params.category !== 'all') searchParams.set('category', params.category);
    if (params.brand) searchParams.set('brand', params.brand);
    if (params.minPrice) searchParams.set('minPrice', params.minPrice);
    if (params.maxPrice) searchParams.set('maxPrice', params.maxPrice);
    if (params.section) searchParams.set('section', params.section);
    if (params.sort) searchParams.set('sort', params.sort);
    if (params.page) searchParams.set('page', params.page);
    if (params.limit) searchParams.set('limit', params.limit);

    const queryString = searchParams.toString();
    const url = `${API_BASE}/products${queryString ? `?${queryString}` : ''}`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch products:', err);
    throw err;
  }
}

export async function fetchProductBySlug(slugOrId) {
  try {
    const res = await fetch(`${API_BASE}/products/${slugOrId}`);
    if (!res.ok) {
      if (res.status === 404) throw new Error('Product not found');
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(`Failed to fetch product '${slugOrId}':`, err);
    throw err;
  }
}

export async function fetchEmiPlans(productId, variantId, principal) {
  try {
    const searchParams = new URLSearchParams();
    if (variantId) searchParams.set('variantId', variantId);
    if (principal) searchParams.set('principal', principal);

    const res = await fetch(`${API_BASE}/products/${productId}/emi-plans?${searchParams.toString()}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.plans;
  } catch (err) {
    console.error('Failed to fetch dynamic EMI plans:', err);
    throw err;
  }
}

export async function submitApplication(applicationPayload) {
  try {
    const res = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(applicationPayload)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to submit EMI application');
    }
    return data;
  } catch (err) {
    console.error('Application submission error:', err);
    throw err;
  }
}
