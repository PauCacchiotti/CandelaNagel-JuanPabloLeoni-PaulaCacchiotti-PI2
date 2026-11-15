import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';


function Home(props) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
      db.collection('posts')      
        .orderBy('createdAt', 'desc')
        .onSnapshot(
        snapshot => {
          let posteos = [];
          snapshot.forEach(doc => {
            posteos.push({
              id: doc.id,
              data: doc.data()
            });
          });
          setPosts(posteos);
        },
        error => {
          console.log('Error al obtener posteos:', error);
        }
      );
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
      .catch(error => {
        console.log(error);
      });
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
      .catch(error => {
        console.log(error);
      });
  }

  function renderPost({ item }) {
    return (
      <View style={styles.post}>
        <Text style={styles.email}>
          {item.data.owner}
        </Text>
        <Text style={styles.description}>
          {item.data.description}
        </Text>
        <Text style={styles.likes}>
          Likes: {item.data.likes ? item.data.likes.length : 0}
        </Text>
        <Pressable 
          onPress={() => {
            if (item.data.likes && item.data.likes.includes(auth.currentUser.email)) {
              quitarLike(item.id, auth.currentUser.email);
            } else {
              darLike(item.id, auth.currentUser.email);
            }
            }}>
              <Text style={styles.buttonText}>Me gusta</Text> 
        </Pressable>
        <Pressable
          onPress={() => props.navigation.navigate('Comments', {
            postId: item.id
          })}
        >
          <Text style={styles.buttonText}>Comentar</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderPost}
      />
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
  post: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    fontSize: 15,
    marginBottom: 10
  },
  likes: {
    marginBottom: 10
  },
  buttonText: {
    color: '#007bff',
    marginBottom: 10
  }
});

export default Home;