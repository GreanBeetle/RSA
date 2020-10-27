import React, { useState } from 'react'
import { 
  Modal, 
  View, 
  Pressable,
  FlatList 
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import COLORS from '../colors'
import { COMMENTS } from '../copy'


const CommentModal = ({ width, height, videoID }) => {
  console.log('VIDEO ID', videoID)
  console.log('COMMENTS', COMMENTS)

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
  const [comments, setComments] = useState(COMMENTS[videoID])

  console.log('comments as set in state', comments)


  function toggleModal() {
    setModalVisible(!modalVisible)
  }

  const CommentList = () => {
    return (
      <FlatList />
    )
  }

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
      visible={modalVisible} // hmm possibly bad practice to use this here AND when setting content
      presentationStyle="overFullScreen"
      onRequestClose={() => console.log('modal closed')}
      style={{ zIndex: 100, marginBottom: 20, marginRight: 20, position: 'absolute'}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1 }} />
          <View style={{flex: 1, flexDirection: 'column', borderRadius: 25, backgroundColor: COLORS.lynxWhite }}>
            <Pressable 
              style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 20}}
              onPress={toggleModal}>
              <FontAwesome name="close" size={36} color={COLORS.textGray} />
            </Pressable> 
            <View style={{flex: 5}}>
            </View> 
          </View>
        </View>
      
    </Modal>
  )

  if (!modalVisible) content = commentIcon

  if (modalVisible) content = modal 

  return content
  
  
  
}

export default CommentModal