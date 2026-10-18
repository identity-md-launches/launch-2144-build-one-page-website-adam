import { useEffect, useRef, useState } from 'react';
import { GoatMark, Icon } from './Icons';

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;
const replies = [
  'One carrot. One very happy goat.',
  'He likes your taste in snacks.',
  'You’ve officially made a goat friend.',
  'Adam would like to thank the carrot farmer.',
  'A tiny snack. A very good day.',
];

const questions = [
  {
    question: 'Is Adam a real goat?',
    answer: 'Adam is a fictional digital goat, made for a small moment of joy. His portrait is AI-generated, his personality is imaginary, and his love of carrots is very convincing.',
  },
  {
    question: 'What happens when I feed him?',
    answer: 'Adam gets a virtual carrot and a little happier. The carrot count belongs to this visit and resets when you reload. There’s no account, payment, or real-world feeding involved.',
  },
  {
    question: 'Can I keep a little Adam?',
    answer: 'Absolutely. Download the postcard above and save a little goat joy for later. It’s a free PNG image that you can use as a wallpaper or send to a friend.',
  },
];

function App() {
  const [carrots, setCarrots] = useState(0);
  const [feeding, setFeeding] = useState(false);
  const [message, setMessage] = useState('');
  const [downloaded, setDownloaded] = useState(false);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedButton = useRef<HTMLButtonElement>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function feedAdam() {
    if (busy.current) return;
    busy.current = true;
    setFeeding(true);
    setMessage('Crunch, crunch. Adam is enjoying his carrot.');
    timer.current = setTimeout(() => {
      setCarrots((count) => count + 1);
      setMessage(replies[carrots % replies.length]);
      setFeeding(false);
      busy.current = false;
    }, 750);
  }

  function returnToAdam() {
    document.getElementById('adam')?.scrollIntoView({ block: 'start' });
    feedButton.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header page-width" id="top">
        <a className="wordmark" href="#top" aria-label="Adam the goat, back to top"><GoatMark /><span>adam<span className="wordmark-dot">.</span></span></a>
        <nav aria-label="Main navigation" className="main-nav">
          <a href="#about">Meet Adam</a>
          <a className="desktop-nav" href="#postcard">A little keepsake</a>
          <a className="desktop-nav" href="#questions">Goat questions</a>
        </nav>
        <a className="header-link" href="#adam">Say hello <Icon name="arrow" /></a>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero page-width" id="adam" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-intro">
              <h1 id="hero-title">Adam<br />the goat<span className="title-dot">.</span></h1>
              <p className="hero-description">A little digital goat with a big personality.</p>
            </div>

            <div className={`goat-scene${feeding ? ' is-feeding' : ''}${carrots > 0 ? ' is-happy' : ''}`}>
              <div className="scene-circle" aria-hidden="true" />
              <div className="goat-stamp" aria-hidden="true"><Icon name="heart" /><span>Good<br />company</span></div>
              <div className="goat-ground" aria-hidden="true" />
              <img className="adam-portrait" src={asset('adam.webp')} alt="Adam, a curious brown and cream goat with little curved horns and an excellent beard." width="1200" height="800" fetchPriority="high" />
              <div className="flying-carrot" aria-hidden="true"><Icon name="carrot" /></div>
              <div className="goat-reaction" aria-hidden="true"><Icon name={carrots > 0 || feeding ? 'heart' : 'flower'} /></div>
              <div className="scene-caption" aria-hidden="true"><span className="caption-line" /> A face worth slowing down for.</div>
            </div>

            <div className="hero-action">
              <button ref={feedButton} className="button button-primary feed-button" onClick={feedAdam} aria-disabled={feeding} aria-busy={feeding} aria-describedby="feed-hint">
                <Icon name="carrot" /><span>{feeding ? 'Adam is munching…' : 'Give Adam a carrot'}</span><Icon className="button-arrow" name="arrow" />
              </button>
              <p id="feed-hint" className="feed-hint">Give him a virtual carrot.</p>
              <div className="feeding-result">
                <p className="carrot-count"><span className="count-number">{carrots}</span> {carrots === 1 ? 'carrot' : 'carrots'} this visit</p>
                <p className="feed-status" role="status" aria-atomic="true">{message}</p>
              </div>
            </div>
          </div>
          <div className="hero-bottom"><span>Less scrolling, more goat.</span><a href="#about">Get to know Adam <Icon name="down" /></a></div>
        </section>

        <section className="about-section content-width" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <h2 id="about-title">Small goat,<br />big heart.</h2>
            <p>No grand plans. No complicated backstory.<br className="desktop-break" /> Just Adam, making your day a little lighter.</p>
          </div>
          <div className="personality-grid">
            <article className="personality-item"><div className="personality-icon"><Icon name="carrot" /></div><h3>Snack enthusiast</h3><p>If it’s crunchy, he’s interested. A carrot is the quickest way to this little goat’s heart.</p></article>
            <article className="personality-item"><div className="personality-icon"><Icon name="hills" /></div><h3>Curiosity on legs</h3><p>Every hill is a possibility. Every open gate is a personal invitation. That’s Adam’s philosophy.</p></article>
            <article className="personality-item"><div className="personality-icon"><Icon name="flower" /></div><h3>Expert at taking it easy</h3><p>A warm patch of sun. A soft bit of grass. He’s a good reminder that the little things are enough.</p></article>
          </div>
        </section>

        <section className="postcard-section page-width" id="postcard" aria-labelledby="postcard-title">
          <div className="postcard-inner">
            <div className="postcard-art">
              <div className="postcard-tape" aria-hidden="true" />
              <img src={asset('adam-postcard.png')} width="1200" height="630" alt="Adam’s orange postcard: Adam the goat. A little goat, a good day." loading="lazy" />
              <span className="postcard-caption">A little Adam, wherever you go.</span>
            </div>
            <div className="postcard-copy"><Icon name="flower" className="postcard-flower" /><h2 id="postcard-title">Keep a little<br />goat joy.</h2><p>For your desktop, your camera roll, or that friend who could use a goat right now.</p>
              <a className="button button-secondary" href={asset('adam-postcard.png')} download="adam-the-goat-postcard.png" onClick={() => setDownloaded(true)}><Icon name="download" />Download the postcard<Icon className="button-arrow" name="arrow" /></a>
              <p className="download-detail" role="status" aria-atomic="true">{downloaded ? 'Check your downloads for Adam’s postcard.' : 'A free PNG for your camera roll.'}</p>
            </div>
          </div>
        </section>

        <section className="questions-section content-width" id="questions" aria-labelledby="questions-title">
          <div className="questions-intro"><h2 id="questions-title">A few goat<br />questions.</h2><p>In case you were wondering.</p></div>
          <div className="question-list">{questions.map(({ question, answer }) => <details className="question" key={question}><summary>{question}<Icon name="plus" /></summary><p>{answer}</p></details>)}</div>
        </section>

        <div className="farewell content-width"><GoatMark /><p>Go on. Make someone’s day a little lighter.</p><button className="text-button" onClick={returnToAdam}>Give Adam another carrot <Icon name="arrow" /></button></div>
      </main>

      <footer className="site-footer content-width"><a className="footer-wordmark" href="#top">adam.</a><p>A fictional goat. A real good feeling.</p><a className="back-top" href="#top">Back to top <Icon name="arrow" /></a></footer>
    </>
  );
}

export default App;
