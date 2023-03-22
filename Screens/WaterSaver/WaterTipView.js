import React, { useState, useEffect } from 'react'
import {
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Modal } from 'react-native-web'
// import Modal from "react-native-modal";
import { firebase } from '../../config'
import { doc, getDoc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

function WaterTipView ({ route }) {
  const navigation = useNavigation()
  const [idea, setIdea] = useState([])
  const { id } = route.params;
  const ideaRef = firebase
    .firestore()
    .collection('waterSaverIdeas')
    .doc(id)

  const getIdeaById = () => {
    ideaRef
      .get()
      .then(doc => {
          const data = doc.data()
          setIdea(data)
      })
      .catch(error => {
        console.log('Error getting document:', error)
      })
  }

  useEffect(() => {
    getIdeaById()
  }, [])



  return (
    <SafeAreaView style={styles.view}>
      <ScrollView>
        <View style={styles.infoContainer}>
          <Text style={styles.name}> {idea.title} </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.image} source={{ uri: 'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=' }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.description}> {idea.description} </Text>

          <View style={styles.fixToText}>
            <TouchableOpacity style={styles.CalBtn} onPress={() => {}}>
              <Text style={styles.CalBtnText}>ADD COMMENT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.CalBtn}
              onPress={() =>
                navigation.navigate('WaterSaverComments', { id: id })
              }
            >
              <Text style={styles.CalBtnText}>VIEW COMMENTS</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.separator} />
          {/* <Modal style={styles.modal} isVisible={isModalVisible}>
                        <View style={styles.vw}>
                            <Text style={styles.cmnttxt}> ADD COMMENT </Text>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeTextComment}
                                    defaultValue={comment}
                                    underlineColorAndroid='transparent' />
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                <TouchableOpacity style={styles.btn} onPress={insertData}>
                                    <Text style={styles.CalBtnText}> ADD</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={handleModal}>
                                    <Text style={styles.CalBtnText}> CANCEL</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default WaterTipView

const styles = StyleSheet.create({
  btn: {
    // width: '35%',
    paddingBottom: 5,
    paddingBottom: 5,
    backgroundColor: '#52B1E2',
    borderRadius: 10,
    marginLeft: 10,
    height: 40,
    flex: 2
  },
  input: {
    textAlign: 'center',
    height: 120,
    width: '75%',
    borderBottomEndRadius: 5,
    borderRadius: 10,
    backgroundColor: '#E4E4E4',
    marginHorizontal: 26,
    marginVertical: 20
  },
  cmnttxt: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    borderBottomWidth: 1
  },
  vw: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'black',
    borderBottomWidth: 1
  },
  modal: {
    marginVertical: 150,
    marginHorizontal: 75,
    width: 250,
    maxHeight: 250,
    borderRadius: 10,
    borderColor: 'red'
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center'
  },
  view: {
    marginHorizontal: 25
  },
  fixToText: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  CalBtn: {
    width: '50%',
    paddingBottom: 5,
    paddingBottom: 5,
    backgroundColor: '#52B1E2',
    borderRadius: 10,
    marginLeft: 10,
    height: 45
  },
  CalBtnText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 10
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 1,
    marginVertical: 20
  },
  image: {
    height: 280,
    width: '92%',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10
  },
  infoContainer: {
    padding: 16,
    //   justifyContent:'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
    textAlign: 'justify'
  }
})
