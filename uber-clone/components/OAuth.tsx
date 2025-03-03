import { View, Text, Image, Alert } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { icons } from '@/constants'
import { useSSO } from '@clerk/clerk-expo'
import { useCallback } from 'react'
import { googleOAuth } from '@/lib/auth'
import { router } from 'expo-router'
const OAuth = () => {
  const { startSSOFlow } = useSSO()

  const handleGooglepress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const result= await googleOAuth(startSSOFlow)

      if(result.code === "session_exists" || result.code === "success"){
        // Alert.alert("success","session exists Redirecting to home page")
        router.push("/(root)/(tabs)/home")
      }

      // Alert.alert(result.success? 'success':'Error',result.message)

    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("OAuth error",err)
    }
  }, [])

  return (
    <View>
        <View className='flex flex-row justify-center items-center mt-4 gap-x-3'>
            <View className='flex-1 h-[1px] bg-general-100'/>
      <Text className='text-lg'>Or</Text>
      <View className='flex-1 h-[1px] bg-general-100'/>
      </View>
      <CustomButton title='Log In With Google' className='mt-5 w-full shadow-none'
      IconLeft={()=>(
        <Image source={icons.google} resizeMode='contain' className='w-5 h-5 mx-2'/>
      )}
      bgVariant='outline'
      textVariant='primary'
      onPress={handleGooglepress}
      />
    </View>
  )
}

export default OAuth