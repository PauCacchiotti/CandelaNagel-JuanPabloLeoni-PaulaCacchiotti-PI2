import { View, Text, Pressable, StyleSheet } from 'react-native';

function Login(props) {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Login</Text>

      <Pressable style={ styles.button } onPress={ () => props.navigation.navigate('HomeMenu') }>
        <Text style={ styles.buttonText }>Entrar (temporal)</Text>
      </Pressable>

      <Pressable onPress={ () => props.navigation.navigate('Register') }>
        <Text style={ styles.link }>¿No tenés cuenta? Registrate</Text>
      </Pressable>
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
    fontWeight: 'bold',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15
  },
  buttonText: {
    color: '#fff'
  },
  link: {
    color: '#007bff'
  }
});

export default Login;
