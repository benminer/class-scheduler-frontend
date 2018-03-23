import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { View, Text } from 'react-native';
import CourseQuery from './Queries/CourseQuery';
import ScheduleMutation from './Queries/ScheduleMutation';
import { Divider, Search, Grid, Button, Card } from 'semantic-ui-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';
import HeaderText from './Components/HeaderText';
import StyledHeader from './Components/StyledHeader';

const BelmontBlue = '#142753';

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
        if (courses.length > 0) {
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
                  this.state.value.toLowerCase()
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
          {/* <View style={{ alignSelf: 'flex-end', alignItems: 'flex-end', justifyContent: 'center'}}> */}
            <View style={{ alignItems: 'center', alignSelf: 'center',
                            justifyContent: 'center'}}>
              {/* <DragDropContext
                onDragEnd={this.onDragEnd}
              >
                <Droppable direction='vertical' droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef  }
                      style={{background: 'transparent', padding: 10, width: 250, borderColor: '#142753'}}
                      {...provided.droppableProps}
                    >
                    {indexedCourses.map((course) =>
                    (
                      console.log(index),
                      <Draggable key={course.section} draggableId={course.section} index={course.index} type='Course'>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'white'}}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          
                        >
                          <View style={{  margin: 10,
                                          backgroundColor: BelmontBlue, 
                                          borderRadius: 40,
                                          shadowColor: 'black',
                                          shadowOffset: { width: 0, height: 10},
                                          shadowOpacity: 0.2,
                                          shadowRadius: 10 }}>
                            <Text style={{ fontSize: 18, alignSelf: 'center', fontFamily: 'Montserrat', color: 'white', textAlign: 'center', paddingTop: 20, paddingHorizontal: 15}}>
                              {course.title}
                            </Text>
                            <Text style={{ fontSize: 15, alignSelf: 'center', fontFamily: 'Montserrat', color: 'white', textAlign: 'center', paddingBottom: 10 }}>
                              {course.section}
                            </Text>
                          </View>
                        </div>
                      )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    </div>
                    )}
                  </Droppable>
                </DragDropContext> */}
                <Card.Group style={{justifyContent: 'center'}}>
                  { indexedCourses.map((course) => (
                    <Card style={{padding: 20}}>
                      <Card.Header content={course.title}/>
                      <Card.Meta> {course.section} </Card.Meta>
                    </Card>
                  )) }
                </Card.Group>
              </View>
            {/* </View> */}
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
