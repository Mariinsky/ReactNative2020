import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';

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
    }
);

const Navigator = createStackNavigator(
    // RouteConfigs
    {
      Home: {
        screen: TabNavigator,
        navigationOptions: {
          headerMode: 'none', // this will hide the header
          headerStyle: {
            height: 30,
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
          headerMode: 'none', // this will hide the header
          headerStyle: {
            backgroundColor: '#f3e5f5',
          },
          headerTintColor: '#6a1b9a',
          headerTitleStyle: {
          fontWeight: 'bold',
    },
        },
      },
    },
);

export default createAppContainer(Navigator);
