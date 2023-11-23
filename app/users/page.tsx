"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';






const UserPage:  React.FC =() => {
  
  return (
    
      <>


      <div> <Link href={"/customers"}>Customers</Link></div>
      <div> <Link href={"/products"}>Products</Link></div>
      <div> <Link href={"/services"}>Services</Link></div>
      </>
  )
}
export default UserPage;