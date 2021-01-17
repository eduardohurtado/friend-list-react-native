import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import CreateFriend from "./screens/CreateFriend";
import FriendDetails from "./screens/FriendDetails";
import FriendList from "./screens/FriendList";

// Stack navigator
const Stack = createStackNavigator();

// Screens for my App
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FriendListScreen"
                component={FriendList}
                options={{ title: "My Friends List" }}
            />
            <Stack.Screen
                name="CreateFriendScreen"
                component={CreateFriend}
                options={{ title: "Create a New Friend" }}
            />
            <Stack.Screen
                name="FriendDetailsScreen"
                component={FriendDetails}
                options={{ title: "Friend Details" }}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
