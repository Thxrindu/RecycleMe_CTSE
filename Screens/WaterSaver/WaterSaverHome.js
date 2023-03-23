import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
  ScrollView
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../../config'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'

const WaterSaverHome = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.MainContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('')}>
        <View style={styles.imgBackView}>
          {/* <Image
            source={require('../../assets/waterSaver/back.png')}
            style={styles.imgBack}
          /> */}
        </View>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: 'black',
        }}
      >
        Water Saver
      </Text>
      {/* <Image
        source={require('../../assets/waterSaver/water_icon.png')}
        style={styles.img}
      /> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WaterSavingTips')}
      >
        <Text style={styles.text}>Latest Ideas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WaterSaverCategories')}
      >
        <Text style={styles.text}>Categories</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddNewWaterTip')}
      >
        <Text style={styles.text}>Add New Idea</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WaterSaverHome

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 20
  },
  button: {
    width: '80%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#52B1E2',
    borderRadius: 20,
    marginTop: 20,
    height: 100
  },
  text: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    padding: 30,
    fontWeight: '500'
  },
  img: {
    width: 130,
    height: 130,
    marginBottom: 20,
    marginTop: 20
  },
  imgBackView: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'center'
  },
  imgBack: {
    alignSelf: 'left',
    width: 15,
    height: 15
  }
})
