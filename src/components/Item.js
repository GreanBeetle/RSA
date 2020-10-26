import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { Video } from 'expo-av'
import { useAssets } from 'expo-asset'

const Item = ({ item, shouldPlay }) => {
  const [assets] = useAssets([
    require('../../assets/fire.mp4'),
    require('../../assets/nightsky.mp4'),
    require('../../assets/waves.mp4')
  ])

  if (assets) {
    const deviceWidth = Dimensions.get('window').width
    const deviceHeight = Dimensions.get('window').height
    console.log('RENDERING ITEM')
    return (
      <View style={{ flex: 1 }} >
        <Video
          source={assets[item.videoIndex]}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={Video.RESIZE_MODE_COVER}
          shouldPlay={shouldPlay}
          isLooping
          style={{ width: deviceWidth, height: deviceHeight }}
        />
      </View>
    )
  } 
  if (!assets) return (
    <View style={{flex: 1}}>
      <Text>loading...</Text>
    </View>
  )

}

export default Item 