import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { COLOR_MAIN } from '../Constants';
import AppInput from './AppInput';
import AppText from './AppText';

class Clock extends React.Component {
  state = {
    hours: this.props.time.split(':')[0],
    minutes: this.props.time.split(':')[1],
  }

  setTimeOnFocus = (type) => this.setState({ [`${type}OldValue`]: this.state[type],  [type]: '' })

  setTimeOnChange = (value, type) => {
    let newValue = value.replace(/[^0-9]{0,2}/g, '');   
    let maxValue = 0; 
    
    switch (type){
      case 'minutes':
        maxValue = 59;
        break;
      case 'hours': 
        maxValue = 23;
        break;
      default:
        console.log('type error');
    }

    if (newValue.length > 2){
     return;
    }
     
    if (newValue > maxValue){
      newValue = `${maxValue}`;
    }
   
    this.setState({[type]: newValue});
  }

  setTimeOnBlur = type => {
    if(this.state[type] && this.state[type].length < 2){
      this.setState(prevState => {
        return { [type]: `0${prevState[type]}` }
      })
    }

    if(!this.state[type]){
      this.setState({[type]: this.state[`${type}OldValue`]})
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <AppInput 
            value={this.state.hours} 
            onFocus={()=> {
              this.setTimeOnFocus('hours')
            }}
            onChangeText={value => this.setTimeOnChange(value, 'hours')}
            onBlur={() => {
              this.setTimeOnBlur('hours');
              this.props.onBlur ? this.props.onBlur('hours', this.state.hours) : null 
            }}
            keyboardType='number-pad' 
            maxLengt = {2}
            style={[styles.clock, {textAlign: 'right', fontSize: this.props.fontSize}]}
          />
          <AppText style={{fontSize: this.props.fontSize}}>:</AppText>
          <AppInput 
            value={this.state.minutes} 
            onFocus={()=> this.setTimeOnFocus('minutes')}
            onChangeText={value => this.setTimeOnChange(value, 'minutes')}
            onBlur={() => {
              this.setTimeOnBlur('minutes')
              this.props.onBlur ? this.props.onBlur('minutes', this.state.minutes) : null   
            }}
            keyboardType='number-pad'
            maxLengt = {2}
            style={[styles.clock, {textAlign: 'left', fontSize: this.props.fontSize}]}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  clock: {
    flex: 0,
    color: COLOR_MAIN,
    padding: 5
  }

});

export default Clock;