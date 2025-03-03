import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Swiper from 'react-native-swiper'
import { useState } from 'react'
import { onboarding } from '@/constants'
import CustomButton from '@/components/CustomButton'
const welcome = () => {
  const swiperRef= useRef<Swiper>(null)
  const [active, setactive] = useState(0)
  const isLastSlide = active === onboarding.length-1;
  return (
    <SafeAreaView className='flex h-full items-center justify-between bg-white'>
      <TouchableOpacity onPress={()=>{
        router.replace("/(auth)/sign-up")
      }} className='w-full flex justify-end items-end p-5'>
        <Text className='text-black text-md font-JakartaBold'>skip</Text>
      </TouchableOpacity>
      <Swiper 
      ref={swiperRef} 
      loop={false}
      dot={<View className='w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full'/>}
      activeDot={<View className='w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full'/>}
      onIndexChanged={(index)=> setactive(index)}
      >
        {onboarding.map((item)=>(
          <View key={item.id} className='flex items-center justify-center p-5'>
            <Image 
            source={item.image}
            className='w-full h-[300px]'
            resizeMode='contain'
            />
            <View className='flex flex-row items-center justify-center w-full mt-10'>
            <Text className='text-black text-3xl font-bold mx-10 text-center'>{item.title}</Text>
            </View>
            <Text className='text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3'>{item.description}</Text>
          </View>
        ))}
      </Swiper>
      <CustomButton title={isLastSlide? 'Get Started':'Next'} 
      onPress={()=> isLastSlide? router.replace('/(auth)/sign-up'):swiperRef.current?.scrollBy(1)}
      className="w-11/12 mt-10 mb-5"/>
    </SafeAreaView>
  )
}

export default welcome