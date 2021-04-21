import  React  from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import { connect } from 'react-redux';
import GestureRecognizer from '../utility/swipe-gestures';
import AppBackground from '../components/AppBackground';
import AlarmCard from '../components/AlarmCard';


renderList = ({item}) => {
  return (
    <View style={styles.cardWrap}>
      <AlarmCard closeProps={this.closeProps} {...item} />
    </View>
  );
};

const AlarmListScreen = ({ alarms, navigation }) => {
  return (
    <GestureRecognizer 
      onSwipeLeft={() => navigation.navigate('Playlist')} 
      onSwipeRight={() => navigation.navigate('Home')}
      style={{flex: 1}}
    >
      <AppBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}          
        >
          <View>
            <FlatList
              removeClippedSubviews={false}               
              data={[...alarms].reverse()}
              renderItem={renderList}
              keyExtractor={item => item.id + item.name}
            />
          </View>
        </KeyboardAvoidingView>          
      </AppBackground>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    marginBottom: 5
  }
});

const mapStateToProps = (state) =>{
  return {alarms: state.alarms};
}

export default connect(mapStateToProps,{})(AlarmListScreen);