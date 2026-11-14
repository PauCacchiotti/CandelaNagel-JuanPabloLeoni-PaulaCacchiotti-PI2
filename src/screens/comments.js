import React, { useState, useEffect } from 'react';
import { View, Text,TextInput, Pressable,FlatList , StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

function Comments(props) {
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);

  const { postId } = props.route.params;

  useEffect(() => {
  const unsubscribe = db.collection('posts')
    .doc(postId)
    .onSnapshot(doc => {
      if (doc.exists) {
        setComentarios(doc.data().comments);
      }
    });

  return () => unsubscribe();
}, []);

  function agregarComentario(){
    if (comentario !== '') {
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
        console.log('Comentario agregado');
        setComentario('');
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Comentarios</Text>

      <FlatList
        data={comentarios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={styles.comentario}>
            <Text style={styles.email}>{item.owner}</Text>
            <Text>{item.text}</Text>
    </View>
        }
        listaEmptyComponent={<Text>Todavía no hay comentarios.</Text>}
        />

        <TextInput
        style={styles.input}
        placeholder="Escribí un comentario"
        onChangeText={text => setComentario(text)}
        value={comentario}
      />

      <Pressable
        style={styles.boton}
        onPress={() => agregarComentario()}
      >
        <Text style={styles.buttonText}>Comentar</Text>
      </Pressable>

   </View>
   
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2', 
    padding: 20

  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },comentario: {
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
