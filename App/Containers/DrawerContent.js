// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid } from 'react-native'
import styles from './Styles/DrawerContentStyle'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressFeed = () => {
    this.toggleDrawer()
    NavigationActions.feed()
  }

  handlePressLogin= () => {
    this.toggleDrawer()
    NavigationActions.login()
  }

  handlePressCurrency= () => {
    this.toggleDrawer()
    NavigationActions.currency()
  }

  handlePressProfile= () => {
    this.toggleDrawer()
    NavigationActions.profile()
  }

  handlePressNewService= () => {
    this.toggleDrawer()
    NavigationActions.editService()
  }


  walletButtonText () {
    return 'Semillas (' + String(this.props.user.wallet.balance) + ')'
  }

  render () {
    if (this.props.user) {
      return (
        <ScrollView style={styles.container}>
          <Image source={Images.logo} style={styles.logo} />
          <DrawerButton
            text={this.props.user.name ? this.props.user.name : this.props.user.username}
            onPress={this.handlePressProfile}
            icon='user'
          />
          <DrawerButton text='Añadir Servicio' icon='plus-circle' onPress={this.handlePressNewService} />
          <DrawerButton text='Servicios' icon='envira' onPress={this.handlePressFeed} />
          <DrawerButton text={this.walletButtonText()} icon='money' onPress={this.handlePressCurrency} />
          <DrawerButton text='Logout' icon='sign-out' onPress={this.props.logout} />
        </ScrollView>
      )
    } else {
      return (
        <ScrollView style={styles.container}>
          <Image source={Images.logo} style={styles.logo} />
          <DrawerButton text='Servicios' icon='envira' onPress={this.handlePressFeed} />
          <DrawerButton text='Login' icon='sign-in' onPress={this.handlePressLogin} />
          <DrawerButton text='Registro' icon='hand-o-right' onPress={this.handlePressLogin} />
          {/*
            <DrawerButton text='Component Examples' onPress={this.handlePressComponents} />
            <DrawerButton text='Usage Examples' onPress={this.handlePressUsage} />
            <DrawerButton text='API Testing' onPress={this.handlePressAPI} />
            <DrawerButton text='Themes' onPress={this.handlePressTheme} />
            <DrawerButton text='Device Info' onPress={this.handlePressDevice} />
          */}
        </ScrollView>
      )
    }
  }
}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object,
  user: React.PropTypes.object,
  logout: React.PropTypes.func
}

export default DrawerContent
