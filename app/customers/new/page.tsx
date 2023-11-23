"use client"
import React from 'react';
import { Theme } from '@radix-ui/themes';
import { Flex, Text, Card, Button, TextArea } from '@radix-ui/themes';
import { useState } from 'react';
import * as Form from '@radix-ui/react-form'; 
import { useRouter } from 'next/router';
import { useEffect } from 'react';



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

  //const router = typeof window !== 'undefined' ? useRouter() : null;
  //const router = useRouter();
    //router.refresh();

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
      <Theme >
        <Flex direction="column" gap="3" style={{ maxWidth: 350 }} >
          <Card variant="surface" >

            <Text as="div" size="2" weight="bold">    
              Firstname
              <TextArea 
                size="1"
                required
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

            <Form.Root className="w-[260px]">
            <Form.Field className="grid mb-[10px]" name="email">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-black">Email</Form.Label>
              <Form.Message className="text-[13px] text-black opacity-[0.8]" match="valueMissing">
                Please enter your email
              </Form.Message>
              <Form.Message className="text-[13px] text-black opacity-[0.8]" match="typeMismatch">
              Please provide a valid email
              </Form.Message>
            </div>
          <Form.Control asChild>
          <input
            className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[40px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px]  selection:bg-blackA6"
            type="email"
            required
            placeholder="input customer email"
            value={customer.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            />
            </Form.Control>
            </Form.Field>
            </Form.Root>

            


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
