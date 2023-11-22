"use client"
import React from 'react';
import { Theme } from '@radix-ui/themes';
import { Flex, Text, Card, Button, TextArea } from '@radix-ui/themes';
import { useState } from 'react';

interface Customer {
  firstname:   string;
  lastname:    string;
  email:       string;
  phone:       string;

}

const CustomerPage = () => {
  const [customer, setCustomer] = useState<Customer>({
    firstname:  '',
    lastname: '',
    email: '',
    phone: '',
  
  });

  const handleAddButtonClick = async () => {
    const response = await fetch("/api/customers", {method: "POST", body: JSON.stringify(customer)})
    console.log(response);
    
    
  };

  const handleInputChange = (key: keyof Customer, value: string) => {
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [key]: value,
    }));
  };

  return (
    <div>
      <Theme>
        <Flex direction="column" gap="3" style={{ maxWidth: 350 }}>
          <Card variant="surface">
            <Text as="div" size="2" weight="bold">
              Firstname
              <TextArea
                size="1"
                placeholder="input customer firstname"
                value={customer.firstname}
                onChange={(e) => handleInputChange('firstname', e.target.value)}
              />
            </Text>
            <Text as="div" size="2">
              Lastname
              <TextArea
                size="1"
                placeholder="input customer lastname"
                value={customer.lastname}
                onChange={(e) => handleInputChange('lastname', e.target.value)}
              />
            </Text>
            <Text as="div" size="2" weight="bold">
              Email
              <TextArea
                size="1"
                placeholder="input customer email"
                value={customer.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </Text>

            <Text as="div" size="2" weight="bold">
              Phone Number
              <TextArea
                size="1"
                placeholder="input customer Phone Number"
                value={customer.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
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

export default CustomerPage;
