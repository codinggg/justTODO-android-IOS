import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import Note from './Note';



export default class Main extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
        };
        let todoList = this.testGet();
        console.log(todoList);
        console.log('++++++++++');
    }

    render() {
        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val}
                         deleteMethod={() => this.deleteNote(key)}/>
        });


        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        - Just TODO -
                    </Text>
                </View>

                <ScrollView style={styles.scollContainer}>
                    {notes}
                </ScrollView>

                <View style={styles.footer}>
                    <TextInput style={styles.textInput}
                               onChangeText={(noteText) => this.setState({noteText})}
                               value={this.state.noteText}
                               placeholder='>添加TODO事项'
                               placeholderTextColor='while'
                               underlineColorAndroid='transparent'>

                    </TextInput>
                </View>

                <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>

            </View>
        );
    }

    addNote() {
        this.testGet();

        if (this.state.noteText) {
            let d = new Date();
            this.state.noteArray.push({
                'date': d.getFullYear() +
                "/" + (d.getMonth() + 1) +
                "/" + d.getDate(),
                'note': this.state.noteText
            });
            this.setState({noteArray: this.state.noteArray});
            this.setState({noteText: ''});
        }
    }

    deleteNote(key) {
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray})
    }

    testPost() {
        console.log("this-is-addNote-function");

        fetch('http://192.168.15.16:8808/post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'xiaoming',
                firstname: 'xiao',
                lastname: 'mingming',
                city: 'vencouver',
                age: 22,
            })
        }).then((response) => console.log(response.toString())).catch((error) => {
            console.error(error);
        });
    }

    testGet() {
        console.log("this-is-get-function");

        fetch('http://192.168.15.16:8808/get')
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                for (let i=0; i<res.length; i++){
                    console.log('-//////////-');
                    console.log(res[i].time, res[i].info);
                }
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26,
    },
    scollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#915c8b',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },

    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#E91E63',
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
});
