import COLORS from './colors'

export const GLOBAL_STYLES = {
  container: {
    flex: 1
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  } 
}

export const COMMENT_MODAL_STYLES = {
  modal: { 
    zIndex: 100, 
    marginBottom: 20, 
    marginRight: 20, 
    position: 'absolute' 
  },
  slideUpBox: { 
    flex: 1, 
    flexDirection: 'column', 
    borderRadius: 25, 
    backgroundColor: COLORS.lynxWhite 
  },
  icon: {
    zIndex: 100,
    position: 'absolute',
    height: 60,
    width: 60
  },
  bigX: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    marginRight: 20 
  },
  flatListItem: { 
    marginHorizontal: 25, 
    marginVertical: 10 
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 25,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 5
  }, 
  textInput: { 
    flex: 3, 
    padding: 20 
  }
}