import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [registerError, setRegisterError] = useState('');

  function register(email, pass, username) {
    if (username === '') {
      setRegisterError('El nombre de usuario es obligatorio.');
      return;
    }

    auth.createUserWithEmailAndPassword(email, pass)
      .then(response => {
        db.collection('users').add({
          email: auth.currentUser.email,
          username: username,
          createdAt: Date.now()
        })
          .then(() => {
            auth.signOut();
            props.navigation.navigate('Login');
          })
          .catch(e => console.log(e))
      })
      .catch(error => {
        setRegisterError(error.message);
      })
  }

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Registro</Text>

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

      <TextInput style={ styles.field }
        keyboardType='default'
        placeholder='nombre de usuario'
        onChangeText={ text => setUsername(text) }
        value={ username } />

      { registerError !== '' ? <Text style={ styles.error }>{ registerError }</Text> : null }

      <Pressable style={ styles.button } onPress={ () => register(email, password, username) }>
        <Text style={ styles.buttonText }>Registrarme</Text>
      </Pressable>

      <Pressable onPress={ () => props.navigation.navigate('Login') }>
        <Text style={ styles.link }>¿Ya tenés cuenta? Iniciá sesión</Text>
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
    width: 250,
    textAlign: 'center',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#28a745',
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

export default Register;
