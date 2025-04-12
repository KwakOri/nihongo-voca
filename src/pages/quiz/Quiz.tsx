import { useEffect, useState } from "react";
import { useParams } from "react-router";
import QuizContainer from "../../components/QuizContainer";
import { WordData } from "../../components/RubyWord/RubyWord";
import words from "../../db/words.json";

// 예시 데이터 (사용 시 실제 데이터로 교체)

const Quiz = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quizWords, setQuizWords] = useState<WordData[]>([]);
  const { day } = useParams();

  useEffect(() => {
    const wordList = words.filter(
      (word) => word.day === Number(day) && word.kanji
    );
    wordList.sort(() => Math.random() - 0.5).slice(0, 10);
    console.log("wordList => ", wordList);
    setQuizWords(wordList);
    setIsLoading(false);
  }, [day]);

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <QuizContainer quizWords={quizWords} />
      )}
    </div>
  );
};

export default Quiz;
