import { Fragment, useState } from "react";

// const wordData = {
//   word: "漢字",
//   composition: [
//     {
//       type: "kanji",
//       word: "漢字",
//       hurikana: "かんじ",
//     },
//   ],
//   meaning: "한자",
//   level: 5,
// };

const sentenceData = {
  topic: "漢字",
  sentence: [
    {
      type: "kanji",
      word: "漢字",
      hurikana: "かんじ",
    },
    {
      type: "hiragana",
      word: "があります。",
    },
  ],
  select: "かんじ,かんざ,くじ,くし",
  answer: "かんじ",
};

const Quiz = () => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        <h4>Quiz</h4>
        <div>
          {sentenceData.sentence.map((phrase, index) => {
            if (phrase.type === "kanji") {
              return (
                <Fragment key={index}>
                  <ruby>
                    {phrase.word === sentenceData.topic ? (
                      <u>{phrase.word}</u>
                    ) : (
                      phrase.word
                    )}
                    <rp>(</rp>
                    <rt>{phrase.hurikana}</rt>
                    <rp>)</rp>
                  </ruby>
                </Fragment>
              );
            } else {
              return (
                <Fragment key={index}>
                  <ruby>{phrase.word}</ruby>
                </Fragment>
              );
            }
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        <h4>Select</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          {sentenceData.select.split(",").map((phrase, index) => {
            return (
              <div key={index}>
                <input
                  onChange={() => setSelectedValue(phrase)}
                  type="radio"
                  name="answer"
                  value={phrase}
                />
                <ruby>{phrase}</ruby>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => {
          const answer = sentenceData.answer;
          if (answer === selectedValue) {
            alert("정답입니다!");
          } else {
            alert("오답입니다!");
          }
        }}
      >
        정답입력
      </button>
    </div>
  );
};

export default Quiz;
