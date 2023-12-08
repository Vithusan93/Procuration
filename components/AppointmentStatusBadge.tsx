import { Status, Appointment } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'


const statusMap: Record<Status, {label:string, color: 'red' | 'orange' | 'green'} > = {
    PENDIND: {label: 'Pendig', color:'red'},
    ACCEPTING:{label: 'Accepting', color:'orange'},
    FINISHING:{label: 'Finishing', color:'green'},

}


const AppointmentStatusBadge = ({status}: {status : Status}) => {

  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default AppointmentStatusBadge