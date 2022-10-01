// This is the text line on the homepage that changes dynamically
// ("with X subtitles")

import "./dynamic-text.scss";

import { useTypingText } from "../../hooks/typing-text";
import { mapLanguageToCode } from "../../utils/menu-logic/language-codes";

const languages = Object.keys(mapLanguageToCode);

const DynamicText = () => {
  const { word } = useTypingText(languages, 100, 10);

  return (
    <span className="dynamic-text-container">
      with <span className="dynamic-language-string">{word}</span>&nbsp;&nbsp;Subtitles
    </span>
  );
};

export default DynamicText;
