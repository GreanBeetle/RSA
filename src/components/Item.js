import React from 'react'
import { View } from 'react-native'
import { Video } from 'expo-av'
import CommentModal from './CommentModal'

const Item = ({ item, shouldPlay, assets, deviceHeight, deviceWidth }) => { 
  const play = shouldPlay[item.videoIndex]
  return (
    <View style={{ flex: 1 }} >
      <CommentModal 
        width={deviceWidth}
        height={deviceHeight}
      />
      <Video
        source={assets[item.videoIndex]}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={Video.RESIZE_MODE_COVER}
        shouldPlay={play}
        isLooping
        style={{ width: deviceWidth, height: deviceHeight }}
      />
    </View>
  )
}

export default Item 