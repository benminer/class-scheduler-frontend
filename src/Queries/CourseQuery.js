import gql from 'graphql-tag';

export default gql`

query CourseQuery {
  courses(uniqueTitle: true) {
    title
    section
    subjectId
   }
  }
`;