"use client"
import React from 'react';
import { Theme } from '@radix-ui/themes';
import { Flex, Text, Card, Button, TextArea } from '@radix-ui/themes';
import { useState } from 'react';

interface Product {
  name: string;
  description: string;
  price: string;
  stock: string;
}

const ProductPage = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  const handleAddButtonClick = async () => {
    const response = await fetch("/api/products", {method: "POST", body: JSON.stringify(product)})
    console.log(response);
    
    //console.log('Product:', product);
  };

  const handleInputChange = (key: keyof Product, value: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [key]: value,
    }));
  };

  return (
    <div>
      <Theme>
        <Flex direction="column" gap="3" style={{ maxWidth: 350 }}>
          <Card variant="surface">
            <Text as="div" size="2" weight="bold">
              Name
              <TextArea
                size="1"
                placeholder="input product name"
                value={product.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </Text>
            <Text as="div" size="2">
              Description
              <TextArea
                size="1"
                placeholder="input product description"
                value={product.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </Text>
            <Text as="div" size="2" weight="bold">
              Price
              <TextArea
                size="1"
                placeholder="input product price"
                value={product.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </Text>
            <Text as="div" size="2">
              Stock
              <TextArea
                size="1"
                placeholder="input product stock"
                value={product.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
              />
            </Text>
            <Button size="3" variant="soft" onClick={handleAddButtonClick}>
              Add
            </Button>
          </Card>
        </Flex>
      </Theme>
    </div>
  );
};

export default ProductPage;
