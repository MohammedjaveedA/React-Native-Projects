import { View, Text, Image, ScrollView, TextInput, Button, Alert } from 'react-native'
import React from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import OAuth from '@/components/OAuth'
import { useSignUp } from '@clerk/clerk-expo'
import {ReactNativeModal} from 'react-native-modal'
import { fetchAPI } from '@/lib/fetch'
const signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [code, setCode] = React.useState('')

  const [form, setform] = useState({
   name:'',
   email:'',
   password:''
  })
  const [verification, setVerification] = useState({
    state:'default',
    error:'',
    code:''
  })

  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress:form.email,
        password:form.password
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state:"pending"
      })
    } catch (err:any) {
      // console.error(JSON.stringify(err, null, 2))
      Alert.alert('Error',err.errors[0].longMessage)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code:verification.code
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        //todo create a db user
        //this fetchapi will have two params (path,option)
        await fetchAPI('/(api)/user',{
          method:"POST",
          body:JSON.stringify({
            name:form.name,
            email:form.email,
            clerkId:signUpAttempt.createdUserId,
          })
        })
        await setActive({ session: signUpAttempt.createdSessionId })
        setVerification({...verification,state:"success"})
      } else {
        setVerification({...verification,error:"verification failed",state:"failed"})
      }
    } catch (err:any) {
      setVerification({
        ...verification,
        error:err.errors[0].longMessage,
        state:"failed"})
    }
  }

  
  return (
    <ScrollView className='flex-1 bg-white'>
     <View className='flex-1 bg-white'>
      <View className='relative w-full h-[220px]'>
        <Image
        source={images.signUpCar}
        className='z-0 w-full h-[230px]'
        />
        <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>Create Your Account</Text>
      </View>
      <View className='p-5'>
        <InputField
        label="Name"
        placeholder="Enter Name"
        icon={icons.person}
        value={form.name}
        onChangeText={(value)=>{
         setform({...form,name:value})
        }}
        />
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
        <CustomButton title='SignUp' onPress={onSignUpPress} className='mt-6'/>
        
        <OAuth/>
        
        <Link href='/sign-in'
        className='text-lg text-center text-general-200 mt-10'
        >
        <Text>Already have an account?</Text>
        <Text className='text-primary-500'>Log In</Text>
        </Link>

      </View>
      <ReactNativeModal 
      isVisible={verification.state === "pending"}
      onModalHide={()=>setVerification({...verification,state:"success"})}
      >
        <View className='bg-white px-7 py-9 rounded-2xl min-h[300px]'>
          <Text className='text-2xl font-JakartaExtraBold mb-2'>Verification</Text>
          <Text className='font-Jakarta mb-5'>we've sent a verification code to {form.email}</Text>
          <InputField
          label='Code'
          icon={icons.lock}
          placeholder='12345'
          value={verification.code}
          keyboardType='numeric'
          onChangeText={(code)=> setVerification({...verification, code})}
          />
          {verification.error && (
            <Text className='text-red-500 text-sm mt-1'>
              {verification.error}
            </Text>
          )}
          <CustomButton title='verify Email' onPress={onVerifyPress} className='mt-5 bg-success-500 '/>
        </View>
      </ReactNativeModal>

   <ReactNativeModal isVisible={verification.state === "success"}>
    <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
      <Image source={images.check}
      className='w-[110px] h-[110px] mx-auto my-5'/>
      <Text className=' text-3xl text-center   font-JakartaBold'>verified</Text>
      <Text className='text-base text-gray-400 font-Jakarta text-center mt-2'>You have successfully verified your account</Text>
      <CustomButton title='Browse Home' onPress={()=> router.push('/(root)/(tabs)/home')} className='mt-5'/>
    </View>
          
        </ReactNativeModal>
     </View>
     
    </ScrollView>
  )
}

export default signup