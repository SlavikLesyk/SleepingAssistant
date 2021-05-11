import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Button from '../components/Button';
import AppText from '../components/AppText';
import AppBackground from '../components/AppBackground';
import SleepingCircle from '../components/SleepingCircle';
import { changeFallAsleepTime } from '../actions';
import { windowHeight } from '../Constants';


class StartingScreen extends React.Component { 
  
  render(){
    return (
      <AppBackground>
        <View style={styles.container}>
          <View style={styles.header}>
            <AppText>How long</AppText>
            <AppText>do you fall sleep?</AppText> 
          </View>          
          <View style={styles.timer}>
            <AppText>{this.props.fallAsleepTime}</AppText>
            <AppText>min</AppText>
          </View>
          <View style={styles.circle}>
            <SleepingCircle />
          </View>
          <View style={styles.button}>
            <Button onPress={() => this.props.navigation.navigate('Home') }>confirm</Button>
          </View>
        </View>
      </AppBackground>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: windowHeight * .2,
    alignItems: 'center'
  },
  header: {
    flex: 1,    
    alignItems: 'center',
  },
  timer: {
    flex: 1,
    flexDirection: 'row'
  },
  button: { 
    flex: 1
  },
  circle: {
    flex: 3,
  }
});

const mapStateToProps = (state) =>{
  return {fallAsleepTime: state.fallAsleepTime};
}


export default connect(mapStateToProps,{ changeFallAsleepTime })(StartingScreen)