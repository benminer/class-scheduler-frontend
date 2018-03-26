import gql from 'graphql-tag';

export default gql`

query CourseQuery {
  courses(uniqueTitle: true) {
    title
    crn
    section
    subjectId
   }
  }
`;