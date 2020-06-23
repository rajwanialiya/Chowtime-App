import * as React from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import { AntDesign, Entypo, Feather} from "@expo/vector-icons";
import { global, view, title, subtitle, chip, coloredSection } from '../styles'
import Touchable from 'react-native-touchable-safe'
import * as ImagePicker from 'expo-image-picker';


export default class FloatingButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cameraColorScheme: {
                backgroundColor: "white",
                color: "black",
            },
            pictureColorScheme: {
                backgroundColor: "white",
                color: "black",
            },
            cameraClicked: false,
            pictureClicked: false,
            image: null,


        };
        console.log(this.props.reset + ", " + this.open);
        if(this.props.reset) this.toggleMenuOff();
      }
    animation = new Animated.Value(0);
     toggleOffStyle = () => {

        this.setState({
            cameraColorScheme:{
                backgroundColor: 'white',
                color: "black"

            },
            pictureColorScheme:{
                backgroundColor: 'white',
                color: "black"

            },
            cameraClicked : false,
            pictureClicked : false
        })
 }
    toggleMenu = () => {
        const toValue = this.open ? 0: 1;
        Animated.spring(this.animation, {
            toValue,
            friction: 5

        }).start();

        this.open = !this.open;
        this.toggleOffStyle();
    }

    toggleMenuOff = () => {
        const toValue = 0;
        Animated.spring(new Animated.Value(0), {
            toValue,
            friction: 5

        }).start();
        this.toggleOffStyle();
    }
    pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
          });
        //   console.log('here1')
          if (!result.cancelled) {

            console.log(result);
            this.props.navigation.navigate('Upload', {
                image: result.uri,
                subtitle:"Images",
              });
            
          }
    
        //   console.log(result);
          
        } catch (E) {
          console.log(E);
        }
      };

    render(){
        
        const pictureStyle = {
            transform: [
                {scale: this.animation},
                {
                   translateY: this.animation.interpolate({
                       inputRange:[0,1],
                       outputRange:[0, -90]
                   }) 
                }
            ]
        };
        const horizontalSlide = {
            transform: [
                {scale: this.animation},
                {
                   translateX: this.animation.interpolate({
                       inputRange:[0,1],
                       outputRange:[0, -10]
                   }) 
                }
            ]
        };

        const cameraStyle = {
            transform: [
                {scale: this.animation},
                {
                   translateY: this.animation.interpolate({
                       inputRange:[0,1],
                       outputRange:[0, -165]
                   })

                   
                }
            ]
        };
        const opacity = {opacity: this.animation.interpolate({
            inputRange:[0,0.5,1],
            outputRange: [0,0,1]
        })}
        
        
        
        const changeStyle = (button) => {
            if (button == 'camera') {
                if(!this.state.cameraClicked) {
                    this.toggleOffStyle();
                    this.setState({
                        cameraColorScheme:{
                            backgroundColor: global.colors.primary,
                            color: "white"
        
                        },
                        cameraClicked: true
                    })
                }
                else {
                 
                    this.toggleOffStyle();
                }
                
            }
            if (button == 'picture') {
                if(!this.state.pictureClicked) {
                    this.toggleOffStyle();
                    this.setState({
                        pictureColorScheme:{
                            backgroundColor: global.colors.primary,
                            color: "white"
        
                        },
                        pictureClicked : !this.state.pictureClicked
                    })
                }
                else {
        
                    this.toggleOffStyle();
                }
                
            }
            
        }
        
        const rotation = {
            transform: [
               {
                rotate: this.animation.interpolate({
                    inputRange: [0,1],
                    outputRange: ["0deg", "45deg"]
               
                })
            }
            ]
        }
    return(
        <View style={[styles.container, this.props.style]}>
            <View style={[styles.leftShifted]}>
            <TouchableWithoutFeedback onPress={ () => {changeStyle('camera'); this.props.navigation.push('CameraCapture'); }} >
               <Animated.View style={[cameraStyle, styles.positionAbsolute, opacity]}>
               
                
                   <View style={[styles.chipAndDip, this.state.cameraColorScheme]}>
                   <Feather style={[styles.dip]} name="camera" color={this.state.cameraColorScheme.color} size={30} />
                        <Text style={[styles.chip, styles.subtitle, this.state.cameraColorScheme ]}>Camera</Text>
                        
                   </View>
                   
               </Animated.View>
               </TouchableWithoutFeedback>
           <TouchableWithoutFeedback   onPress={() => {changeStyle('picture'); this.pickImage(); }}>
               <Animated.View style={[styles.positionAbsolute, pictureStyle, opacity]} >
                   <View style={[styles.chipAndDip, this.state.pictureColorScheme]}>
                   <AntDesign style={[styles.dip]} name="picture" size={32} color={this.state.pictureColorScheme.color} />
                        <Text style={[styles.chip, styles.subtitle,  this.state.pictureColorScheme]} >Pictures</Text>
                        
                   </View>
                  
               </Animated.View>
           </TouchableWithoutFeedback> 
            </View>
             
           <TouchableWithoutFeedback onPress={this.toggleMenu} >
               <Animated.View style={[styles.button, styles.menu, rotation]}>
                   <AntDesign name="plus" size={24} color="#FFF" />
               </Animated.View>
           </TouchableWithoutFeedback>
        </View>

    );
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        position:"absolute",
      
    },
    subtitle: {
        
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        
   
      }, 
    leftShifted: {
        flex:1,
        right: 165,
        position: 'relative'
    },
    button: {
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 10,
        shadowColor: global.colors.primary,
        shadowOpacity: 0.3,
        shadowOffset: {height: 8},
        
    },
    touchWrap: {
        flex: 1,
       
      },
    menu: {
        backgroundColor: global.colors.primary
    
    },
    secondary: {
        width: 48,
        height: 48,
        borderRadius: 48/2,
        backgroundColor: "#F0F3F4"

    },
    positionAbsolute:{
        position:"absolute",
        
    },
    chipAndDip: {
        flexDirection: "row",
        padding:15,
        backgroundColor: "white",
        shadowRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.3,
        elevation:3,
        height:65,
        minWidth: 165,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-between",
        shadowOffset: {height: 8}
    },
    chip: {
        
    },

    dip: {
       
    }
})