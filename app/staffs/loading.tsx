import React from 'react'
import Link from "next/link";
import { Table } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



const LoadingStaffPage = () => {
    const staffs= [1,2,3,4];
  return (
    <div>
    <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  FirstName
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  LastName
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Email
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Phone
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {staffs.map((staff) => (
                <Table.Row key={staff}>
                  <Table.Cell className="hidden md:table-cell">
                    <Link href={`/staffs/${staff}`}><Skeleton/></Link>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                  <Skeleton/>
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

export default LoadingStaffPage