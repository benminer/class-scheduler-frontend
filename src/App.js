import React, { Component } from 'react';
import Images  from './Themes/Images.js';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import Select from 'react-select';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Container, Header, Image, Divider, Search } from 'semantic-ui-react'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    // const query = gql`
    //   {
    //     allCourses {
    //       edges {
    //         node {
    //           crn
    //           subjectId
    //           title
    //           begin
    //           end
    //         }
    //       }
    //     }
    //   }`;

    this.state = {
      selectedClasses: [],
      count: 0,
      searchText: '',
    }
  }

  countPlusOne = () => {
    var count = this.state.count;
    count++;
    this.setState({count});
  };

  handleKeyPress = (event) => {
    var textField = this.state.searchText;
    textField += event.key;
    
    this.setState({searchText: textField});
  };

  componentWillMount () {
    // client.query({
    //   query: gql`
    //     query ClassQuery {
    //       course(subject: "AET") {
    //         crn
    //         title
    //       }
    //     }
    //   `
    // }).then(response => console.log(response.data.allCourses))
  }

  //   renderClasses({ data: { courses, refetch } }) {
  //   return (
  //     <div className="formButton">
  //       <Button className="button" size="lg" outline color="primary" onClick={() => refetch()}>
  //         Refresh
  //       </Button>
  //       <ul>
  //         {courses.map(course => (
  //           <li key={course.crn}>
  //             {course.title}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div className="App">
        <div className="AppContent">
          <div class="row">
            <div class="left"><Image src={Images.belmont} as='img' className="App-logo"/></div>
            <div class="column"><Header as='h1' className="App-header">Class Scheduler </Header></div>
            <div class="right"><Image src={Images.belmont} as='img' className="App-logo-l"/></div>
          </div>
        </div>
        <div className="Content">
          <Divider as='hr' className="Divider" horizontal/>
          <p className="App-text">"This is a load of bullshit ~ Oluwatito Ebiwonjumi"</p>
          <Header as='h4' className="SearchText"> Search for a class... </Header>
          <div className="SearchContainer">
            <Search className="Search" class="ui action left icon input" onKeyPress={this.handleKeyPress}/>
          </div>
          <div class="row">
            <div class="column"><button class="ui primary pink button" onClick={this.countPlusOne}>Save Schedule</button></div>
            <div class="column">{this.state.count}</div>
            <div class="column">{this.state.searchText}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
