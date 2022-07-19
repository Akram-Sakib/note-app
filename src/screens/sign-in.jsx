import React from 'react'
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Button from '../components/button/button'
import Input from '../components/input/input'

export default function SignIn({navigation}) {
  return (
    <SafeAreaView style={{flex:1}}>

      <Image source={require("./../../assets/images/login-image.png")} style={{alignSelf:'center'}} />
      <Text style={{fontSize:18,fontWeight:"bold",textAlign:"center"}}>Never forget your notes</Text>
      <View style={{paddingHorizontal:16,paddingVertical:25}}>
        <Input placeholder="Email Address"/>
        <Input placeholder="Password" secureTextEntry/>
        <Button title='Login' customStyles={{alignSelf:"center",marginTop:60}}/>
      </View>

      <View style={{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center"
      }}>
        <Pressable onPress={()=>navigation.navigate("Signup")}>
        <Text>
        Dont have an account?{" "}
          <Text style={{color:"green",fontWeight:"bold"}}>Sign up</Text>
        </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input:{
    height:48,
    borderBottomWidth:1,
    color:"#ccc",
    marginBottom:25,
  }
})