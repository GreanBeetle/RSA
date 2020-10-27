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


const CommentModal = ({ width, height, videoID }) => {
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
      style={styles.icon}  
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
      style={{ zIndex: 100, marginBottom: 20, marginRight: 20, position: 'absolute'}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1 }} />
          <View style={{flex: 1, flexDirection: 'column', borderRadius: 25, backgroundColor: COLORS.lynxWhite }}>
            <Pressable 
              style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 20}}
              onPress={toggleModal}>
              <FontAwesome name="close" size={36} color={COLORS.textGray} />
            </Pressable> 
            <View style={{flex: 2}}>
              <FlatList
                data={Array.from(comments).reverse()}
                renderItem={({ item }) => <View style={{ marginHorizontal: 25, marginVertical: 10 }}><Text>{item}</Text></View>}
                keyExtractor={item => item}
              />
            </View>
            <View style={{ 
                flex: 1, 
                flexDirection: 'row',
                margin: 25, 
                marginBottom: 50, 
                borderWidth: 1, 
                borderColor: COLORS.borderGray, 
                backgroundColor: COLORS.backgroundGray, 
                borderRadius: 5 
              }}>
              <TextInput 
                style={{flex: 3, padding: 20}}
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