import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const PollQuestion = ({ pollData }) => {
  const [poll, setPoll] = useState({
    question: '',
    answers: [],
    pollcount: 100,
    answerweight: [60, 20, 10, 10],
    selectanswer: -1,
  });

  useEffect(() => {
    if (pollData) {
      setPoll((prev) => ({
        ...prev,
        question: pollData.title || '',
        answers: pollData.items?.map((item) => item.pollinput1) || [],
      }));
    }
  }, [pollData]);

  const markAnswer = async (i, answer, pollName) => {
    setPoll((prevPoll) => ({
      ...prevPoll,
      selectanswer: i,
    }));

    toast.loading('Sending...');

    try {
      const response = await fetch('/api/poll/submit-poll', {
        method: 'POST',
        body: JSON.stringify({
          pollName: pollName,
          answerName: answer,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!result.success) {
        toast.dismiss();
        throw new Error(result.message);
      }

      toast.dismiss();
      toast.success(result.message);
    } catch (error) {
      toast.dismiss();
      toast.success(error.message, {
        icon: 'ℹ️', // Unicode info icon
        style: {
          border: '1px solid #ff9800',
          padding: '16px',
          color: '#ff9800',
        },
        iconTheme: {
          primary: '#ff9800',
          secondary: '#FFFAEE',
        },
      });
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
              onClick={() => markAnswer(i, answer, poll.question)}
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
