import { createStackNavigator } from '@react-navigation/stack';
import { getHeaderTitle } from '@react-navigation/elements';

import DefaultScreenPosts from '../../nestedScreens/DefaultScreenPosts/DefaultScreenPosts';
import CommentsScreen from '../../nestedScreens/CommentsScreen/CommentsScreen';
import MapScreen from '../../nestedScreens/MapScreen/MapScreen';

import Header from '../../../components/Header/Header';

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          headerTitle: 'Публикации',
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);
            return <Header title={title} navigation={navigation} back={back} />;
          },
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitle: 'Комментарии',
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);
            return <Header title={title} navigation={navigation} back={back} />;
          },
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitle: 'Карта',
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);
            return <Header title={title} navigation={navigation} back={back} />;
          },
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
