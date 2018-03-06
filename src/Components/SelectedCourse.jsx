import styled from 'styled-components/native';
import * as React from 'react';

const Container = styled.View`
    flex-direction: row;
    width: 100%;
    height: 80;
`;

const TitleText = styled.Text`
    font-size: 30;
    color: #000000;
    align-self: flex-start
`;

const ProfessorText = styled.Text`
    font-size: 18;
    color: #000000;
    align-self: flex-end;
`;

const SelectedCourse = props => {
    const { course } = props;
    console.log('Course Item Render')
    console.log(course)

    return (
        <Container>
            <TitleText> {course.title} </TitleText>
        </Container>
    )
}

export default SelectedCourse;