import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import WaterSaverHome from './Screens/WaterSaver/WaterSaverHome'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='WaterSaverHome' component={WaterSaverHome} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}