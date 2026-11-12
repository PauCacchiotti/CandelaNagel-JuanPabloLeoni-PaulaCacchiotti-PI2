import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate('HomeMenu');
      }
    })
  }, []);

  function login(email, pass) {
    auth.signInWithEmailAndPassword(email, pass)
      .then((response) => {
        props.navigation.navigate('HomeMenu');
      })
      .catch(error => {
        setLoginError('Credenciales inválidas.');
      })
  }

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Login</Text>

      <TextInput style={ styles.field }
        keyboardType='email-address'
        placeholder='email'
        onChangeText={ text => setEmail(text) }
        value={ email } />

      <TextInput style={ styles.field }
        keyboardType='default'
        placeholder='password'
        secureTextEntry={ true }
        onChangeText={ text => setPassword(text) }
        value={ password } />

      { loginError !== '' ? <Text style={ styles.error }>{ loginError }</Text> : null }

      <Pressable style={ styles.button } onPress={ () => login(email, password) }>
        <Text style={ styles.buttonText }>Login</Text>
      </Pressable>

      <Pressable style={ styles.buttonTemporal } onPress={ () => props.navigation.navigate('HomeMenu') }>
        <Text style={ styles.buttonText }>Entrar (temporal)</Text>
      </Pressable>

      <Pressable onPress={ () => props.navigation.navigate('Register') }>
        <Text style={ styles.link }>¿No tenés cuenta? Registrate</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  field: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  error: {
    color: '#dc3545',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15
  },
  buttonTemporal: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15
  },
  buttonText: {
    color: '#fff'
  },
  link: {
    color: '#007bff'
  }
});

export default Login;
