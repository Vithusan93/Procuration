"use client"
import Image from 'next/image'
import * as Form from '@radix-ui/react-form';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';





const HomePage:  React.FC =() => {
  
  const [email, setEmail] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedStaff, setSelectedStaff] = useState<string>('');
  
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleServiceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(event.target.value);
  };

  const handleStaffChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStaff(event.target.value);
  };

 
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    try {
      setSubmitting(true);
  
    
      const response = await axios.post('/api/issues', {
        email,
        selectedDate,
        selectedService,
        selectedStaff,
      });
  

      console.log('Response:', response.data);
  

    } catch (error) {
      setSubmitting(false);
      console.error('Error:', error);

      setError('An unexpected error occurred.');
    }
  };
  


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      

      <form onSubmit={handleSubmit}>
        <label>
          E-mail :
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Entrez votre adresse e-mail"
            required
          />
        </label><label>
          Date :
          <input
            type="date"
            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
            onChange={(event) => handleDateChange(new Date(event.target.value))}
            required
          />
        </label>
  
        <label>
          Service :
          <select value={selectedService} onChange={handleServiceChange} required>
            <option value="">Sélectionnez un service</option>
            <option value="ongle">Ongle</option>
            <option value="massage">Massage</option>
            <option value="cheveux">Cheveux</option>
            <option value="makeup">Make up</option>
          </select>
        </label>





        <div>
        <label>
          Staff :
          <select value={selectedStaff} onChange={handleStaffChange}  required>
            <option value="remo">Remo</option>
            <option value="raj">Raj</option>
            <option value="rehan">Rehan</option>
            <option value="vithu">Vithu</option>
          </select>
        </label>
        </div>

        <div>
            <button type="submit">Valider
            </button>
        </div>
    </form>
      


      <div> <Link href={"/sroducts"}>Products</Link></div>
    </main>
  )
}
export default HomePage;