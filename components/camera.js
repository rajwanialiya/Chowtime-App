import * as React from 'react';
import { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

//Camera Imports
import { TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Camera as Cam } from 'expo-camera';

// function CameraScreen() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Cam.Constants.Type.back);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Cam.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//     <>
//     <View style={{ flex: 1 }}>
//       <Cam style={{ flex: 1 }} type={type}>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: 'transparent',
//             flexDirection: 'row',
//           }}>
//           <TouchableOpacity
//             style={{
//               flex: 0.1,
//               alignSelf: 'flex-end',
//               alignItems: 'center',
//             }}
//             onPress={() => {
//               setType(
//                 type === Cam.Constants.Type.back
//                   ? Cam.Constants.Type.front
//                   : Cam.Constants.Type.back
//               );
//             }}>
//             <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
//           </TouchableOpacity>
//         </View>
//       </Cam>
//     </View>
//     <View style={{flex:2}}>
//       <Text>TEST</Text>
//     </View>
//     </>
//   );
// }

export class Camera extends Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>HELLO</Text>    
        </View>
      );
  }
}