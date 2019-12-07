import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './Components/Main/Main';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Main style={{ flex: 1 }}></Main>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;