import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import AlarmCard from './AlarmCard';

const AlarmListComponents = ({alarms}) => {
  const [activeProps, setActiveProps] = useState(null);

  const chooseActiveProps = (id) => {
    setActiveProps(id);
  }

  const renderList = ({item}) => {
    return (
      <View style={styles.cardWrap}>
        <AlarmCard {...item} chooseActiveProps={chooseActiveProps} activeProps={activeProps}/>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View>
        <FlatList
          removeClippedSubviews={false}
          data={[...alarms].reverse()}
          renderItem={renderList}
          keyExtractor={item => item.id + item.name}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  cardWrap: {
    marginBottom: 5,
  },
});

const mapStateToProps = state => {
  return {alarms: state.alarms.alarmsList};
};

export default connect(mapStateToProps, {})(AlarmListComponents);
