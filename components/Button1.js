import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import {Entypo} from '@expo/vector-icons'

const Button1 = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.saveButton} >
      <View style={styles.saveContainer}>
        <Entypo
          name={'drive'}
          size={35}
        />
        <Text style={styles.saveText} >Save</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  saveButton: {
    borderWidth: 1,
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 10,
    margin: 10
    // position: 'absolute',
    // bottom: 15
  },
  saveContainer: {
    flexDirection: 'row',
  },
  saveText: {
    fontSize: 30,
    marginLeft: 10
  }
})

export default Button1