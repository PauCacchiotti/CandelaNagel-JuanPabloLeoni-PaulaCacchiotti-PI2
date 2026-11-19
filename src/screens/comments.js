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
    backgroundColor: '#111827',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 20
  },
  comentario: {
    backgroundColor: '#1F2937',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  email: {
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 5
  },
  input: {
    backgroundColor: '#1F2937',
    color: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#374151',
    padding: 12,
    borderRadius: 8,
    marginTop: 10
  },
  mensaje: {
    color: '#E63946',
    marginTop: 10
  },
  boton: {
    backgroundColor: '#E63946',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default Comments;
