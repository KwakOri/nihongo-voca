import { Fragment } from "react/jsx-runtime";

interface Token {
  surface: string; // 실제 표면 문자열 (표시되는 텍스트)
  hasKanji: boolean; // 한자가 포함되어 있는지 여부
  kanji?: string; // 한자 (표시용 루비 태그 대상)
  furigana?: string;
}

interface QuizSentenceProps {
  targetWord: string;
  tokens: Token[] | undefined;
  isRoundEnded: boolean;
}

const QuizSentence = ({
  tokens,
  targetWord,
  isRoundEnded,
}: QuizSentenceProps) => {
  return (
    <span className="text-white">
      {tokens?.map((token) => {
        if (token.hasKanji && token.kanji && token.furigana) {
          const hiragana = token.surface.split(token?.kanji || "");
          return (
            <Fragment key={token.kanji}>
              <span>{hiragana[0]}</span>
              <ruby
                className={
                  token.kanji === targetWord
                    ? "underline underline-offset-2"
                    : ""
                }
              >
                {token.kanji}
                {isRoundEnded && (
                  <rt className="text-white">{token.furigana}</rt>
                )}
              </ruby>
              <span>{hiragana[1]}</span>
            </Fragment>
          );
        } else {
          return <span key={token.surface}>{token.surface}</span>;
        }
      })}
    </span>
  );
};

export default QuizSentence;
