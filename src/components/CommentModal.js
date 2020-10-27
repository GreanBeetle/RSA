import React, { useState } from 'react'
import { 
  Modal, 
  View,
  Text, 
  Pressable,
  FlatList,
  TextInput
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import COLORS from '../colors'
import { COMMENTS } from '../copy'
import { 
  GLOBAL_STYLES as STYLES,
  COMMENT_MODAL_STYLES as styles 
} from '../styles'


const CommentModal = ({ width, height, videoID }) => {
  let content

  const marginTop = height * .8
  const marginLeft = width * .8
  
  const [modalVisible, setModalVisible] = useState(false)
  const [comments, setComments] = useState(COMMENTS[videoID])
  const [newComment, setNewComment] = useState('')

  function toggleModal() {
    setModalVisible(!modalVisible)
  }

  function handleSubmitComment(event) {
    setNewComment('')
    const newComments = new Set(Array.from(comments))
    newComments.add(event.nativeEvent.text)
    setComments(newComments)
  }

  const commentIcon = (
    <Pressable 
      style={[styles.icon, {marginTop, marginLeft}]}  
      onPress={toggleModal}> 
      <FontAwesome name="commenting-o" size={36} color="white" /> 
    </Pressable>
  )

  const modal = (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible} 
      presentationStyle="overFullScreen"
      onRequestClose={() => console.log('modal closed')}
      style={styles.modal}>
        <View style={STYLES.container}>
          <View style={STYLES.container} />
          <View style={styles.slideUpBox}>
            <Pressable 
              style={styles.bigX}
              onPress={toggleModal}>
              <FontAwesome name="close" size={36} color={COLORS.textGray} />
            </Pressable> 
            <View style={{flex: 2}}>
              <FlatList
                data={Array.from(comments).reverse()}
                renderItem={({ item }) => (
                  <View style={styles.flatListItem}>
                    <Text>{item}</Text>
                  </View>
                )}
                keyExtractor={item => item}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput 
                style={styles.textInput}
                value={newComment}
                onChangeText={ text => setNewComment(text)}
                placeholder="Add comment ..."
                returnKeyType="done"
                onSubmitEditing={ event => handleSubmitComment(event)}
                />
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