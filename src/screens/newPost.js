import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function NewPost(props) {
  const [descripcionPost, setDescripcionPost] = useState('');
  const [mensaje, setMensaje] = useState('');
  function crearPost() {
    if (descripcionPost.trim() === '') {
      setMensaje('Tenés que escribir una descripción.');
      return;
    }
    if (!auth.currentUser) {
      setMensaje('Tenés que iniciar sesión para crear un posteo.');
      return;
    }
    db.collection('posts').add({
      descripcionPost: descripcionPost,
      email: auth.currentUser.email,
      createdAt: Date.now(),
      likes: []
    })
    .then(() => {
      setDescripcionPost('');
      setMensaje('Posteo creado correctamente.');
    })
    .catch(error => {
      console.log('Error al crear posteo:', error);
      setMensaje('No se pudo crear el posteo.');
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear posteo</Text>
      <TextInput
        style={styles.field}
        placeholder="¿Qué querés compartir?"
        multiline={true}
        onChangeText={text => setDescripcionPost(text)}
        value={descripcionPost}
      />
      {mensaje !== '' ? (
        <Text style={styles.mensaje}>{mensaje}</Text>
      ) : null}
      <Pressable
        style={styles.button}
        onPress={crearPost}
      >
        <Text style={styles.buttonText}>Publicar</Text>
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
    textAlignVertical: 'top',
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