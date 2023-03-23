import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AddNewTip from './Screens/WaterSaver/AddNewTip';
import WaterComments from './Screens/WaterSaver/WaterComments';
import WaterSaverCategories from './Screens/WaterSaver/WaterSaverCategories';
import WaterSaverHome from './Screens/WaterSaver/WaterSaverHome';
import WaterSavingTips from './Screens/WaterSaver/WaterSavingTips';
import WaterTipView from './Screens/WaterSaver/WaterTipView';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='WaterSaverHome' component={WaterSaverHome} />
        <Stack.Screen name='WaterSavingTips' component={WaterSavingTips} />
        <Stack.Screen name='WaterSaverCategories' component={WaterSaverCategories} />
        <Stack.Screen name='WaterTipView' component={WaterTipView} />
        <Stack.Screen name='AddNewWaterTip' component={AddNewTip} />
        <Stack.Screen name='WaterSaverComments' component={WaterComments} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}