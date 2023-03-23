import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../../config'
import { Image } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const WaterSavingTips = () => {
  const [ideas, setIdeas] = useState([])
  const ideaRef = firebase.firestore().collection('waterSaverIdeas')
  const [addData, setAddData] = useState('')
  const navigation = useNavigation()

  //read data from firestore
  useEffect(() => {
    ideaRef.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
      const ideas = []
      querySnapshot.forEach(doc => {
        const { title, description, category, image } = doc.data()
        ideas.push({
          id: doc.id,
          title,
          description,
          category,
          image
        })
      })
      setIdeas(ideas)
    })
  }, [])

  //delete data from firestore
  const deleteIdea = ideas => {
    ideaRef
      .doc(ideas.id)
      .delete()
      .then(() => {
        //show success alert
        alert('Deleted Successfully')
      })
      .catch(error => {
        alert(error)
      })
  }

  //add data to firestore
  // const addIdea = () => {
  //   //check if the field is not null
  //   if (addData && addData.length > 0) {
  //     const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  //     const data = {
  //       heading: addData,
  //       createdAt: timestamp
  //     }
  //     ideaRef
  //       .add(data)
  //       .then(() => {
  //         setAddData('')
  //         //release keyboard
  //         Keyboard.dismiss()
  //       })
  //       .catch(error => {
  //         alert(error)
  //       })
  //   }
  // }

  return (
    <View style={{ flex: 1 }}>
      {/* <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add a new Todo'
          placeholderTextColor='#aaaaaa'
          onChangeText={heading => setAddData(heading)}
          value={addData}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />
        <TouchableOpacity style={styles.button} onPress={addIdea}>
          <Text style={styles.buttonText}> Add </Text>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity onPress={() => navigation.navigate('WaterSaverHome')}>
        <View style={styles.imgBackView}>
          <Image
            source={require('../../assets/WaterSaver/back.png')}
            style={styles.imgBack}
          />
        </View>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: 'black',
          textAlign: 'center'
        }}
      >
        Latest Ideas
      </Text>

      <ScrollView contentContainerStyle={{ marginTop: 30}}>
        {ideas.map(tip => (
          <View key={tip.id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('WaterTipView', { id: tip.id })
              }
            >
              <View style={styles.row}>
                <View style={styles[`1col`]}>
                  <Image
                    source={{
                      uri:
                        'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w='
                    }}
                    style={styles.img}
                  />
                </View>
                <View style={styles[`2col`]}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#52B1E2',
                      alignSelf: 'flex-start'
                    }}
                  >
                    {tip.title}
                  </Text>
                </View>
                <View style={styles[`0.5col`]} >
                  <Image
                    source={require('../../assets/WaterSaver/arrow.png')}
                    style={styles.arrowimg}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.tch} />
          </View>
        ))}
        <Text style={styles.btmtxt}> More ideas coming soon...</Text>
      </ScrollView>
    </View>
  )
}

export default WaterSavingTips

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: '45'
  },
  itemHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 22
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  todoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14
  },
  row: {
    flexDirection: 'row'
  },
  '0.5col': {
    borderColor: 'black',
    // borderWidth: 1,
    flex: 0.2,
    // alignItems:'center',
    justifyContent: 'center'
    // alignContent:'center',
    // textAlign:'center'
  },
  '1col': {
    borderColor: 'black',
    // borderWidth: 1,
    flex: 1,
    alignItems: 'center'
  },
  '2col': {
    borderColor: 'black',
    // borderWidth: 1,
    flex: 2,
    justifyContent: 'center',
    paddingRight: 15
  },
  img: {
    width: 65,
    height: 65,
    borderRadius: 10
  },
  tch: {
    marginTop: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    marginBottom: 20
    
  },
  arrowimg: {
    width: 13,
    height: 13
  },
  imgBackView: {
    flex: 1,
    alignItems: 'left'
  },
  imgBack: {
    alignSelf: 'left',
    width: 15,
    height: 15,
    marginTop: 10,
    marginLeft: 10
  },
  btmtxt: {
      marginTop: 10,
      marginBottom: 50,
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '600',
      color: "#52B1E2"

  }
})
