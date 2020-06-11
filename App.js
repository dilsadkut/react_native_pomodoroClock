import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {vibrate} from './utils'
import Todo from './todo.js'

class Count extends React.Component {
	shouldComponentUpdate(){
		return !this.props.comp
	}																							
	render() {
		return (
			<Text style={{ fontSize: 75, fontFamily:"TimesNewRoman" }}>{this.props.min}:{this.props.sec}</Text>
		);
	}
}

export default class App extends React.Component {
	constructor(){
		super();
		this.state={
			min : '00',
			resetprev : '00',
			sec : '00',
			isOn : false,
			completed : false,
		}
	}
	componentDidMount(){
			this.interval = setInterval(this.dec, 1000)
	}
	// componentWillUnmount() {
	// 	clearInterval(this.interval)
	// }
	dec = () => {
		// console.log(this.state.isOn & !this.state.completed)
		if(this.state.isOn & !this.state.completed){	
			if(this.state.sec > 0){
				this.setState(prevState => ({ sec : String(parseInt(prevState.sec) - 1) }))
				if(parseInt(this.state.sec) < 10){
					this.setState({ sec : '0' + String(this.state.sec)  })
				}
			}
			else{
				this.setState(prevState => ({ min : String(parseInt(prevState.min) - 1), sec : '59' }))
				if(parseInt(this.state.min) < 10){
					this.setState({ min : '0' + String(this.state.min) })
				}
			}
			if(parseInt(this.state.min) == '00' && parseInt(this.state.sec) == '00' ){
				this.setState({ completed : true })
				this.setState({ isOn : false })
				// clearInterval(this.interval)
				vibrate()
			}
		}
	}
	handleReset = () => {
		this.setState(prevState => ({ min : prevState.resetprev, sec : '00' }))
		this.setState({ completed : false })
		this.setState({ isOn : false })
	}
	handlePlay = () => {
		this.setState({ isOn : true })
		// console.log(this.state.isOn);
	}
	handlePause = () => {
		this.setState({ isOn : false })
	}
	setPomodoro = () => {
		this.setState({ min: '25', sec: '00', resetprev: '25', completed : false, isOn : false })
	}
	setShortbr = () => {
		this.setState({ min: '05', sec: '00', resetprev: '05', completed : false, isOn : false })
	}
	setLongbr = () => {
		this.setState({ min: '15', sec: '00', resetprev: '15', completed : false, isOn : false })
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={{ alignItems: 'center', flex: 3, justifyContent: 'center', backgroundColor: '#fff'}}>
        <Text style={{backgroundColor:"white",fontSize:25, fontFamily:"TimesNewRoman"}}> PomodoroSaati </Text>
					<Count min={this.state.min} sec={this.state.sec} comp={this.state.completed}/>
				</View>
        	<View style={{ backgroundColor:"darkblue",flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center', marginTop:10 }}>
					<Button  title='Pomodoro' onPress={this.setPomodoro} />
					<Button title='Kısa Ara' onPress={this.setShortbr} />
					<Button title='Uzun Ara' onPress={this.setLongbr} />
				</View>
				<View style={{ backgroundColor:"darkblue",justifyContent: 'space-between', flexDirection: 'row', flex: 1, alignItems: 'center', marginTop:10 }}>
        	<Button title='Başla' onPress={this.handlePlay} />
          <Button title='Durdur' onPress={this.handlePause} />
					<Button title='Sıfırla' onPress={this.handleReset} />
				</View>
			
				<View style={{ flex: 5}}>
					<Todo/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
});

