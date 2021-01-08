import React, { Component } from 'react';
import Section from '../Section/Section';
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Statistics from '../Statistics/Statistics';
import s from '../Feedback/Feedback.module.css';
import Notification from '../Notification/Notification';

class Feedback extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = item => {
    this.setState(prevState => ({
      [item]: prevState[item] + 1,
    }));
  };

  countTotalFeedback() {
    // return Object.values(this.state).reduce((acc, item) => acc + item, 0);
    const { good, neutral, bad } = this.state;

    const total = good + neutral + bad;
    return total;
  }

  countPositiveFeedbackPercentage() {
    return Math.round((this.state.good * 100) / this.countTotalFeedback());
  }

  render() {

    // const { good, neutral, bad } = this.state;
    const options = ['good', 'neutral','bad'];

    return (
      <div className={s.feedback}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics" className={s.statistics}>
          {this.countTotalFeedback() === 0 ? (
            <Notification message="No one reported yet"></Notification>
          ) : (
            <Statistics
              goodStats={this.state.good}
              neutralStats={this.state.neutral}
              badStats={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </div>
    );
  }
}

export default Feedback;