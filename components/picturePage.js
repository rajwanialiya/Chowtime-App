import * as React from 'react';
import  { useState, useEffect, useRef } from 'react';
import { useIsFocused} from '@react-navigation/native';
import { Button, Image, View , StyleSheet, Dimensions, Text, TouchableWithoutFeedback} from 'react-native';
import { Camera } from 'expo-camera';
import { SimpleLineIcons } from '@expo/vector-icons';
import { global, view, title, subtitle, chip, coloredSection, text } from '../styles'
import { green } from '../styles'
import FloatingButton from './FloatingButton';
import { Provider as PaperProvider } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, Entypo, Feather} from "@expo/vector-icons";

export  function PicturePage(props) {
    // console.log(props.route);
    // console.log(props);
    const [image,setImage] = useState("");
    const [pictureList, setPictureList] = useState([]);
    console.log(pictureList);
    if (props.route.params) {
        // setImage(props.route.params.image);
        // console.log(props.route.params.image);
    }
    // const navigation = props.route.params.navigation;
    // console.log(props.route.params.navigation)
    const Nav = () => {
        // navigation.push('Upload', {
      
        //     navigation:navigation
        //   });

    }
   const removeImage = (index) => {

  console.log(index)
    // pictureList.splice(index, 1)
    const newList = pictureList.filter((picture) => picture.key != index)
    // setPictureList(newList)
    }


    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('@Images');
          if (value !== null) {
            // We have data!!
            console.log("WE HAVE DATA")
            // console.log(value);
            // setImage(value);
            const listOfPictures = value.split(",")
            setPictureList(listOfPictures);
          }
        } catch (error) {
          // Error retrieving data
          console.log("WE DON't HAVE DATA")

        }
      };
      _retrieveData();
    return (
        <PaperProvider theme={global}>
        <View style={styles.view}>
          <Text style={styles.title} >Capture</Text>
          {/* <Text style={styles.subtitle} >{subtitle? subtitle : "Your fridge"}</Text> */}
          <Text style={styles.text} >Let's start by adding a picture of your fridge.</Text>
          

          <View style={styles.viewCenter}>
          <ScrollView style={styles.scroll}>
              <View style={styles.viewCenter}>
              {pictureList.map((person, index) => (<View key={index} style={styles.horizontalStack}>
                
                <Image
                style={styles.image}
                source={{
                  uri: person
                }}
              />
              <TouchableWithoutFeedback onPress={() =>removeImage(index)} >
                  <View style={styles.close}>
                      <AntDesign name="close" size={24} color="#FFF"  />
                  </View>
              </TouchableWithoutFeedback>
                </View>
              ))}
          </View>
          </ScrollView>
          </View>
          
          <FloatingButton navigation={props.navigation}  style={{bottom: 80, right: 60} }/>
 
        </View>
      </PaperProvider>
     
    
    );
  }



  const styles = StyleSheet.create({
    container: {

      flex:1,
      alignItems: "center"
    },
    text: {
      ...text
    },
      view: {
        ...view
      }, 
      viewCenter: {
        ...view,
        justifyContent: 'center',
        alignItems:'center'
        // backgroundColor:'blue'
      }, 
      title: {
        ...title,
      }, 
      close: {
        backgroundColor: 'grey',
        height: 30,
        width: 30,
        borderRadius: 30/2,
        position:'relative',
        right:'10%',
        justifyContent:'center',
        alignItems:'center'
        // alignSelf:'flex-end'
        
      },
      coloredSection: {
        ...coloredSection
      },
      subtitle: {
        ...subtitle,
      }, 
      scroll:{
        margin:10,
        width:'80%'
       
      },
      horizontalStack:{
        flexDirection:'row'
        
      },
      name: {
        ...subtitle,
        color: 'white',
        margin: 20
      }, 
      chip: {
        ...chip,
        marginRight: 8
      }, 
      row: {
        flexDirection: 'column',
        flexGrow: 0,
        marginVertical: 8,
        marginHorizontal: 16
      },
      recipesContainer: {
        overflow:'scroll',
        paddingHorizontal:16
      },
      recipesItem: {
        paddingRight:18, 
        height: 380,
      },
      imageBackground: {
        height:360, 
        width:Dimensions.get('window').width - 52, 
        borderRadius: 10, 
        overflow:'hidden',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 6,
        justifyContent:'space-between',
        paddingBottom: 10
      }, 
      overlay: {
        height: 360,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)'
      }, 
      ingredientCount: {
        fontSize: 18
      }, 
      image: {
        width: 206,
        height: 158,
        marginBottom:15,
        marginTop:15,
        borderRadius:10
      },
      touchableOpacity: {
        alignItems:'center', 
        margin: 18, 
        backgroundColor: global.colors.green, 
        borderRadius: 10,
      }
      
    })