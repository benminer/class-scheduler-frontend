import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { View, Text } from 'react-native';
import CourseQuery from './Queries/CourseQuery';
import { Divider, Search, Grid } from 'semantic-ui-react';
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
      results: [],
      value: '',
      isLoading: false
    }
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], class: '' });

  // Appends the selected classses array
  // TODO: Make this work, currently having trouble indexing these courses.
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
              const subjectSection = course.subjectId + ' ' + slicedSection;
              return (
              course.title.toLowerCase().includes(
                this.state.value.toLowerCase()
              )
               ||
              subjectSection.includes(
                this.state.value
              )
            )})
            : null
          }) 
        }
        }, 500)
    
  }

  onDragEnd (result) {
    console.log(result)
    const { selectedCourses } = this.state;
    // If the item was dragged off the list, we assume the 
    // user wants to remove it. 
    if (!result.destination) {
      var removedCourse = selectedCourses.splice(result.source.index, 1);
      this.setState({ selectedCourses })
    // If the user cancelled mid-drag, do nothing.
    } else if (result.reason === 'CANCEL') {
      return;
    // This is the condition where the user meant to reorder.
    } else {
      // Get the dragged item's index and then its destination index
      // and replace it at that location
      console
      var reorderedCourses = this.reorder(selectedCourses, result.source.index, result.destination.index)
      this.setState({ selectedCourses: reorderedCourses })
    }
  }

  reorder = (courses, source, destination) => {
    // Replace source course at destination it was dragged to
    console.log('reorder')
    var itemToMove = courses.splice(source, 1);
    courses.splice(destination, 0, itemToMove[0]) ;
    console.log(courses)
    // Return the new reordered array
    return courses
  }

  render() {
    const { isLoading, results, value, selectedCourses } = this.state;
    // We index here since the actual GraphQL objects are immutable,
    // and we need an index for the Drag and Drop to work properly.
    var index = -1;
    const indexedCourses = selectedCourses.map(course => (
      {
      title: course.title,
      section: course.section,
      index: index+=1
      }
    ))

    return (
      <div className="App">
        <StyledHeader>
          <HeaderText>
            Bruin Scheduler
          </HeaderText>
        </StyledHeader>
        <View style={{ flex: 1, marginTop: 20}}>
          <Text style={{ fontFamily: 'Montserrat', fontSize: 20, textAlign: 'center', flex: 1, top: 50}}>
              Search for class, add it to your selection, then prioritize by dragging courses.
          </Text>
          <Text style={{ fontFamily: 'Montserrat', fontSize: 18, textAlign: 'center', flex: 1, top: 50}}>
              Once submitted, a schedule will be generated based on your course priority.
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
          <View style={{ alignSelf: 'flex-end', alignItems: 'flex-end', justifyContent: 'center'}}>
            <View style={{ alignItems: 'center', alignSelf: 'center',
                            justifyContent: 'center'}}>
              <DragDropContext
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
                          <View style={{ margin: 10,
                                          backgroundColor: BelmontBlue, 
                                          borderRadius: 40,
                                          shadowColor: 'black',
                                          shadowOffset: { width: 0, height: 10},
                                          shadowOpacity: 0.2,
                                          shadowRadius: 10 }}>
                            <Text style={{ fontSize: 18, alignSelf: 'center', fontFamily: 'Montserrat', color: 'white', textAlign: 'center', padding: 20}}>
                              {course.title}
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
                </DragDropContext>
              </View>
            </View>
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default graphql(CourseQuery)(App);
