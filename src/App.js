import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { View, Text } from 'react-native';
import CourseQuery from './Queries/CourseQuery';
import ScheduleMutation from './Queries/ScheduleMutation';
import { Divider, Search, Grid, Button, Card } from 'semantic-ui-react';
import './App.css';
import HeaderText from './Components/HeaderText';
import RemoveButton from './Components/RemoveButton';
import StyledHeader from './Components/StyledHeader';
import formatDate from './utils/formatDate';
import formatTimes from './utils/formatTimes';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCourses: [],
      schedule: [],
      results: [],
      value: '', 
      isLoading: false
    }
    this.createSchedule = this.createSchedule.bind(this);
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], class: '' });

  // Appends the selected classses array
  handleResultSelect = (e, { result }) => {
    var { selectedCourses } = this.state;
    selectedCourses.push(result);
    this.setState({ selectedCourses }) 
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    const { courses } = this.props.data;
    console.log(courses);
      setTimeout(() => {
        if (this.state.value.length < 1) return this.resetComponent()
        if (courses) {
          this.setState({
            isLoading: false,
            // Only filter if we have input TO filter
            results: this.state.value !== null ? courses.filter(course => {
              var slicedSection = course.section.slice(0, 4);
              const subjectSection = course.subjectId + slicedSection;
              var split = this.state.value.split(' ').join('');
              console.log(split);
              return (
                course.title.toLowerCase().includes(
                  split.toLowerCase()
                ) ||
                subjectSection.toLowerCase().includes(
                  split.toLowerCase()
                )
            )})
            : null
          }) 
        }
        }, 500)
    
  }

  renderSchedule () {
    return (
      <Card.Group style={{justifyContent: 'center'}}>
        {this.state.schedule.map((course) => (
          <Card key={course.section} style={{padding: 20}}>
            <Card.Header content={course.title} />
            <Card.Meta> {course.subjectId + ' ' + course.section} </Card.Meta>
            <Card.Meta> {course.instructor} </Card.Meta>
            <Card.Meta> CRN: {course.crn} </Card.Meta>
            { course.roomDayAndTime.map((time) => (
              <Card.Description key={time.day}> {formatDate(time.day)} from {formatTimes(time.begin)} to {formatTimes(time.end)} </Card.Description>
              )
            )}
          </Card>
        ))}
      </Card.Group>
      ) 
  }

  removeCourse = (index) => {
    var { selectedCourses } = this.state;
    selectedCourses.splice(index, 1);
    this.setState({ selectedCourses });
  };
  

  createSchedule() {
    const course_titles = this.state.selectedCourses.map((course) =>
      course.title
    );
    this.props.mutate({
      variables: {
        courses: {
          "courseTitles": course_titles
        }
      }
    })
      .then((result) => {
          const schedule = result.data.makeSchedule.schedule;
          this.setState({
            schedule
          })
        }
      )
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const { isLoading, results, value, selectedCourses } = this.state;
    // We index here since the actual GraphQL objects are immutable,
    // and we need an index for the Drag and Drop to work properly.
    var index = -1;
    const indexedCourses = selectedCourses.map(course => {
      var slicedSection = course.section.slice(0, 4);
      const subjectSection = course.subjectId + ' ' + slicedSection;
      return (
        {
        title: course.title,
        section: subjectSection,
        index: index+=1
        }
      )
    })

    return (
      <div className="App">
        <StyledHeader>
          <HeaderText>
            Bruin Scheduler
          </HeaderText>
        </StyledHeader>
        <View style={{ flex: 1, marginTop: 20}}>
          <Text style={{ fontFamily: 'Montserrat', fontSize: 20, textAlign: 'center', flex: 1, top: 50}}>
              Search for class, add it to your selection.
          </Text>
          <Text style={{ fontFamily: 'Montserrat', fontSize: 18, textAlign: 'center', flex: 1, top: 50}}>
              Once submitted, a schedule will be generated.
          </Text>
        </View>
        <Divider section/> 
        <Grid columns={3} divided padded={'vertically'} centered>
          <Grid.Column>
            <View style={{ paddingLeft: 50, alignItems: 'center'}}>
              <Search className="ui action left icon input" 
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.handleSearchChange}
                        results={results}
                        value={value}
                        size={'massive'}
                        fluid={true}
                        {...this.props}
                />
              </View>
        </Grid.Column>
        <Grid.Column>
            <View style={{ alignItems: 'center', alignSelf: 'center',
                            justifyContent: 'center'}}>
                <Card.Group style={{justifyContent: 'center'}}>
                  { indexedCourses.map((course) => (
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                      <Card style={{padding: 20}}>
                        <Card.Header content={course.title}/>
                        <Card.Meta> {course.section} </Card.Meta>
                      </Card>
                      <RemoveButton color={'#142753'} title={course.title} onPress={this.removeCourse} index={course.index}/>
                    </View>
                  )) }
                </Card.Group>
              </View>
          </Grid.Column>
          <Grid.Column>
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
              <Button onClick={this.createSchedule}>
                    Create Schedule
              </Button>
              <View style={{ flex: 1, marginTop: 50, alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
              {this.renderSchedule()}
              </View>
            </View> 
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default compose(graphql(ScheduleMutation), graphql(CourseQuery))(App);
