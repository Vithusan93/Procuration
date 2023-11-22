"use client"
import React from 'react';
import { Theme } from '@radix-ui/themes';
import { Flex, Text, Card, Button, TextArea } from '@radix-ui/themes';
import { useState } from 'react';

interface Service {
  name: string;
  duration: string;
  price: string;

}

const ServicePage = () => {
  const [service, setService] = useState<Service>({
    name: '',
    duration: '',
    price: '',
  
  });

  const handleAddButtonClick = async () => {
    const response = await fetch("/api/services", {method: "POST", body: JSON.stringify(service)})
    console.log(response);
    
    
  };

  const handleInputChange = (key: keyof Service, value: string) => {
    setService((prevService) => ({
      ...prevService,
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
                placeholder="input service name"
                value={service.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </Text>
            <Text as="div" size="2">
              Duration
              <TextArea
                size="1"
                placeholder="input service duration"
                value={service.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
              />Min
            </Text>
            <Text as="div" size="2" weight="bold">
              Price
              <TextArea
                size="1"
                placeholder="input service price"
                value={service.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
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

export default ServicePage;
