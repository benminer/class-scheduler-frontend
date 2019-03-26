import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { prop, path, map } from 'ramda';
import { View, Text, ActivityIndicator } from 'react-native';
import CourseQuery from './Queries/CourseQuery';
import ScheduleMutation from './Queries/ScheduleMutation';
import { Divider, Search, Grid, Button, Card, Header, Icon } from 'semantic-ui-react';
import './App.css';
import HeaderText from './Components/HeaderText';
import RemoveButton from './Components/RemoveButton';
import StyledHeader from './Components/StyledHeader';
import { 
  CreditText,
  DisclaimerText 
} from './Components';
import formatDate from './utils/formatDate';
import formatTimes from './utils/formatTimes';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCourses: [],
      schedules: [],
      noScheduleFound: false, 
      schedulesLoading: false,
      results: [],
      value: '', 
      isLoading: false
    }
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], class: '' });

  // Appends the selected classes array
  handleResultSelect = (_e, { result }) => {
    const { selectedCourses } = this.state;
    selectedCourses.push(result);
    this.setState({ selectedCourses }) 
  }

  handleSearchChange = (_e, { value }) => {
    this.setState({ isLoading: true, value })
    const { courses } = this.props.data;
      setTimeout(() => {
        const { value } = this.state
        if (value.length < 1) return this.resetComponent()
        if (courses) {
          this.setState({
            isLoading: false,
            results: value && courses.filter(course => {
              const slicedSection = course.section.slice(0, 4);
              const subjectSection = course.subjectId + slicedSection;
              const cleanedVal = value.replace(/\s/g, '').toLowerCase();
              return (
                course.title.toLowerCase().includes(
                  cleanedVal
                ) ||
                subjectSection.toLowerCase().includes(
                  cleanedVal
                )
            )})
          }) 
        }
        }, 500)
    
  }

  renderSchedule () {
    const { schedules, schedulesLoading, noScheduleFound } = this.state;
    if (schedulesLoading) {
      return (
        <View style={{ alignContent: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color='#142753' size='large' animating={true} />
        </View>
      )
    } else if (!schedulesLoading && noScheduleFound) {
      return (
        <View style={{ alignContent: 'center', justifyContent: 'center' }}>
          <Header as='h4'> Could not generate non-conflicting schedule! </Header>
        </View>
      )
    } else {
      return (
        <Card.Group style={{ justifyContent: 'center', flexDirection: 'column', marginBottom: 50 }}>
          {schedules.map((schedule, i) => (
            <View key={`${schedule.__typename - Date.now() - i}`}>
              <Header style={{ paddingVertical: i === 0 ? 30 : 30 }} as='h4'>{`Schedule ${i + 1}`}</Header>
              {schedule.courses.map(course => (
                <Card key={course.crn} style={{ padding: 20, marginBottom: schedule.courses.length === i ? 20 : 0 }}>
                  <Card.Header content={course.title} />
                  <Card.Meta> {course.subjectId + ' ' + course.section} </Card.Meta>
                  <Card.Meta> {course.instructor} </Card.Meta>
                  <Card.Meta> CRN: {course.crn} </Card.Meta>
                  {course.roomDayAndTime.map(time => (
                    <Card.Description key={time.day}> {formatDate(time.day)} from {formatTimes(time.begin)} to {formatTimes(time.end)} </Card.Description>
                  )
                  )}
                </Card>
              ))}
            </View>
          ))}
        </Card.Group>
      ) 
    }
  };

  removeCourse = (index) => {
    const { selectedCourses } = this.state;
    selectedCourses.splice(index, 1);
    this.setState({ selectedCourses });
  };
  

  createSchedule = () => {
    const { selectedCourses } = this.state;

    if (selectedCourses.length <= 1) {
      alert('You need to select more than 1 course!');
      return;
    }
    this.setState({ schedulesLoading: true, noScheduleFound: false });
    this.props.mutate({
      variables: {
        courses: {
          "courseTitles": map(prop('title'), selectedCourses)
        }
      }
    })
      .then(result => {
          const schedules = path(['data', 'makeSchedule', 'schedules'], result);
          console.log(result.data, 'schedule resp');
          this.setState({
            schedules,
            schedulesLoading: false,
            noScheduleFound: schedules.length ? false : true
          })
        }
      )
      .catch(error => {
        this.setState({
          schedulesLoading: false
        });
        console.log(error)
      });
  }

  render () {
    const { isLoading, results, value, selectedCourses } = this.state;
    // We index here since the actual GraphQL objects are immutable,
    // and we need an index for the Drag and Drop to work properly.
    var index = -1;
    const indexedCourses = selectedCourses.map(course => {
      const slicedSection = course.section.slice(0, 4);
      const subjectSection = course.subjectId + ' ' + slicedSection;
      return ({
        title: course.title,
        section: subjectSection,
        index: index += 1
      });
    });

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
          <View style={{ height: 20 }} />
          <DisclaimerText style={{ fontSize: 20 }}>
            This program is not made by nor endorsed by Belmont University. 
          </DisclaimerText>
          <DisclaimerText style={{ fontSize: 16 }}>
            It is for illustrative purposes only and assumes no responsibility for incorrect information displayed. (Although it should be correct!) ;)
          </DisclaimerText>
          <CreditText style={{ marginTop: 20, fontSize: 15 }}>
            {`Made with ❤️ by the Belmont University Developers Society`}
          </CreditText>
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
                           justifyContent: 'center' }}>
                <Card.Group style={{justifyContent: 'center', flexDirection: 'column'}}>
                  { indexedCourses.map(course => (
                    <View key={course.index} style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 30 }}>
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
              <Button animated content='Primary' onClick={this.createSchedule}>
                    <Button.Content hidden>Generate Schedule</Button.Content>
                    <Button.Content visible>
                      <Icon name='send' />
                    </Button.Content>
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

export default compose(
  graphql(ScheduleMutation), 
  graphql(CourseQuery)
  )(App);
