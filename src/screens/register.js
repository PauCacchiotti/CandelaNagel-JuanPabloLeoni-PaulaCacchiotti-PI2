import { View, Text, Pressable, StyleSheet } from 'react-native';

function Register(props) {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Registro</Text>

      <Pressable onPress={ () => props.navigation.navigate('Login') }>
        <Text style={ styles.link }>¿Ya tenés cuenta? Iniciá sesión</Text>
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
  link: {
    color: '#007bff'
  }
});

export default Register;
