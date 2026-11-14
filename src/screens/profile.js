import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function Profile(props) {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const user = auth.currentUser;
  const email = user ? user.email : '';
  useEffect(() => {
    if (!user) {
      return;
    }
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          setUsername(snapshot.docs[0].data().username);
        }
      })
      .catch(error => {
        console.log('Error al obtener usuario:', error);
      });
    const unsubscribe = db.collection('posts')
      .where('email', '==', email)
      .onSnapshot(
        snapshot => {
          let posteos = [];
          snapshot.forEach(doc => {
            posteos.push({
              id: doc.id,
              data: doc.data()
            });
          });
          posteos.sort((a, b) =>
            b.data.createdAt - a.data.createdAt
          );
          setPosts(posteos);
        },
        error => {
          console.log('Error al obtener posteos:', error);
        }
      );
    return () => unsubscribe();
  }, [email]);
  function logout() {
    auth.signOut()
      .then(() => {
        console.log('Sesión cerrada correctamente');
        props.navigation.getParent().reset({
          index: 0,
          routes: [{ name: 'Login' }]
        });
      })
      .catch(error => {
        console.log('Error al cerrar sesión:', error);
        setError('No se pudo cerrar sesión.');
      });
  }
  function renderPost({ item }) {
    return (
      <View style={styles.post}>
        <Text style={styles.description}>
          {item.data.descripcionPost}
        </Text>
        <Text style={styles.likes}>
          Likes: {item.data.likes ? item.data.likes.length : 0}
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <Text style={styles.label}>Nombre de usuario:</Text>
      <Text style={styles.info}>{username}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.info}>{email}</Text>
      <Text style={styles.subtitle}>Mis posteos</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        ListEmptyComponent={
          <Text>Todavía no creaste posteos.</Text>
        }
      />
      {error !== '' ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
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
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5
  },
  info: {
    fontSize: 16,
    marginBottom: 15
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  post: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  description: {
    fontSize: 15,
    marginBottom: 10
  },
  likes: {
    fontSize: 14,
    color: '#666'
  },
  button: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  error: {
    color: '#dc3545',
    marginTop: 10
  }
});

export default Profile;