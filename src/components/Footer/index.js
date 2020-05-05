import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import Progress from './Progress';
/* eslint react/prop-types: 0 */
class Footer extends React.Component {
  getNextLesson() {
    // gets the next lesson and sends it back
    const { lessons, content } = this.props;
    // total lessons available
    const lCount = lessons.length;
    if (lCount > content.id) {
      const nextLesson = lessons.filter(lessons => lessons.id === content.id + 1);
      return nextLesson[0];
    }
    return undefined;
  }

  getPrevLesson() {
    const { lessons, content } = this.props;
    // gets the previous lesson
    const prevLesson = lessons.filter(lessons => lessons.id === content.id - 1);
    return prevLesson[0];
  }

  getNextQuestion() {
    const { content, questions } = this.props;
    // filters out and finds the questions that belong to current lesson.
    const lQuestions = questions.filter(questions => questions.lesson_id === content.id);
    // how many questions belong to this current lesson
    const qCount = lQuestions.length;
    // the count of completed questions that belong to this current lesson
    const cQuestions = lQuestions.filter(questions => questions.completed).length;
    // if the question count is less than the completed questions
    if (qCount > cQuestions) {
      // eslint-disable-next-line react/prop-types
      // check if the current content is a question
      // checks to see if the current question has been completed before allowing user to continue
      // eslint-disable-next-line no-mixed-operators
      if (content.completed && content.lesson_id !== undefined || content.lesson_id === undefined) {
        const nextQuestion = questions.filter(questions => questions.lesson_id === content.id).find((q) => !q.completed);
        return nextQuestion;
      }
    }
    return undefined;
  }

  sendContent(next) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.currentContent(next);
  }

  checkContent() {
    const { content } = this.props;
    // eslint-disable-next-line no-unused-vars
    let checkType;
    // checks to see if content exists'
    // eslint-disable-next-line no-console
    if (content.id !== undefined) {
      // content does exist, checks to see if the content is a lesson
      // content is a lesson, now checks if theres any questions that belong to it
      if (this.getNextQuestion() !== undefined) {
        this.sendContent(this.getNextQuestion());
        // if the next question returns undefined
      } else if (this.getNextQuestion() === undefined) {
        console.log('You completed this lesson, continue');
      } else if (this.getNextQuestion() === undefined && this.getNextLesson() === undefined) {
        console.log('Completed course homie!');
      }
    }
  }

  render() {
    const { lessons, modules } = this.props;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <>
        <Row>
          <Col sm={6}>
            {/* progress meter on the left */}
            <Progress modules={modules} lessons={lessons} />
          </Col>
          {/* continue button on the right */}
          <Col sm={6} className="footer-button" style={{ textAlign: 'right' }}>
            <Button onClick={() => this.checkContent()}>Continue</Button>
          </Col>
        </Row>
      </>
    );
  }
}
export default Footer;