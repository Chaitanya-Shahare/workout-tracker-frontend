import * as React from 'react';
import { useEffect, useState } from 'react';

import { StyleSheet, View } from "react-native";

import { Surface } from 'react-native-paper';
import { Card, Text, IconButton, Button } from 'react-native-paper';

export const HomeScreen = () => {
    const [date, setDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [value, setValue] = React.useState('');

    useEffect(() => {
        const today = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US');
        setDate(formattedDate);
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            setCurrentTime(formattedTime);
        };

        updateTime();

        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Surface style={styles.container}>

            {/* Summmary */}
            <View>
                <View style={styles.summary}>
                    <Text variant="titleMedium">{date}</Text>
                    <Text variant="titleLarge" style={styles.title}>Summary</Text>
                </View>

                <Card style={{ marginTop: 8, minHeight: 100 }}>
                    <Card.Content>
                        <View style={styles.row}>
                            <View style={styles.data}>
                                <Text variant="titleMedium">
                                    Sets
                                </Text>
                                <Text variant="titleMedium">
                                    27
                                </Text>
                            </View>
                            <View style={styles.data}>
                                <Text variant="titleMedium">
                                    Repetitions
                                </Text>
                                <Text variant="titleMedium">
                                    123
                                </Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.data}>
                                <Text variant="titleMedium">
                                    Exercise
                                </Text>
                                <Text variant="titleMedium">
                                    9
                                </Text>
                            </View>
                            <View style={styles.data}>
                                <Text variant="titleMedium">
                                    Session Time
                                </Text>
                                <Text variant="titleMedium">
                                    {currentTime}
                                </Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
            </View>

            {/* lists */}
            <View style={{ marginTop: 32 }}>
                <View style={styles.lists}>
                    <Text variant="titleLarge" style={styles.title}>Lists</Text>
                    <IconButton
                        icon="plus"
                        onPress={() => console.log('added')}
                    />
                </View>

                <Card style={{ minHeight: 100 }}>
                    <Card.Content style={{ gap: 4 }}>
                        <Button mode="contained-tonal" onPress={() => console.log('Pressed')}>
                            My Exercises
                        </Button>
                        <Button mode="contained-tonal" onPress={() => console.log('Pressed')}>
                            Push
                        </Button>
                        <Button mode="contained-tonal" onPress={() => console.log('Pressed')}>
                           Pull
                        </Button>
                        <Button mode="contained-tonal" onPress={() => console.log('Pressed')}>
                           Legs
                        </Button>
                    </Card.Content>
                </Card>
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    summary: {
        marginHorizontal: 12,
    },
    lists: {
        marginHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    data: {
        width: '50%',
    }
});