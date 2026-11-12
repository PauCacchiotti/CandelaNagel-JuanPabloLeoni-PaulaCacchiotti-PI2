import { View, Text, StyleSheet } from 'react-native';

function Profile(props) {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Mi perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});

export default Profile;
