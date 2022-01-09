import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    FlatList
} from 'react-native'

import { MyButton } from "../componentes/Button"
import { SkillCard } from "../componentes/SkillCard"

interface SkillData {
    id: string
    name: string
}


export function Home() {
    const [newSkill, setNewSkill] = useState('')
    const [mySkills, setMySkills] = useState<SkillData[]>([])
    const [gretting, setGretting] = useState('')

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }
        setMySkills(oldState => [...oldState, data])
    }

    function handleRemoveSkill(id: string) {
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id
        ))
    }

    useEffect(() => {
        const currentHour = new Date().getHours()

        if (currentHour < 12) {
            setGretting('Bom dia')
        } else if (currentHour >= 12 && currentHour < 18) {
            setGretting('Boa tarde')
        } else {
            setGretting('Boa noite')
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Alex</Text>
            <Text style={styles.gretting}>{gretting}</Text>

            <TextInput
                style={styles.input}
                placeholder='New Skill'
                placeholderTextColor='#555'
                onChangeText={setNewSkill}
            />

            <MyButton title='Add' onPress={handleAddNewSkill} />

            <Text style={[styles.title, { marginVertical: 50 }]}>
                My Skills
            </Text>

            <FlatList
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SkillCard skill={item.name} onPress={() => handleRemoveSkill(item.id)} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 20,
        paddingVertical: 70,
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    gretting: {
        color: '#FFF',
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 25 : 15,
        marginTop: 30,
        borderRadius: 7
    },
})