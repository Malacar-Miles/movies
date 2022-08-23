// This is the text line on the homepage that changes dynamically
// ("with X subtitles")
// NOT IMPLEMENTED YET

import "./dynamic-text.scss";

const DynamicText = () => {
  return (
    <span className="dynamic-text-container">
      with <span className="dynamic-language-string"></span> Subtitles
    </span>
  );
};

export default DynamicText;
