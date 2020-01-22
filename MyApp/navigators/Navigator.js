import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import AuthLoading from '../views/AuthLoading';
import Login from '../views/Login';

const TabNavigator = createBottomTabNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: {
          title: 'Home',

        },
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: 'Profile',
        },
      },
    },
    {
      initialRouteName: 'Home',
      tabBarOptions: {

        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#6a1b9a',
        labelStyle:{
          fontSize: 20,
          fontWeight: 'bold'
        }
      }
    }

);

const StackNavigator = createStackNavigator(
    // RouteConfigs
    {
      Home: {
        screen: TabNavigator,
        navigationOptions: {
          headerShown: false, // this will hide the header
          headerStyle: {
                       backgroundColor: '#f3e5f5',
          },
          headerTintColor: '#6a1b9a',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
        },
      },
      Single: {
        screen: Single,
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#f3e5f5',
          },
          headerTintColor: '#6a1b9a',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
        },
      },
      Logout: {
        screen: Login,
      },
    },
);

const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: StackNavigator,
    Auth: Login,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(Navigator);
