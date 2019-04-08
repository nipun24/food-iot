import React,{Component} from 'react';
import {View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    field1: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    field2: {
        fontSize: 18
    }
})

export default class ItemComponent extends Component {
    state = {
        item: {}
    }

    static navigationOptions = {
        title: 'Item',
    };

    componentDidMount(){
        const item = this.props.navigation.getParam('item');
        this.setState({item});
    }

    render(){
        const {item} = this.state
        return(
            <View>
                <View style={{padding: 24, alignItems: 'center'}}>
                    <Text style={{fontSize:30, fontWeight: 'bold', borderBottomColor:'#000000', borderBottomWidth: 1, paddingBottom: 4}}>
                        {item.name}
                    </Text>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'center'}}>
                    <Text style={styles.field1}>UID: </Text>
                    <Text style={styles.field2}>
                        {item.uid}
                    </Text>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'center'}}>
                    <Text style={styles.field1}>Manufacturing Date: </Text>
                    <Text style={styles.field2}>
                        {item.mfd}
                    </Text>
                </View>     
                <View style={{flexDirection:'row', justifyContent: 'center'}}>
                    <Text style={styles.field1}>Best Before: </Text>
                    <Text style={styles.field2}>
                        {item.bestBefore}
                    </Text>
                </View>           
            </View>
        );
    }
}