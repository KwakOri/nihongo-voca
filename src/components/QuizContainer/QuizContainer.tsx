import { useEffect, useState } from "react";
import QuizSentence from "../QuizSentence";

import { useLocation, useNavigate } from "react-router";
import { WordData } from "../../components/RubyWord/RubyWord";
import sentences from "../../db/sentences.json";
import words from "../../db/words.json";

interface QuizContainerProps {
  quizWords: WordData[];
}

const QuizContainer = ({ quizWords }: QuizContainerProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [isRoundEnded, setIsRoundEnded] = useState<boolean>(false);
  const [answerCount, setAnswerCount] = useState<number>(0);

  const lastIndex = quizWords.length - 1;
  const targetWord = quizWords[currentIndex];
  const targetId = targetWord.id;

  const targetSentence = sentences.find(
    (sentence) => sentence.word_id === targetId
  );
  const [selectList, setSelectList] = useState<(string | null)[]>([]);

  const onAnswerButtonClink = () => {
    const answer = targetWord?.pronunciation;
    if (answer === selectedValue) setAnswerCount((prev) => prev + 1);
    if (currentIndex === lastIndex) {
      setHasNext(false);
      return;
    }
    setIsRoundEnded(true);
  };
  const onNextRoundButtonClick = () => {
    setCurrentIndex(currentIndex + 1);
    setIsRoundEnded(false);
    setSelectedValue("");
  };
  const onGoBackButtonClick = () => {
    const currentPath = location.pathname;
    const prevPath = currentPath.split("/").slice(0, -1).join("/");
    navigate(prevPath);
  };

  useEffect(() => {
    const getRandomThree = (arr: (string | null)[]) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    };
    const selectList = getRandomThree(
      Array.from(
        new Set(
          words
            .filter((word) => word.part === targetWord?.part)
            .filter((word) => word.id !== targetWord?.id)
            .map((word) => word.furigana)
        )
      )
    );
    selectList.push(targetWord?.furigana || "");
    selectList.sort(() => Math.random() - 0.5);

    setSelectList(selectList);
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <div className="w-full h-10 grid grid-cols-3 gap-2">
        <button
          className={
            "rounded bg-[#2d2d2d] w-full h-full flex justify-center items-center text-white text-xs"
          }
          onClick={onGoBackButtonClick}
        >
          뒤로가기
        </button>
        <p className="rounded bg-[#2d2d2d] w-full h-full flex justify-center items-center text-white text-xs">
          {currentIndex + 1} / {quizWords.length}
        </p>
        <p className="rounded bg-[#2d2d2d] w-full h-full flex justify-center items-center text-white text-xs">
          정답 : {answerCount}개
        </p>
      </div>
      {/* Quiz 문장 */}
      <div
        className={`rounded bg-[#2d2d2d] w-full aspect-square flex flex-col justify-center gap-10 `}
      >
        <QuizSentence
          tokens={targetSentence?.tokens}
          targetWord={targetWord?.kanji || ""}
        />
      </div>

      {/* 선택지 */}

      <div className="w-full grid grid-cols-2 gap-2">
        {selectList.map((select, index) => {
          const word =
            (targetWord?.prefix || "") +
            (select || "") +
            (targetWord?.hiragana || "");
          return (
            <div className={"w-full"} key={index}>
              <label
                htmlFor={String(index)}
                className={`flex justify-center items-center gap-2 cursor-pointer w-full aspect-video rounded ${
                  targetWord.pronunciation === word && isRoundEnded
                    ? "bg-[#3c559c]"
                    : selectedValue === word
                    ? "bg-[#a74040]"
                    : "bg-[#2d2d2d]"
                } ${isRoundEnded ? "pointer-events-none" : ""}`}
              >
                <p className="text-base text-white">{word}</p>
              </label>
              <input
                id={String(index)}
                type="radio"
                name="answer"
                value={select || ""}
                onChange={() => setSelectedValue(word)}
                className="hidden"
              />
            </div>
          );
        })}
      </div>

      {/* 제출 버튼 */}
      {!hasNext ? (
        <button className="w-full px-4 py-2 text-white bg-[#2d2d2d] rounded">
          퀴즈 종료
        </button>
      ) : isRoundEnded ? (
        <button
          className="w-full px-4 py-2 text-white rounded bg-[#3c559c]"
          onClick={onNextRoundButtonClick}
        >
          다음 문제
        </button>
      ) : (
        <button
          className="w-full px-4 py-2 text-white rounded bg-[#a74040]"
          onClick={() => onAnswerButtonClink()}
        >
          정답입력
        </button>
      )}
    </div>
  );
};

export default QuizContainer;
