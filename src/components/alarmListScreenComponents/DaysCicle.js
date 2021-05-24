import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Button from '../Button';
import { activateDay} from '../../actions';

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
      <View style={styles.container}>
        {this.renderDays(this.props.activeDays)}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default connect(
  null,
  {activateDay}
  )(DaysCicle);
