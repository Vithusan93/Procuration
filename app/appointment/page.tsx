import prisma from '@/prisma/client'
import { Table} from '@radix-ui/themes'


const AppointmentsPage = async () => {
  const appointments = await prisma.appointment.findMany()


  return (
    <div>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Mail</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Service</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {appointments.map(appointment => (
            <Table.Row key={appointment.id}>
              <Table.Cell className='hidden md:table-cell'>{appointment.mail}</Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{appointment.service}</Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{appointment.date.toDateString()}</Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{appointment.isPublished.toString()}</Table.Cell>
            </Table.Row>
            
          ))}
          
        </Table.Body>
        
      </Table.Root>
      
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default AppointmentsPage
