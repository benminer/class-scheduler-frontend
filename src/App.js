import React, { Component } from 'react';
import Images from './Themes/Images.js';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import Select from 'react-select';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { client } from './Apollo/apollo'
import { Button, Container, Header, Image, Divider, Search, Dropdown } from 'semantic-ui-react'
import './App.css';
import Subjects from './Subjects.js';
import styled from 'styled-components/native';

const Center = styled.View`
  flex: 1;
  justify-content: center;
  align-self: center;
  align-items: center;
`;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedClasses: [],
      searchText: ''
    }
  }

  componentWillMount () {
  
  }

  handleKeyPress = (event) => {
    var textField = this.state.searchText;
    if (event.key == "8") {
      textField = textField.slice(0, -1);
    } else {
      textField += event.key;
    }

    this.setState({ searchText: textField });
    console.log(this.state.searchText)
  };

  render() {

    console.log(Subjects)
    return (
      <div className="App">
      <div className="AppContent">
        <Image src={Images.belmont} as='img' className="App-logo"/>
        <Header as='h1' className="App-header">Class Scheduler </Header>
      </div>
      <div className="Content">
          <Divider as='hr' className="Divider" horizontal/>
        <Center>
         <Dropdown placeholder='Select a section...' fluid search selection options={Subjects} />
        </Center>
        <Header as='h4' className="SearchText"> Search for a class... </Header>
        <div className="SearchContainer">
            <Search className="Search" className="ui action left icon input" onKeyPress={this.handleKeyPress}/>
          </div>
      </div>
    </div>
    );
  }
}

export default App;
