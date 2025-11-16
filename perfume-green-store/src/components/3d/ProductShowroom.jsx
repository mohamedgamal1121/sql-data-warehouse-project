import { useMemo } from 'react';
import PerfumeBottle from './PerfumeBottle';
import { Pedestal } from './Environment';
import { products } from '../../data/products';
import { useStore } from '../../store/useStore';

export default function ProductShowroom() {
  const { selectedCategory, searchQuery, priceRange, setSelectedProduct } = useStore();

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [selectedCategory, searchQuery, priceRange]);

  // Arrange products in a circular pattern
  const productPositions = useMemo(() => {
    const radius = 8;
    const positions = [];
    
    filteredProducts.forEach((product, index) => {
      const angle = (index / filteredProducts.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push([x, 1, z]);
    });
    
    return positions;
  }, [filteredProducts]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <group>
      {filteredProducts.map((product, index) => (
        <Pedestal key={product.id} position={productPositions[index]}>
          <PerfumeBottle
            product={product}
            position={[0, 1.5, 0]}
            onClick={() => handleProductClick(product)}
          />
        </Pedestal>
      ))}
    </group>
  );
}
