import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { db } from '../firebase/config';

function Home(props) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection('posts')
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
    return () => unsubscribe();
  }, []);
  function renderPost({ item }) {
    return (
      <View style={styles.post}>
        <Text style={styles.email}>
          {item.data.email}
        </Text>
        <Text style={styles.description}>
          {item.data.descripcionPost}
        </Text>
        <Text style={styles.likes}>
          Likes: {item.data.likes ? item.data.likes.length : 0}
        </Text>
        <Pressable>
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
        ListEmptyComponent={
          <Text>Todavía no hay posteos.</Text>
        }
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