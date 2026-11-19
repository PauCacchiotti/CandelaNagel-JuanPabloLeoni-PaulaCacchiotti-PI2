import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function Profile(props) {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        docs.forEach(doc => {
          setUsername(doc.data().username);
        })
      })
    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
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
  function logout() {
    auth.signOut()
      .then(() => {
        props.navigation.navigate('Login');
      })
  }
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Mi Perfil</Text>
      <Text style={ styles.label }>Nombre de usuario:</Text>
      <Text style={ styles.info }>{ username }</Text>
      <Text style={ styles.label }>Email:</Text>
      <Text style={ styles.info }>{ auth.currentUser.email }</Text>
      <Text style={ styles.subtitle }>Mis reseñas</Text>
      <FlatList
        data={ posts }
        keyExtractor={ item => item.id }
        renderItem={ ({ item }) =>
          <View style={ styles.post }>
            <Text style={ styles.description }>{ item.data.description }</Text>
            <Text style={ styles.likes }>Likes: { item.data.likes.length }</Text>
          </View>
        }
      />
      <Pressable style={ styles.button } onPress={ () => logout() }>
        <Text style={ styles.buttonText }>Cerrar sesión</Text>
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
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9CA3AF',
    marginBottom: 5
  },
  info: {
    fontSize: 16,
    color: '#F9FAFB',
    marginBottom: 15
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 15
  },
  post: {
    backgroundColor: '#1F2937',
    padding: 15,
    borderRadius: 8,
    borderColor: '#374151',
    marginBottom: 10
  },
  description: {
    fontSize: 15,
    color: '#E5E7EB',
    marginBottom: 10
  },
  likes: {
    fontSize: 14,
    color: '#9CA3AF'
  },
  button: {
    backgroundColor: '#E63946',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default Profile;