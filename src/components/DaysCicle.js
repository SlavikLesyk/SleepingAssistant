import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { activateDay} from '../actions';

class DaysCicle extends React.Component {  
  renderDays = (activeDays) => { 
    const days = ['s', 'm', 't', 'w', 't', 'f', 's'];    
    return days.map((day, index) => {
      return(
        <Button 
          key={day + index} 
          style={{ opacity: activeDays[index] ? 1 : .5 }}
          onPress = {() => this.props.activateDay(this.props.id, index)}
        >{day.toUpperCase()}</Button>
      );
    });
  };

  render() {
    return(
      this.renderDays(this.props.activeDays)
    );
  }
};

const styles = StyleSheet.create({});

export default connect(
  null,
  {activateDay}
  )(DaysCicle);
