type IntroWordmarkProps = {
  onComplete: () => void;
};

const words = ['THE', 'HOUSE', 'BEHIND', 'THE NAMES'];

function IntroWordmark({ onComplete }: IntroWordmarkProps) {
  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && event.animationName === 'intro-exit') {
      onComplete();
    }
  };

  return (
    <div className="intro-wordmark" aria-label="The house behind the names" onAnimationEnd={handleAnimationEnd}>
      <div className="intro-wordmark-rule" />
      <div className="intro-wordmark-stages" aria-hidden="true">
        {words.map((word, wordIndex) => (
          <p className="intro-word" key={word} style={{ '--word-index': wordIndex } as React.CSSProperties}>
            {word.split('').map((letter, letterIndex) => (
              <span key={`${letter}-${letterIndex}`} style={{ '--letter-index': letterIndex } as React.CSSProperties}>
                {letter === ' ' ? '\u00a0' : letter}
              </span>
            ))}
          </p>
        ))}
      </div>
      <p className="intro-caption">THE HOUSE BEHIND THE NAMES</p>
    </div>
  );
}

export default IntroWordmark;
