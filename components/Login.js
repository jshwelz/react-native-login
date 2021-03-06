import React from 'react';
import {StyleSheet, Text, AsyncStorage} from 'react-native';
import {Container, Item, Form, Input, Button, Label} from 'native-base';
import * as firebase from 'firebase';
import config from '../firebase.config' 
// Initialize Firebase
firebase.initializeApp(config);

export default class Login extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  handleLogin = () => {
    const {email, password} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({errorMessage: error.message}));
  };

  SignUp = (email, password) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({errorMessage: error.message}));
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  async getToken(actk) {
    try {
      firebase.auth().onAuthStateChanged(async user => {
        this.props.navigation.navigate('Main');
      });
    } catch (error) {
      console.log('User has not logg in');
    }
  }

  componentDidMount() {
    console.log(this.state.accessToken);
    this.getToken();
  }

  render() {
    return (
      <Container style={styles.container}>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
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
            onPress={() =>
              this.handleLogin(this.state.email, this.state.password)
            }>
            <Text>SignIn</Text>
          </Button>
          <Button
            full
            rounded
            success
            style={{marginTop: 20}}
            onPress={() => this.SignUp(this.state.email, this.state.password)}>
            <Text>Signup</Text>
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
    justifyContent: 'center',
    padding: 10,
  },
});
