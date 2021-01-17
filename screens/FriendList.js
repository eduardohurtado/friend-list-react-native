// Dependencies
import React, { useEffect, useState } from "react";
import { ScrollView, Button } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

// Database
import firebase from "../database/firebase";

export default function FriendList(props) {
    const [friends, setFriends] = useState([]);

    // Querying all friends from DB
    useEffect(() => {
        firebase.db.collection("friends").onSnapshot((querySnapshot) => {
            let friendsFromDB = [];

            querySnapshot.docs.forEach((doc) => {
                const { name, email, phone } = doc.data();

                friendsFromDB.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                });
            });

            setFriends(friendsFromDB);
        });
    }, []);

    return (
        <ScrollView>
            <Button
                title="Create a new friend"
                onPress={() => props.navigation.navigate("CreateFriendScreen")}
            />

            {friends.map((friend) => {
                return (
                    <ListItem
                        key={friend.id}
                        bottomDivider
                        onPress={() => {
                            props.navigation.navigate("FriendDetailsScreen", {
                                friendId: friend.id
                            });
                        }}
                    >
                        <ListItem.Chevron />
                        <Avatar
                            rounded
                            source={{
                                uri:
                                    "https://www.clipartmax.com/png/middle/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png"
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{friend.name}</ListItem.Title>
                            <ListItem.Subtitle>
                                {friend.email}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                );
            })}
        </ScrollView>
    );
}
