import React, { useState } from 'react'
import { Modal, View, Dimensions } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const CommentModal = ({ width, height }) => {
  console.log('rendering modal')
  const marginTop = height * .8
  const marginLeft = width * .8
  const styles = {
    icon: {
      position: 'absolute',
      zIndex: 100,
      marginTop,
      marginLeft 
    }
  }
  return (
    <View style={styles.icon}>
      <FontAwesome name="commenting-o" size={36} color="white" /> 
    </View>
    // <Modal
    //   transparent={true}
    //   visible={true} // prop for this
    //   onRequestClose={() => console.log('modal closed')}
    //   style={{ zIndex: 100, marginBottom: 20, marginRight: 20, position: 'absolution'}}
    // >
    // </Modal>
  )
}

export default CommentModal