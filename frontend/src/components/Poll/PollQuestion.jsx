import { submitPollData } from '../../lib/submitPoll';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const PollQuestion = ({ pollData }) => {
  const [poll, setPoll] = useState({
    question:
      pollData?.data?.title || 'Which current AI Module are you utilizing?',
    answers: ['GPT 4', 'Bard', 'Claude', 'OpenAI'],
    pollcount: 100,
    answerweight: [60, 20, 10, 10], // sum = 100
    selectanswer: -1,
  });

  // eslint-disable-next-line no-unused-vars
  const markAnswer = async (i, answer) => {
    setPoll((prevPoll) => ({
      ...prevPoll,
      selectanswer: i,
    }));

    toast.loading('Sending...');

    try {
      const response = await submitPollData(answer);

      if (!response.message.answerName) {
        toast.dismiss();
        throw new Error('Failed to submit poll answer');
      }
      toast.dismiss();
      toast.success('Thank You For Your Answer');
    } catch (error) {
      toast.dismiss();
      console.error('Error submitting poll answer:', error);
    }
  };

  useEffect(() => {
    showResults();
  });

  const showResults = () => {
    const answers = document.querySelectorAll('.answer');

    for (let i = 0; i < answers.length; i++) {
      const answerElement = answers[i]; // Type assertion with null

      if (answerElement) {
        let percentage = 0;

        if (i === poll.selectanswer) {
          percentage = Math.round(
            ((poll.answerweight[i] + 1) * 100) / (poll.pollcount + 1)
          );
        } else {
          percentage = Math.round(
            (poll.answerweight[i] * 100) / (poll.pollcount + 1)
          );
        }
        const percentageBar = answerElement.querySelector('.percentage_bar');
        const percentageValue =
          answerElement.querySelector('.percentage_value');

        if (percentageBar && percentageValue) {
          percentageBar.style.width = percentage + '%';
          percentageValue.innerText = percentage + '%';
        }
      }
    }
  };

  return (
    <>
      <div className="poll h-[240px] bg-white shadow-lg px-3 pt-4 mx-auto transform rotate-90">
        <div className="question text-xs font-semibold mb-3 block text-[#F4FFFA00] bg-clip-text bg-gradient-to-b from-ebony-400 to-ebony-950">
          {poll.question}
        </div>
        <div className="answers">
          {poll.answers.map((answer, i) => (
            <div
              key={i}
              className={`answer relative text-sm flex items-center w-full h-7 px-2 border border-gray-300 cursor-pointer overflow-hidden rounded-md mb-4 ${
                i === poll.selectanswer ? 'selected border-junglegreen-600' : ''
              }`}
              onClick={() => null}
            >
              {answer}
              <span
                className={`${
                  i === poll.selectanswer ? 'selected bg-junglegreen-600' : ''
                } percentage_bar absolute top-0 left-0 h-full bg-flamingo-400 z-[-2] transition-all duration-200`}
              ></span>
              <span className="percentage_value absolute top-1/2 right-0 transform -translate-y-1/2 w-12 text-sm text-junglegreen-600">
                0%
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PollQuestion;
