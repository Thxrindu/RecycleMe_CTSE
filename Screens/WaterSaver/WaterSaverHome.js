import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard , Pressable, ScrollView  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../../config';

import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const WaterSaverHome = () => {

    const [ideas, setIdeas] = useState([]);
    const ideaRef = firebase.firestore().collection('waterSaverIdeas');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    //read data from firestore
    useEffect(() => {
        ideaRef
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const ideas = []
                    querySnapshot.forEach((doc) => {
                        const { heading } = doc.data()
                        ideas.push({
                            id: doc.id,
                            heading
                        })
                    })
                    setIdeas(ideas)
                }
            )
    }, [])

    //delete data from firestore
    const deleteIdea = (ideas) => {
        ideaRef
            .doc(ideas.id)
            .delete()
            .then(() => {
                //show success alert
                alert("Deleted Successfully")
            })
            .catch(error => {
                alert(error);
            })
    }

    //add data to firestore
    const addIdea = () => {
        //check if the field is not null
        if (addData && addData.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp
            };
            ideaRef
                .add(data)
                .then(() => {
                    setAddData('');
                    //release keyboard
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add a new Todo'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(heading) => setAddData(heading)}
                    value={addData}
                    underlineColorAndroid='transparent'
                    // autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={addIdea}>
                    <Text style={styles.buttonText}> Add </Text>
                </TouchableOpacity>
            </View>
            {/* <FlatList
                data={ideas}
                numColumns={1}
                renderItem={({ item }) => (
                    <View>
                        <Pressable style={styles.container}
                        // onPress={() => navigation.navigate('Detail', {item})}
                        >
                        <FontAwesome
                        name='trash-o'
                        color='red'
                        onPress={() => deleteIdea(item)}
                        style={styles.ideaIcon}
                        />

                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>
                                {item.heading[0].toUpperCase() + item.heading.slice(1)}
                            </Text>
                        </View>
                        </Pressable>
                    </View>
                )}
            /> */}

            <ScrollView
                contentContainerStyle={{
                }}>

                {ideas.map(tip => (
                    <View key={tip.id}>
                        <TouchableOpacity >
                            <View style={styles.row}>
                                {/* <View style={styles[`1col`]}>
                                    <Image source={{ uri: tip.image }} style={styles.img} />
                                </View> */}
                                <View style={styles[`2col`]}>
                                    <Text style={{ fontSize: 15, fontWeight: "600", color: "#52B1E2", alignSelf: "flex-start" }}>
                                        {tip.heading}
                                    </Text>
                                </View>
                                <View style={styles[`0.5col`]} onPress={() => navigation.navigate("WaterTipView", { id: tip._id })}>
                                    {/* <Image source={require('../../assets/water_saver/arrow.png')} style={styles.arrowimg} /> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.tch}/>
                    </View>
                ))}
                <Text style={styles.btmtxt}> More ideas coming soon...</Text>
            </ScrollView>
        </View>
    )
}

export default WaterSaverHome

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#e5e5e5',
        padding: 15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10,
        flexDirection:'row',
        alignItems:'center'
    },
    innerContainer: {
        alignItems:'center',
        flexDirection:'column',
        marginLeft:'45'
    },
    itemHeading: {
        fontWeight:'bold',
        fontSize:18,
        marginRight:22
    },
    formContainer: {
        flexDirection:'row',
        height:80,
        marginLeft:10,
        marginRight:10,
        marginTop:100
    },
    input: {
        height:48,
        borderRadius:5,
        overflow:'hidden',
        backgroundColor:'white',
        paddingLeft:16,
        flex:1,
        marginRight:5
    },
    button: {
        height: 47,
        borderRadius:5,
        backgroundColor:'#788eec',
        width:80,
        alignItems:'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize:20
    },
    todoIcon: {
        marginTop:5,
        fontSize:20,
        marginLeft:14

    },
    row: {
        flexDirection: "row",
    },
    "0.5col": {
        borderColor: "black",
        // borderWidth: 1,
        flex: 0.2,
        // alignItems:'center',
        justifyContent: 'center',
        // alignContent:'center',
        // textAlign:'center'
    },
    "1col": {
        borderColor: "black",
        // borderWidth: 1,
        flex: 1,
        alignItems: 'center',

    },
    "2col": {
        borderColor: "black",
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
        // borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0.5
    },

})