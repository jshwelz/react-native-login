/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text, AsyncStorage} from 'react-native';
import {Container, Item, Form, Input, Button, Label} from 'native-base';
const AccessToken = 'Acess Token';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      accessToken: '',
    };
  }
  componentDidMount() {
    console.log(this.state.accessToken);
    this.getToken();
  }
  async storeToken(actk) {
    try {
      await AsyncStorage.setItem(AccessToken, actk);
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }
  async getToken(actk) {
    try {
      let token = await AsyncStorage.getItem(AccessToken);
      console.log(token);
    } catch (error) {
      console.log('Something went wrong');
    }
  }
  async SignIn(email, password) {
    this.setState({showProgress: true});
    try {
      let response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          strategy: 'local',
        })
      });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        //Handle success
        this.storeToken(res);
        // console.log(this.state.accessToken);
        //On success we will store the access_token in the AsyncStorage
        // this.storeToken(accessToken);
        // this.redirect('home');
      } else {
        //Handle error
        let error = res;
        throw error;
      }
    } catch (error) {
      this.setState({error: error});
      console.log('error' + error);
      this.setState({showProgress: false});
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({email})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({password})}
            />
          </Item>
          <Button
            full
            rounded
            style={{marginTop: 20}}
            onPress={() => this.SignIn(this.state.email, this.state.password)}>
            <Text>SignIn</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: "center",
    justifyContent: 'center',
    padding: 10,
  },
});
