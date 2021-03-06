import gql from 'graphql-tag';

export default gql`
mutation MakeSchedule($courses: CourseListInput!) {
  makeSchedule (courseInput: $courses) {
    schedule {
      title
      crn
      section
      instructor
      subjectId
      roomDayAndTime {
        day
        begin
        end
      }
    }
  }
}
`
