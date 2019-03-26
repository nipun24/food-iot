import React,{Component} from 'react';
import {View, Text} from 'react-native';

export default class ItemComponent extends Component {
    state = {
        item: {}
    }

    componentDidMount(){
        const item = this.props.navigation.getParam('item');
        this.setState({item});
    }

    static navigationOptions = {
        title: 'Item',
      };

    render(){
        return(
            <View>
                <Text>
                    Component
                </Text>
            </View>
        );
    }
}