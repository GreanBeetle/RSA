import React, { useState } from 'react'
import { Modal, View, Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import COLORS from '../colors'


const CommentModal = ({ width, height }) => {
  let content
  const marginTop = height * .8
  const marginLeft = width * .8
  const styles = {
    icon: { 
      zIndex: 100, 
      position: 'absolute', 
      marginTop, 
      marginLeft, 
      height: 60, 
      width: 60 
    }
  }

  const [modalVisible, setModalVisible] = useState(false)

  function toggleModal() {
    console.log('comment icon pressed!')
    setModalVisible(!modalVisible)
  }

  console.log('rendering modal component')

  const commentIcon = (
    <Pressable 
      style={styles.icon}  
      onPress={toggleModal}> 
      <FontAwesome name="commenting-o" size={36} color="white" /> 
    </Pressable>
  )

  const modal = (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible} // double usage of "modalVisible" probably not good
      presentationStyle="overFullScreen"
      onRequestClose={() => console.log('modal closed')}
      style={{ zIndex: 100, marginBottom: 20, marginRight: 20, position: 'absolute'}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1 }} />
          <View style={{flex: 1, flexDirection: 'column', borderRadius: 25, backgroundColor: COLORS.lynxWhite }}/> 
        </View>
      
    </Modal>
  )

  if (!modalVisible) content = commentIcon

  if (modalVisible) content = modal 

  return content
  
  
  
}

export default CommentModal