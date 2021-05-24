import React from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import AlarmCard from './AlarmCard';

const AlarmListComponents = ({ alarms }) => {

  const renderList = ({ item }) => {
    return (
      <View style={styles.cardWrap}>
        <AlarmCard closeProps={this.closeProps} {...item} />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
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
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    marginBottom: 5
  }
});

const mapStateToProps = (state) => {
  return { alarms: state.alarms };
}

export default connect(mapStateToProps, {})(AlarmListComponents);