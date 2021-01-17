// Dependencies
import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";

// Database
import firebase from "../database/firebase";

export default function CreateFriend(props) {
    // State
    const [state, setState] = useState({
        name: "",
        email: "",
        phone: ""
    });

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

    const handleChangeText = (name, val) => {
        setState({ ...state, [name]: val });
    };

    const saveNewFriend = async () => {
        if (state.name === "") {
            alert("Please provide a name.");
        } else if (state.email === "") {
            alert("Please provide an email.");
        } else if (state.phone === "") {
            alert("Please provide a phone.");
        } else {
            try {
                await firebase.db.collection("friends").add({
                    name: state.name,
                    email: state.email,
                    phone: state.phone
                });
            } catch (error) {
                console.error(error);
            }

            props.navigation.navigate("FriendListScreen");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Name Friend"
                    onChangeText={(val) => handleChangeText("name", val)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Email Friend"
                    onChangeText={(val) => handleChangeText("email", val)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Phone Friend"
                    onChangeText={(val) => handleChangeText("phone", val)}
                />
            </View>

            <View>
                <Button
                    title="Save New Friend"
                    onPress={() => saveNewFriend()}
                />
            </View>
        </ScrollView>
    );
}
