import React, { Component } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
// import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-client-preset';
import { ApolloProvider } from '@apollo/react-hooks';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import Videos from './Videos';

const client = new ApolloClient({
  uri: 'http://hive.ladbible.com/graphql'
})

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class MainApp extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Image
            source={require('./logo.png')}
            style={styles.image}
          />
          <Videos />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    marginBottom: 16
  }
});
