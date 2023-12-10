import React from 'react'
import Link from "next/link";
import { Table } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



const LoadingServicePage = () => {
    const services= [1,2,3];
  return (
    <div>
    <Table.Root variant="surface">
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell className="hidden md:table-cell">
          Name
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="hidden md:table-cell">
          Duration
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className="hidden md:table-cell">
          Price
        </Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {services.map((service) => (
        <Table.Row key={service}>
          <Table.Cell className="hidden md:table-cell">
            <Link href={`/services/${service}`}><Skeleton/></Link>
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
          <Skeleton/>
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
          <Skeleton/>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
 
  </div>
  )
}

export default LoadingServicePage