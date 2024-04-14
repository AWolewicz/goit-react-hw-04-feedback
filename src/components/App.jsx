import { useState } from "react"
import { Section } from './Section/Section.jsx'
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions.jsx';
import { Statistics } from './Statistics/Statistics.jsx';
import { Notification } from './Notification/Notification.jsx'


export function App() {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const handleFeedback = (type) => {
    setState(prevState => ({
      ...prevState,
      [type]: prevState[type] + 1
    }));
  };

  const countTotalFeedback = () => {
    return state.good + state.neutral + state.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total === 0 ? 0 : Math.round((state.good / total) * 100);
  };

  const hasFeedback = countTotalFeedback() > 0;

  return (
    <div>
      <Section title="Please leave feedback" />
      <FeedbackOptions options={['good', 'neutral', 'bad']} onLeaveFeedback={handleFeedback} />
      <Section title="Statistics" />
        {hasFeedback ? (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
    </div>
  );
}
