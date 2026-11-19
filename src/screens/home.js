import { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

function Home(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let posteos = [];
        docs.forEach(doc => {
          posteos.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setPosts(posteos);
      })
  }, []);

  function darLike(id, email) {
    db.collection('posts')
      .doc(id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(email)
      })
      .then(() => {
        console.log('Like agregado');
      })
  }

  function quitarLike(id, email) {
    db.collection('posts')
      .doc(id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(email)
      })
      .then(() => {
        console.log('Like eliminado');
      })
  }

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>CineTalk</Text>

      <FlatList
        data={ posts }
        keyExtractor={ item => item.id }
        renderItem={ ({ item }) =>
          <View style={ styles.post }>
            <Text style={ styles.email }>{ item.data.owner }</Text>
            <Text style={ styles.description }>{ item.data.description }</Text>
            <Text style={ styles.likes }>Likes: { item.data.likes.length }</Text>

            <Pressable onPress={ () => {
              if (item.data.likes.includes(auth.currentUser.email)) {
                quitarLike(item.id, auth.currentUser.email);
              } else {
                darLike(item.id, auth.currentUser.email);
              }
            } }>
              <Text style={ styles.buttonText }>Me gusta</Text>
            </Pressable>

            <Pressable onPress={ () => props.navigation.navigate('Comments', { postId: item.id }) }>
              <Text style={ styles.buttonText }>Comentar</Text>
            </Pressable>
          </View>
        }
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 20
  },
  post: {
    backgroundColor: '#1F2937',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 10
  },
  description: {
    fontSize: 15,
    color: '#E5E7EB',
    marginBottom: 10
  },
  likes: {
    color: '#9CA3AF',
    marginBottom: 10
  },
  buttonText: {
    color: '#E63946',
    marginBottom: 10
  }
});

export default Home;
