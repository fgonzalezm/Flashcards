import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import {Entypo} from '@expo/vector-icons'


const IconOverlay = ({iconName, iconSize, iconColor}) => {
  return (
    <View style={styles.iconOverlay} pointerEvents='none' >
      <Entypo
        style={[styles.borderIcon, styles.topLeft]}
        name={iconName}
        size={iconSize}
        color={iconColor} />
      {/*<Entypo*/}
        {/*style={[styles.borderIcon, styles.topRight]}*/}
        {/*name={iconName}*/}
        {/*size={iconSize}*/}
        {/*color={iconColor} />*/}
      {/*<Entypo*/}
        {/*style={[styles.borderIcon, styles.bottomLeft]}*/}
        {/*name={iconName}*/}
        {/*size={iconSize}*/}
        {/*color={iconColor} />*/}
      <Entypo
        style={[styles.borderIcon, styles.bottomRight]}
        name={iconName}
        size={iconSize}
        color={iconColor} />
    </View>
  )
}

const distance = 10

const styles = StyleSheet.create({
  iconOverlay: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    width: '100%',
    height: '100%'
  },
  borderIcon: {
    position: 'absolute',
  },
  topLeft: {
    top: distance,
    left: distance
  },
  topRight: {
    top: distance,
    right: distance
  },
  bottomLeft: {
    bottom: distance,
    left: distance
  },
  bottomRight: {
    bottom: distance,
    right: distance
  }
})

export default IconOverlay