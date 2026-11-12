import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import HomeStack from './homestack';
import Profile from '../screens/profile';
import NewPost from '../screens/newPost';

const Tab = createBottomTabNavigator();

function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
      <Tab.Screen
        name="Home"
        component={ HomeStack }
        options={
          { tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }
        }
      />
      <Tab.Screen
        name="NewPost"
        component={ NewPost }
        options={
          { tabBarIcon: () => <FontAwesome name="plus-square" size={24} color="black" /> }
        }
      />
      <Tab.Screen
        name="Profile"
        component={ Profile }
        options={
          { tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }
        }
      />
    </Tab.Navigator>
  );
}

export default HomeMenu;
