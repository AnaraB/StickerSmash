import { ScrollView, StyleSheet, Text, Image,  View, Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton  from '../../components/CustomButtons'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  //create loading state
  const [isSubmitting, setIsSubmitting] = useState(false)

const submit = async () => {
  //check if input fields are empty
  if(!form.username || !form.email || !form.password){
    Alert.alert('Error', 'Please fill in all the fileds')
  }
  
  setIsSubmitting(true)

  try{
  const result = await createUser(form.email, form.password, form.username)

  // when we get the result we set it to global state using context

  router.replace('/home')
  } catch(error){
    Alert.alert('Error', error.message)
  } finally {
    setIsSubmitting(false)
  }
}
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
      <View className="w-full justify-center min-h-[83vh] px-4 my-6">
        <Image  source={images.logo}
        resizeMode='contain' className="w-[115px] h-[35px]"
        />
        <Text className="text-2lx text-white text-semibold mt-10 font-psemibold">Sign up to Aora</Text>
        <FormField 
        title="Username"
        value={form.username}
        //callback func that calls setter setForm, where we destructure setForm values
        //and modify username to be equal to event that we are passing
        handleChangeText={(e) => setForm({ ...form, username: e})}
        otherStyles="mt-10"
        />
        <FormField 
        title="Email"
        value={form.email}
        //callback func that calls setter setForm, where we destructure setForm values
        //and modify email to be equal to event that we are passing
        handleChangeText={(e) => setForm({ ...form, email: e})}
        otherStyles="mt-7"
        keyboardType="email-address"
        />
        <FormField 
        title="Password"
        value={form.password}
        //callback func that calls setter setForm, where we destructure setForm values
        //and modify email to be equal to event that we are passing
        handleChangeText={(e) => setForm({ ...form, password: e})}
        otherStyles="mt-7"
        />

      <CustomButton 
       title="Sign Up"
       handlePress={submit}
       containerStyles="mt-7"
       isLoading={isSubmitting}
      />
      <View className="justify-center pt-5 flex-row gap-2">
        <Text className="text-lg text-gray-100 font-regular">
         Have an account already?
        </Text>
        <Link href="./sign-in" className="text-lg font-psemibold text-secondary">Sign In</Link>
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

