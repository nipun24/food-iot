import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Image } from 'react-native';
import {BACKEND_URL} from './Constants.js';

const styles = StyleSheet.create({
    fab1: { 
        position: 'absolute', 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 0, 
        bottom: 64,
        elevation: 8,
        backgroundColor: '#8bc34a',
        borderRadius: 32
        },
    fab2: { 
        position: 'absolute', 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 0, 
        bottom: 0,
        elevation: 8,
        backgroundColor: '#f44336',
        borderRadius: 32
        }
})

export default class Home extends Component {
    state = {
        itemList: null,
        isLoading: true
    }

    static navigationOptions = {
        headerTitle: 'Home',
    };

    getItems = () => {
        fetch(BACKEND_URL+'/list')
        .then(response => response.json())
        .then(json => {
            if(json === false)
                this.setState({isLoading: true});
            else
                this.setState({itemList: json, isLoading: false});
        })
    }

    componentDidMount() {
        this.getItems();
    }

    componentDidUpdate() {
        this.getItems();       
    }

    render(){
        this.getItems;
        const { itemList } = this.state;
        if( this.state.isLoading === true){
            return(
                <View style = {{flex: 1, margin: 24, alignItems: 'center', justifyContent: 'center' }} >
                    <Text>No Items Found</Text>
                    <TouchableOpacity style={styles.fab1} onPress={() => this.props.navigation.navigate('Scanner')}>
                        <Image  
                            source={require('./assets/add.png')} 
                            style={{margin:7}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fab2} onPress={() => this.props.navigation.navigate('ScannerDelete')}>
                        <Image  
                            source={require('./assets/delete.png')} 
                            style={{margin:7}}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return(
                <View style = {{flex:1, margin: 24, flexDirection:'column'}}>
                    <FlatList 
                    data={itemList}
                    renderItem={({item}) => 
                        <Text 
                            style = {{
                                fontSize: 18,  
                                marginBottom: 20,
                                paddingBottom: 20,
                                borderBottomColor: 'black',
                                borderBottomWidth: 0.5
                                }} 
                            onPress={() => this.props.navigation.navigate('ItemComponent',{item})}
                        >
                            {item.name}
                        </Text>
                        }
                    keyExtractor={(item,index) => index.toString()}
                    />
                    <TouchableOpacity style={styles.fab1} onPress={() => this.props.navigation.navigate('Scanner')}>
                        <Image  
                            source={require('./assets/add.png')} 
                            style={{margin:7}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fab2} onPress={() => this.props.navigation.navigate('ScannerDelete')}>
                        <Image  
                            source={require('./assets/delete.png')} 
                            style={{margin:7}}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
    }
}