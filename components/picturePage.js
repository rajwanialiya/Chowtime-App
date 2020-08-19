import * as React from 'react';
import  { useState, useEffect, useRef } from 'react';
import { useIsFocused} from '@react-navigation/native';
import { Button, Image, View , StyleSheet, Dimensions, Text, TouchableWithoutFeedback, FlatList, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import { SimpleLineIcons } from '@expo/vector-icons';
import { global, view, title, subtitle, chip, coloredSection, text } from '../styles'
import { green, grey, darkGrey } from '../styles'
import FloatingButton from './FloatingButton';
import { Provider as PaperProvider } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, Entypo, Feather} from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';
import { set } from 'react-native-reanimated';
import EmptyIcon from '../empty'
import { EmptyXml } from '../emptyxml'
import { SvgXml } from 'react-native-svg';
import LottieView from 'lottie-react-native';
const Clarifai = require('clarifai');

export  function PicturePage(props) {
  const app = new Clarifai.App({apiKey: 'e6e934d8af0c4b42ae3b67827cf5fc15'});
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
   const intialList = [
     
   ];

   const DATA = [
    {
      id: 'bd7ac',
      title: 'First Item',
      quantity: 1
    },
    {
      id: '3ac68',
      title: 'Second Item',
      quantity: 1
    },
    {
      id: '58694',
      title: 'Third Item',
      quantity: 1
    },
  ];
    const [image,setImage] = useState("");
    const [pictureList, setPictureList] = useState(intialList);
    // const [step, setStep] = useState("1");
    const [ingredients, setIngredients] = useState(DATA);
    // const [title, setTitle] = useState("Capture")
    const [subtitle, setSubtitle] = useState("Images")
    const [description, setDescription] = useState("Let's start by adding pictures of food")
    const [showNext, setShowNext] = useState(false)
   
    let step = '1'
    let title = "Capture"
    // let subtitle = "Images"
    // let description = "Let's start by adding pictures of food"

    if (props.route && props.route.params && props.route.params.step){
      step = props.route.params.step
      // setStep(newStep)
      if (step == '2') {
          title = 'Analyze'
          // subtitle = 'Finding Ingredients'
          // description = "Hold tight! We're finding ingredients in your pictures!"
      }
      else if (step == '3') {
        title = 'Review'
          // subtitle = 'Review Ingredients'
          // description = "One last step before we can get your recipes!"
          
    }
    }

    const [annotatedImages, setAnnotatedImages] = useState([])
    useEffect( () => {
       _retrieveData()
    }, []);

  
    // const navigation = props.route.params.navigation;
    // console.log(props.route.params.navigation)
    const Nav = () => {
        // navigation.push('Upload', {
      
        //     navigation:navigation
        //   });

    }
   const runClarifai =  async (img) => {
    const base64Img = await FileSystem.readAsStringAsync(img, {encoding:FileSystem.EncodingType.Base64})
    const response = await app.models.predict(Clarifai.FOOD_MODEL, {base64: base64Img})
    // console.log(response.outputs[0].data.concepts[0]);
    const fullList = response.outputs[0].data.concepts
    const ingredients = []
    const whiteList =['vegetable', 'pasture', 'sweet']
    for (var i = 0 ; i < 7; i++){
      if (fullList[i].value > 0.9 && !whiteList.includes(fullList[i].name) ){
        ingredients.push(fullList[i].name)
      }
    }
    // console.log(ingredients);
    return ingredients;
   }
   const callClarifai =  async (arr, img) => {
      // const ingredients =  await runClarifai(img.uri)
      
      
      // arr.push({id: img.id ,uri: img.uri, ingredients: ingredients})
   }

   const removeImage = async (id) => {

      console.log("hEY" + id)
        // pictureList.splice(index, 1)
        
        const newList = pictureList.filter((picture) => picture.id != id)
        console.log(newList)
        if (newList.length > 0) setShowNext(true)
        else setShowNext(false)
        setPictureList(newList)
        await AsyncStorage.setItem('@Images', JSON.stringify(newList));
    }

    const removeIngredient = async (imageId, ingredientName) => {

      
        // pictureList.splice(index, 1)
        
        const newAnnotatedImages = []
        
        for (var i = 0; i < annotatedImages.length; i++){
          const newImage = annotatedImages[i]
          if (annotatedImages[i].id == imageId){
            const ingredients = annotatedImages[i].ingredients;
            const newIngredientList = []
            for (var j = 0; j < ingredients.length; j++){
              if(ingredients[j] != ingredientName) {
                newIngredientList.push(ingredients[j])
              }
            }
            newImage.ingredients = newIngredientList
          }
          if (newImage.ingredients.length > 0)
            newAnnotatedImages.push(newImage)
        }
        if (!newAnnotatedImages.length > 0) setShowNext(false)
        setAnnotatedImages(newAnnotatedImages)
        console.log('look her josh')
        console.log(newAnnotatedImages)
    }
    
   const updateQuantity = async (id, increment) => {
     const newList = []
     for (var i = 0; i < ingredients.length; i++){
      const newIngredient = {
              
        id: ingredients[i].id,
        title: ingredients[i].title,
        quantity: ingredients[i].quantity
      }
       if (ingredients[i].id == id) {
         
          if (increment) {
            newIngredient.quantity +=1
          }
          else {
            newIngredient.quantity -=1
          }
            
          }
          if(newIngredient.quantity > 0)
            newList.push(newIngredient)
       }
       setIngredients(newList)
     }
   
     const handleNext = async (step) => {
       if (step == '1'){
        //  await runClarifai(pictureList[0].uri)
        props.navigation.push('PicturePage', {
          step: '2',
          
        });
       }
       else if (step == '2') {
         
         const ingredientList = []
         for (var i = 0; i < annotatedImages.length; i++){
           const ingredients = annotatedImages[i].ingredients
           for (var j = 0; j < ingredients.length; j++) {
             if (!ingredientList.includes(ingredients[j]))
                ingredientList.push(ingredients[j])
           }
         }
         console.log('COMBINE LIST LOOK')
         console.log(ingredientList) 
        props.navigation.push('PicturePage', {
          step: '3',
          ingredientList: ingredientList
        });
       }
       else if (step == '3') {
        props.navigation.push('PicturePage', {
          step: '1'
        });
       }


     }

     function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }

    _retrieveData = async () => {
      
        try {
          // let newStep = step
          if (step == '2') {
            // setTitle('Analyze')
            setSubtitle('Finding Ingredients')
            setDescription("Hold tight! We're finding ingredients in your pictures!")
        }
        else if (step == '3') {
            // setTitle('Review')
            setSubtitle('Review Ingredients')
            setDescription("One last step before we can get your recipes!")
        }
          
          try {
            
            let listOfPictures;
              if (step =='1' || step == '2') {
                const value = await AsyncStorage.getItem('@Images');
                
                
                
                if (value !== null) {
                  // We have data!!
                  console.log("WE HAVE DATA")
                  // console.log(value);
                  // setImage(value);
                  listOfPictures = JSON.parse(value)
                  // const pictureListObject = []
                  // for (var i = 0; i < listOfPictures.length; i++){
                  //   pictureListObject.push({uri: listOfPictures[i], id: makeid(8)})
                  // }
                  if (listOfPictures.length > 0 && step != '2') setShowNext(true)
                  else setShowNext(false)
                  setPictureList(listOfPictures);
                  // console.log(pictureListObject)
                  console.log(pictureList)
                }
                else {
                  console.log("We Have NO Data")
                }
              }
               if (step == '2') {
                
                const newAnnotatedList = []
                const ingredientList = []
              
                for(var i = 0; i < listOfPictures.length; i++) {
                  const ingredients =  runClarifai(listOfPictures[i].uri)
                  ingredientList.push(ingredients)
                }
                console.log('Starting to wait')
               await Promise.all(ingredientList)
              //  console.log(ingredientList[1]._55)
               for(var i = 0; i < listOfPictures.length; i++) {
                const ingredients =  ingredientList[i]._55
                // ingredientList.push(ingredients)

                newAnnotatedList.push({id:listOfPictures[i].id ,uri:listOfPictures[i].uri, ingredients: ingredients})
              }
               
                // console.log('Done finding image"')
                 setAnnotatedImages(newAnnotatedList);
                
                 setSubtitle('Ingredients Found')
                 setDescription("Sweet! Now just review your ingredients and click 'Next'")
                setShowNext(true)
                console.log('PRINTING PICTURE LIST URI')
    
                console.log(newAnnotatedList)
                
              }
              else if (step == '3') {
                
                console.log('hey  josh look at me')
                console.log(props.route.params.ingredientList)
                if(props.route.params.ingredientList) {
                  const newIngredientList = []
                  const ingredientList = props.route.params.ingredientList
                  for (var i = 0 ; i < ingredientList.length; i++) {
                    const newIngredient = {
                      id: makeid(7),
                      title: ingredientList[i],
                      quantity: 1
                    }
                    newIngredientList.push(newIngredient)
                  }
                  setIngredients(newIngredientList)
                  setShowNext(true)
                }
              }
            
          }
          catch (error) {
            console.log(error)
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
          <View style={{flex:1, paddingHorizontal:25,  alignItems:'center' }}>
            { ( step == '1' && pictureList.length > 0) || (step == '2') || (step == '3' && ingredients.length > 0) ?
              <ScrollView  style={[styles.scroll]}>
              <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center', }}>
                <Text style={styles.subtitle} >{subtitle}</Text>
              
                
              </View>
              
              <Text style={styles.text} >{description}</Text>
              

              <View style={[styles.viewCenter, {paddingHorizontal: 10,  flex:1,}]}>
              
              
                
                { (() => {
                  if (step == '1') {
                    return (
                      <View style={[styles.viewCenter, {alignItems:'center'}]}>
                  {pictureList.map((person, index) => (<View key={person.id} style={[styles.horizontalStack]}>
                    
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
                    )
                  }
                  else if (step == '2') {
                    
                    return (                  
                      <View style={[styles.viewCenter]}>
                        {!showNext && 
                        <View style={{flex:1, width: '100%', height: '100%', alignItems: 'center', justifyContent:'center', padding:25, paddingTop:40, }}>
                          <LottieView style={{width: '100%', height: '100%', }} resizeMode='cover' source={require('./loading3.json')} autoPlay loop />
                         </View>
                        }
                  {annotatedImages.map((person, index) => (<View key={person.id} style={{flex:1}}>
                    
                    <Image
                    style={[styles.image,{marginBottom:0, right:0}]}
                    source={{
                      uri: person.uri
                    }}
                  />
                  
                  <View style={{ width: Dimensions.get('window').width*0.75,backgroundColor: '#F0F3F4', position:'relative',top:-20, borderRadius: 10, padding: 5,  flexWrap:'wrap', flexDirection:'row'}}> 
                  {person.ingredients.map((ingredient,index) => (
                    <View key={index} style={{flexDirection:'row', marginRight:-9}}>
                    <View style={{backgroundColor:'white', padding: 10, margin: 5, borderRadius: 7}}>
                      <Text style={{fontSize: 16,color: darkGrey, }}>{ingredient}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={async () => await removeIngredient(person.id, ingredient)} >
                    <View style={[styles.close, {width: 22, height: 22, borderRadius: 22/2, position:'relative', right: 10}]}>
                        <AntDesign name="close" size={15} color="#FFF"  />
                    </View>
                </TouchableWithoutFeedback>
                    </View>
                  ))}
                  
                  </View>
                  {/* <TouchableWithoutFeedback onPress={async () => await removeImage(person.id)} >
                      <View style={styles.close}>
                          <AntDesign name="close" size={24} color="#FFF"  />
                      </View>
                  </TouchableWithoutFeedback> */}
                    </View>
                  ))}
              </View>)
                  }
                  
                  else if (step == '3') {
                    
                    return (                  
                      <FlatList
                        style={styles.list}
                        data={ingredients}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({item, index}) => (
                          <View style={styles.ingredient}>
                            <Text style={styles.ingredientName}>{item.title}</Text>
                            <View style={{width: '30%', paddingVertical: 4, flexDirection:"row",justifyContent:'flex-end',alignItems:'center', paddingRight:8}}>
                            <TouchableWithoutFeedback onPress={() => updateQuantity(item.id, false)}>
                              <View style={styles.add_subtract}>
                                  <AntDesign name="minus" size={20} color="#32CA81"  />
                              </View>
                            </TouchableWithoutFeedback >
                              
                              <Text style={[styles.ingredientName, {paddingLeft:0}]}>{item.quantity}</Text>
                              
                              <TouchableWithoutFeedback onPress={() => updateQuantity(item.id, true)} >
                              <View style={styles.add_subtract}>
                                  <AntDesign name="plus" size={20} color="#32CA81"  />
                              </View>
                            </TouchableWithoutFeedback >
                            </View>
                            
                            
                            
                          </View>
                        )}
                      />)
                  }
                })() }
                  
              
              </View>
              <View style={{alignItems:'center', paddingBottom:25}}>
                {showNext &&
                  <TouchableOpacity onPress={() => handleNext(step) }>
                    <View style={styles.button}>
                      <Text style={[{color:'white', fontSize:20}]}>Next</Text>
                    </View>
                        
                    </TouchableOpacity> }
              </View>
              
              </ScrollView>
              :
              <View style={{   alignItems:'center', paddingTop:'10%', justifyContent:'center', width:'90%', height:'75%'}}>
                <EmptyIcon setWidth='100%' setHeight='40%' image={<SvgXml xml={EmptyXml} width="100%" height="100%" />} title="Get your recipes." text={['1. Take Pictures of your fridge', '2. Confirm the ingredients','3. Get your suggestions!']}/>
              </View>
            }
            <FloatingButton navigation={props.navigation} step={step}  style={{bottom: 80, right: 60} }/>
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
      ...text,
      paddingHorizontal:0
    },
      view: {
        ...view,
      }, 
      viewCenter: {
        ...view,
        justifyContent: 'center',
        alignItems:'center',
        flex:1
        // backgroundColor:'blue'
      }, 
      title: {
        ...title,
        marginBottom:0,
        paddingHorizontal:25

      }, 
      close: {
        backgroundColor: 'grey',
        height: 30,
        width: 30,
        borderRadius: 30/2,
        // position:'relative',
        // right:'10%',
        justifyContent:'center',
        alignItems:'center'
        // alignSelf:'flex-end'
        
      },
      add_subtract:{
        backgroundColor: 'white',
        height: 30,
        width: 30,
        borderRadius: 30/2,
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center'
      },
      coloredSection: {
        ...coloredSection
      },
      subtitle: {
        ...subtitle,
        paddingHorizontal: 0
      }, 
      scroll:{
        // margin:10,
        width:'100%',
        paddingTop:10
        
       
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
        // marginBottom: 20
        
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
        width: Dimensions.get('window').width*0.75,
        height: Dimensions.get('window').width *0.75,
        // backgroundColor:'blue',
        position:'relative',
        right:-15,
        paddingHorizontal:25,
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
        marginBottom: 4,
        width: 100,
        height: 50,
        
      },
      list: {
        // marginHorizontal: 16,
        width:'100%',
        marginTop: 12,
      },
      ingredient: {
        ...chip,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: grey, 
        borderRadius: 10, 
        marginBottom: 8,
        // width: '100%',
        alignItems: 'center',
        // justifyContent:'center',
        paddingHorizontal: 0,
        marginLeft:0
      }, 
      ingredientName: {
        fontSize: 16,
        color: darkGrey, 
        paddingLeft: 15, 
        paddingVertical: 4,
      }, 
      ingredientAmount: {
        fontSize: 16,
        color: green, 
        paddingRight: 6, 
      }
      
    })