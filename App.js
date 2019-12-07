import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './Components/Main/Main';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Main></Main>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;