import { View, Text } from 'react-native'
import React from 'react'
import { useLocationStore } from '@/store/indes'
import RideLayout from '@/components/RideLayout'

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation

  }=useLocationStore()
  return (
    <RideLayout>
      <Text className='text-2xl'>You are Here:{userAddress}</Text>
      <Text className='text-2xl'>You are going here:{destinationAddress}</Text>
    </RideLayout>
  )
}

export default FindRide