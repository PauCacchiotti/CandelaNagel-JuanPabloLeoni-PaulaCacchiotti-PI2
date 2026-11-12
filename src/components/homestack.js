import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/home';
import Comments from '../screens/comments';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Posteos"
        component={ Home }
        options={ { headerShown: false } }
      />
      <Stack.Screen
        name="Comments"
        component={ Comments }
        options={ { headerShown: false } }
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
