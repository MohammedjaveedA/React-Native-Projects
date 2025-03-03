import { View, Text, Image, ScrollView, Alert } from 'react-native'
import React, { useCallback } from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import OAuth from '@/components/OAuth'
import { Link,useRouter } from 'expo-router'
import { useSignIn } from '@clerk/clerk-expo'
const signIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [form, setform] = useState({
   email:'',
   password:''
  })
  const onSignInPress=useCallback( async()=>{
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password:form.password
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(root)/(tabs)/home')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
        Alert.alert("Error","Log In failed Please try again.")
      }
    } catch (err:any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2))
      Alert.alert('Error',err.errors[0].longMessage)
    }
  },[isLoaded,form])
  return (
    <ScrollView className='flex-1 bg-white'>
     <View className='flex-1 bg-white'>
      <View className='relative w-full h-[220px]'>
        <Image
        source={images.signUpCar}
        className='z-0 w-full h-[230px]'
        />
        <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>Welcome 👋</Text>
      </View>
      <View className='p-5'>
        <InputField
        label="Email"
        placeholder="Enter Email"
        icon={icons.email}
        value={form.email}
        textContentType='emailAddress'
        onChangeText={(value)=>{
         setform({...form,email:value})
        }}
        />
        <InputField
        label="Password"
        placeholder="Enter Password"
        icon={icons.lock}
        secureTextEntry={true}
        textContentType='password'
        value={form.password}
        onChangeText={(value)=>{
         setform({...form,password:value})
        }}
        />
        <CustomButton title='SignIn' onPress={onSignInPress} className='mt-6'/>
        <OAuth/>
         
           <Link href='/sign-up'
          className='text-lg text-center text-general-200 mt-10'
           >
          <Text>Don't have an account</Text>
          <Text className='text-primary-500'>Sign Up</Text>
          </Link>

      </View>
     
     </View>
     
    </ScrollView>
  )
}

export default signIn