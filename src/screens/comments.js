import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

function Comments(props) {
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const { postId } = props.route.params;

  useEffect(() => {
    db.collection('posts')
      .doc(postId)
      .onSnapshot(doc => {
        setComentarios(doc.data().comments);
      })
  }, []);

  function agregarComentario() {
    if (comentario === '') {
      setMensaje('Tenés que escribir un comentario.');
    } else {
      db.collection('posts')
        .doc(postId)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            owner: auth.currentUser.email,
            text: comentario,
            createdAt: Date.now()
          })
        })
        .then(() => {
          setComentario('');
          setMensaje('');
        })
    }
  }

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Comentarios</Text>

      <FlatList
        data={ comentarios }
        keyExtractor={ item => item.createdAt.toString() }
        renderItem={ ({ item }) =>
          <View style={ styles.comentario }>
            <Text style={ styles.email }>{ item.owner }</Text>
            <Text>{ item.text }</Text>
          </View>
        }
      />

      <TextInput style={ styles.input }
        keyboardType='default'
        placeholder='Escribí un comentario'
        onChangeText={ text => setComentario(text) }
        value={ comentario } />

      <Text style={ styles.mensaje }>{ mensaje }</Text>

      <Pressable style={ styles.boton } onPress={ () => agregarComentario() }>
        <Text style={ styles.buttonText }>Comentar</Text>
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
  comentario: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  email: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 10
  },
  mensaje: {
    color: '#dc3545',
    marginTop: 10
  },
  boton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff'
  }
});

export default Comments;
