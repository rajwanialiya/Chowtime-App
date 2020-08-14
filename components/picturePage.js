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
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
   const intialList = [
     {
       uri: "",
       id: "1"
     }
   ]
    const [image,setImage] = useState("");
    const [pictureList, setPictureList] = useState(intialList);
    const [step, setStep] = useState("1");
    const [title, setTitle] = useState("Capture")
    useEffect( () => {
       _retrieveData()
    }, []);

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
   const removeImage = async (id) => {

      console.log("hEY" + id)
        // pictureList.splice(index, 1)
        
        const newList = pictureList.filter((picture) => picture.id != id)
        console.log(newList)
        setPictureList(newList)
        await AsyncStorage.setItem('@Images', JSON.stringify(newList));
    }

    
   
   

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('@Images');
          if (props.route.params.step){
            setStep(props.route.params.step)
          }
          if (props.route.params.title){
            setTitle(props.route.params.title)
          }
          if (value !== null) {
            // We have data!!
            console.log("WE HAVE DATA")
            // console.log(value);
            // setImage(value);
            const listOfPictures = JSON.parse(value)
            // const pictureListObject = []
            // for (var i = 0; i < listOfPictures.length; i++){
            //   pictureListObject.push({uri: listOfPictures[i], id: makeid(8)})
            // }
            setPictureList(listOfPictures);
            // console.log(pictureListObject)
            console.log(listOfPictures)
          }
          else {
            console.log("We Have NO Data")
          }
          
        } catch (error) {
          // Error retrieving data
          console.log(error)
          console.log("WE DON't HAVE DATA")

        }
      };
      // _retrieveData();
    return (
        <PaperProvider theme={global}>
        <View style={styles.view}>
          <View style={styles.header}>
            <Text style={styles.title} >{title}</Text>
            <View style={{flexDirection:'row', alignItems:'flex-end', paddingBottom:20, paddingRight: 20}}>
              <View style={styles.stepSection}>
              {step == '1' ? <Text style={styles.steptext}>Step 1</Text> : null}
                <View style={[styles.steps, step == '1' ? styles.blackBackground : styles.whiteBackground ]}>
                          <AntDesign name="camera" size={20} color={step == '1' ? "#FFF" : "black"}  />
                </View>
                
              </View>
              
              <View style={styles.stepSection}>
              {step == '2' ? <Text style={styles.steptext}>Step 2</Text> : null}
                <View style={[styles.steps, step == '2' ? styles.blackBackground : styles.whiteBackground ]}>
                          <AntDesign name="picture" size={20} color={step == '2' ? "#FFF" : "black"}  />
                </View>
                
              </View>

              <View style={styles.stepSection}>
              {step == '3' ? <Text style={styles.steptext}>Step 3</Text> : null}
                <View style={[styles.steps, step == '3' ? styles.blackBackground : styles.whiteBackground ]}>
                          <Feather name="list" size={20} color={step == '3' ? "#FFF" : "black"}  />
                </View>
                
              </View>
            </View>
            

          </View>
          <View style={{flex:1, paddingHorizontal:15}}>
            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
              <Text style={styles.subtitle} >Images</Text>
              <TouchableWithoutFeedback >
                <View style={styles.button}>
                  <Text style={{color:'white'}}>Next</Text>
                </View>
                    
                </TouchableWithoutFeedback>
            </View>
            
            <Text style={styles.text} >Let's start by adding a picture of your fridge.</Text>
            

            <View style={styles.viewCenter}>
            <ScrollView style={styles.scroll}>
              <FlatList
                  style={styles.list}
                  data={recipe.extendedIngredients}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <View style={styles.ingredient}>
                      <Text style={styles.ingredientName}>{item.name}</Text>
                      <Text style={styles.ingredientAmount}>{item.measures.us.amount} {item.measures.us.unitShort}</Text>
                    </View>
                  )}
                />
                <View style={styles.viewCenter}>
                {pictureList.map((person, index) => (<View key={person.id} style={styles.horizontalStack}>
                  
                  <Image
                  style={styles.image}
                  source={{
                    uri: person.uri
                  }}
                />
                <TouchableWithoutFeedback onPress={async () => await removeImage(person.id)} >
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
        ...view,
      }, 
      viewCenter: {
        ...view,
        justifyContent: 'center',
        alignItems:'center'
        // backgroundColor:'blue'
      }, 
      title: {
        ...title,
        marginBottom:0

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
      stepSection:{
        alignItems:'center', 
        // backgroundColor:'white',
        width:50,
        paddingHorizontal:5
      
      },
      steps:{
        backgroundColor: 'black',
        height: 35,
        width: 35,
        borderRadius: 35/2,
        // marginRight:15,
        justifyContent:'center',
        alignItems:'center'
        // alignSelf:'center'
        
      },
      stepsOff:{
        backgroundColor: 'white',
        height: 35,
        width: 35,
        borderRadius: 35/2,
        // marginRight:15,
        justifyContent:'center',
        alignItems:'center'
        // alignSelf:'center'
        
      },
      steptext: {
        color: 'black',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        fontWeight:'700',
        
        paddingVertical:5
      },
      header:{
        flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor: '#32CA81',
        marginBottom: 20
        
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
        width: Dimensions.get('window').width * 0.65,
        height: Dimensions.get('window').width *0.5 ,
        marginBottom:15,
        marginTop:15,
        borderRadius:10
      },
      touchableOpacity: {
        alignItems:'center', 
        margin: 18, 
        backgroundColor: global.colors.green, 
        borderRadius: 10,
      },
      blackBackground:{
        backgroundColor:'black'
      },
      whiteBackground: {
        backgroundColor:'white'
      },
      button:{
        backgroundColor: '#32CA81',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:25,
        paddingVertical:5,
        borderRadius: 15,
        marginBottom: 4
      }
      
    })