import React from 'react'
import { Button,Container } from '@radix-ui/themes'
import Link from 'next/link'

const ServiceAction = () => {
  return (
    <Container className="mb-5 ">
    <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
      <Button size="3" variant="classic">
        <Link href={"/services/new"}>Add Service</Link>
      </Button>
    </div>
  </Container>
  )
}

export default ServiceAction