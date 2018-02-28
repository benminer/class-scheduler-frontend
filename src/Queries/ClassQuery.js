import gql from 'graphql-tag';

export default gql`
  query ClassesBySubjectQuery($subjectId: String!) {
   ClassesBySection(subjectId: $subjectId) {
    title
    crn
    begin
    end
    section
   }
  }
`;