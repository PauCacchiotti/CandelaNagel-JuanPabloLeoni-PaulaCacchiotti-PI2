import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function NewPost(props) {
  const [descripcionPost, setDescripcionPost] = useState('');
  const [mensaje, setMensaje] = useState('');
  function crearPost() {
    if (descripcionPost === '') {
      setMensaje('Tenés que escribir una descripción.');
    } else {
      db.collection('posts').add({
        owner: auth.currentUser.email,
        description: descripcionPost,
        createdAt: Date.now(),
        likes: [],
        comments: []
      })
        .then(() => {
          setDescripcionPost('');
          setMensaje('Posteo creado correctamente.');
        })
        .catch(e => console.log(e))
    }
  }
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Crear posteo</Text>
      <TextInput style={ styles.field }
        keyboardType='default'
        placeholder='¿Qué querés compartir?'
        onChangeText={ text => setDescripcionPost(text) }
        value={ descripcionPost } />
      <Text style={ styles.mensaje }>{ mensaje }</Text>
      <Pressable style={ styles.button } onPress={ () => crearPost() }>
        <Text style={ styles.buttonText }>Publicar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  field: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    height: 150,
    marginBottom: 15
  },
  mensaje: {
    fontSize: 14,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default NewPost;