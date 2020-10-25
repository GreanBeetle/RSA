import React from 'react'
import { StyleSheet, View, SafeAreaView} from 'react-native'
import { Video } from 'expo-av'

const App = () => {
  console.log('rendering app')


  class PlayListItem {
    constructor(name, uri) {
      this.name = name 
      this.uri = uri
    }
  }

  const PLAYLIST = [
    new PlayListItem('fire', 'https://github.com/GreanBeetle/video-storage/blob/master/fire.mp4'), 
    new PlayListItem('waves', 'https://github.com/GreanBeetle/video-storage/blob/master/waves.mp4'),
    new PlayListItem('nightsky', 'https://github.com/GreanBeetle/video-storage/blob/master/nightsky.mp4' )
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Video 
        source={{ uri: 'https://github.com/GreanBeetle/video-storage/blob/master/fire.mp4' }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        shouldPlay={true}
        isLooping={true}
      />
    </SafeAreaView>
  )
}

export default App 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
