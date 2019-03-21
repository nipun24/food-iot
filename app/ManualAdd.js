import React, { Component } from 'react';
import { View, Button, TextInput, Text, Picker, DatePickerAndroid, ToastAndroid } from 'react-native';

export default class ManualAdd extends Component {
    state = {
        isLoading: false,
        barCode: '',
        mfd: '',
        name: '',
        bestBefore: null,
        unit: null,
        exp: null, 
        timeToExp: null

    }

    static navigationOptions = {
        title: 'Add Item',
    };

    componentDidMount() {
        const { navigation } = this.props;
        this.setState({barCode: navigation.getParam('barcode'), name: navigation.getParam('name')});
    }

    mfdPress = () => {
        DatePickerAndroid.open()
        .then(res => {
            const { day, month, year } = res;
            const mfd = new Date(year, month, day+1);
            const timeToExp = day + (month+1)*30 + (year*365);
            this.setState({mfd, timeToExp});
        })
    }
    

    addItem = () => {
        const { unit, bestBefore } = this.state;
        const exp = parseInt(unit) * parseInt(bestBefore);
        // this.setState({isLoading: true});
        fetch('http://10.2.80.123:3000/add', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                barcode: this.state.barCode,
                mfd: this.state.mfd,
                exp: exp,
                timeToExp: this.state.timeToExp
            })
        })
        .then(res => {
            console.log(res.status)
            if(res.status === 200){
                ToastAndroid.show('Item Added Successfully', ToastAndroid.SHORT);
                this.props.navigation.navigate('Home');
            }
        })
    }

    render(){
        return(
            <View style={{margin: 24}} > 
                <TextInput 
                    value = {this.state.barCode}
                    placeholder="Enter Barcode"
                    keyboardType="number-pad"
                    onChangeText={(barCode) => {this.setState({barCode})}}
                />
                <TextInput
                    value = {this.state.name}
                    placeholder="Enter Product Name"
                    keyboardType="default"
                    onChangeText={(name) => {this.setState({name})}}
                />
                <Button 
                    title = 'select mfd'
                    onPress = {this.mfdPress}
                />
                <Text>
                    Select Best Before
                </Text>
                <TextInput 
                    placeholder="Enter Number"
                    keyboardType="number-pad"
                    onChangeText={(bestBefore) => {this.setState({bestBefore})}}
                />
                <Picker
                    selectedValue={this.state.unit}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({unit: itemValue});
                        }
                    }>
                    <Picker.Item label="day" value={1} />
                    <Picker.Item label="month" value={30} />
                    <Picker.Item label="year" value={365} />
                </Picker>
                <Button 
                    title="add"
                    onPress={this.addItem}
                />
            </View>
        );
    }
}