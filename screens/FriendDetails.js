// Dependencies
import React, { useEffect, useState } from "react";
import {
    View,
    Alert,
    Button,
    TextInput,
    ScrollView,
    StyleSheet,
    ActivityIndicator
} from "react-native";

// Database
import firebase from "../database/firebase";

// Component styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc"
    }
});

export default function FriendDetails(props) {
    // State
    const [friend, setFriend] = useState({
        id: "",
        name: "",
        email: "",
        phone: ""
    });

    const [loading, setLoading] = useState(true);

    // Get friend data on first render
    useEffect(() => {
        getFriendById(props.route.params.friendId);
    }, []);

    const getFriendById = async (id) => {
        const dbRef = firebase.db.collection("friends").doc(id);
        const doc = await dbRef.get();
        const friendsFromDB = doc.data();

        setFriend({
            id: doc.id,
            name: friendsFromDB.name,
            email: friendsFromDB.email,
            phone: friendsFromDB.phone
        });

        setLoading(false);
    };

    const handleChangeText = (name, val) => {
        setFriend({ ...friend, [name]: val });
    };

    const deleteFriend = () => {
        Alert.alert("Remove friend", "Are you sure?", [
            {
                text: "Yes",
                onPress: async () => {
                    const dbRef = firebase.db
                        .collection("friends")
                        .doc(friend.id);

                    await dbRef.delete();

                    props.navigation.navigate("FriendListScreen");
                }
            },
            { text: "Nope" }
        ]);
    };

    const updateFriend = () => {
        Alert.alert("Update friend", "Are you sure?", [
            {
                text: "Yes",
                onPress: async () => {
                    const dbRef = firebase.db
                        .collection("friends")
                        .doc(friend.id);

                    await dbRef.set({
                        name: friend.name,
                        email: friend.email,
                        phone: friend.phone
                    });

                    props.navigation.navigate("FriendListScreen");
                }
            },
            { text: "Nope" }
        ]);
    };

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        );
    } else {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Name Friend"
                        value={friend.name}
                        onChangeText={(val) => handleChangeText("name", val)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Email Friend"
                        value={friend.email}
                        onChangeText={(val) => handleChangeText("email", val)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Phone Friend"
                        value={friend.phone}
                        onChangeText={(val) => handleChangeText("phone", val)}
                    />
                </View>

                <View>
                    <Button
                        title="Update Friend"
                        color="#19ac52"
                        onPress={() => updateFriend()}
                    />
                </View>

                <View>
                    <Button
                        title="Delete Friend"
                        color="#e37399"
                        onPress={() => deleteFriend()}
                    />
                </View>
            </ScrollView>
        );
    }
}
