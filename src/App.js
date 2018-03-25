import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { View, Text, TouchableOpacity } from 'react-native';
import CourseQuery from './Queries/CourseQuery';
import ScheduleMutation from './Queries/ScheduleMutation';
import { Divider, Search, Grid, Button, Card } from 'semantic-ui-react';
import './App.css';
import HeaderText from './Components/HeaderText';
import StyledHeader from './Components/StyledHeader';

const BelmontBlue = '#142753';

const RemoveButton = props => (
    <View style={{ backgroundColor: BelmontBlue, borderRadius: 30, flex: 1, alignContent: 'center', alignSelf: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => props.onPress(props.index)} style={{ alignContent: 'center', alignSelf: 'center', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', padding: 15, color: 'white' }}>
          Remove 
        </Text>
      </TouchableOpacity> 
    </View> 
)

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
    this.onDragEnd = this.onDragEnd.bind(this);
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

  onDragEnd (result) {
    const { selectedCourses } = this.state;
    // If the user presses cancel mid-drag, we get a 'CANCEL' as the reason.
    if (result.reason === 'CANCEL') {
      return;
    // If the item was dragged off the list, we assume the 
    // user wants to remove it.
    } else if (!result.destination) {
      var removedCourse = selectedCourses.splice(result.source.index, 1);
      this.setState({ selectedCourses })
    // If the user cancelled mid-drag, do nothing.
    } else {
      // Get the dragged item's index and then its destination index
      // and replace it at that locatio n
      var reorderedCourses = this.reorder(selectedCourses, result.source.index, result.destination.index)
      this.setState({ selectedCourses: reorderedCourses })
    }
  }

  reorder = (courses, source, destination) => {
    // Replace source course at destination it was dragged to
    var itemToMove = courses.splice(source, 1);
    courses.splice(destination, 0, itemToMove[0]) ;
    // Return the new reordered array
    return courses
  }

renderSchedule () {
  return (
    <Card.Group style={{justifyContent: 'center'}}>
      {this.state.schedule.map((course) => (
        <Card style={{padding: 20}}>
          <Card.Header content={course.title} />
          <Card.Meta> {course.subjectId + ' ' + course.section} </Card.Meta>
          <Card.Meta> {course.instructor} </Card.Meta>
          <Card.Meta> CRN: {course.crn} </Card.Meta>
          { course.roomDayAndTime.map((time) => {
            console.log('day and time map', time);
            return (
            <Card.Description> {this.formatDate(time.day)} from {this.formatTimes(time.begin)} to {this.formatTimes(time.end)} </Card.Description>
            )
          })
          }
        </Card>
      )) }
    </Card.Group>
    ) 
  }

  // course.roomDayAndTime.map((time) => {
  //   return <Text>{time.day}, {time.begin}, {time.end}</Text>

  formatDate = (thisDay) => {
    switch(thisDay) {
      case ('M'):
        return 'Monday'
        break;
      case ('T'):
        return 'Tuesday'
        break;
      case ('W'):
        return 'Wednesday'
        break;
      case('R'):
        return 'Thursday'
        break;
      case ('F'):
        return 'Friday'
        break;
      case ('S'):
        return 'Saturday'
        break;
    }
  }

  formatTimes = (thisTime) => {
    var time = thisTime.slice(0,5);
    var hour = time.slice(0,2);
    var minutes = time.slice(3,5);
    console.log(time, hour, minutes);
    var dd = "AM";
  
    if (hour > 12) {
      console.log('if has been hit')
      hour = hour - 12;
      dd = "PM";
    } else if (hour == 12) {
      dd = "PM"
    }
    
    return hour + ':' + minutes + ' ' + dd

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
                        size={window.innerWidth <= 400 ? 'small' : 'massive'}
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
                    <View style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 30}}>
                      <Card style={{padding: 20}}>
                        <Card.Header content={course.title}/>
                        <Card.Meta> {course.section} </Card.Meta>
                      </Card>
                      <RemoveButton title={course.title} onPress={this.removeCourse} index={course.index}/>
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
