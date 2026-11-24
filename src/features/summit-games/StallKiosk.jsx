import { useState, useMemo } from 'react';
import { ArrowRight, RotateCcw, CheckCircle2, XCircle, Award, Sparkles, Monitor, ArrowLeft } from 'lucide-react';
import allQuestions from '../../../supabase/content/questions.json';

// Curated bank for Stall 2: Real Startup or Total Parody?
export const PARODY_QUESTIONS = [
  {
    id: 'sp-1',
    pitch: "A messaging app where the only thing you can communicate to your contacts is sending the single word 'Yo'.",
    isReal: true,
    name: "Yo",
    category: "Real Startup (Raised $1.5M)",
    funFact: "It raised $1.5 million from top Silicon Valley venture capitalists and reached #3 on the Apple App Store in 2014 with over 3 million users!"
  },
  {
    id: 'sp-2',
    pitch: "An on-demand service where you hire fake paparazzi, screaming fans, or enthusiastic crowds to follow you around or attend your product launch.",
    isReal: true,
    name: "Crowds on Demand",
    category: "Real Startup (Active & Profitable)",
    funFact: "Started in 2012 by an entrepreneur who realized politicians, influencers, and new brands would pay thousands for artificial hype. Still operating profitably today!"
  },
  {
    id: 'sp-3',
    pitch: "An online marketplace specifically created for people to sell their engagement rings and wedding gifts after broken engagements or sudden divorces.",
    isReal: true,
    name: "I Do, Now I Don't",
    category: "Real Startup (Acquired for Millions)",
    funFact: "The founder was dumped right after proposing, and a jeweler offered him only $3,500 for a $10,000 ring. He launched the site out of revenge and later sold it for millions!"
  },
  {
    id: 'sp-4',
    pitch: "A service that anonymously mails an envelope packed with spring-loaded micro-glitter to anyone you dislike, designed to explode everywhere when opened.",
    isReal: true,
    name: "ShipYourEnemiesGlitter",
    category: "Real Startup (Sold for $85,000 in 4 days)",
    funFact: "The 22-year-old creator was so overwhelmed by $20,000 in orders in the first 24 hours that he begged people to stop ordering, and sold the 4-day-old website for $85,000!"
  },
  {
    id: 'sp-5',
    pitch: "Send someone an anonymous message of up to 15 words hand-written with a permanent marker onto a raw russet potato mailed to their doorstep.",
    isReal: true,
    name: "Potato Parcel",
    category: "Real Startup (Shark Tank Deal)",
    funFact: "Appeared on Shark Tank, secured an investment deal from Kevin O’Leary, and generated over $1,000,000 in revenue mailing potatoes worldwide!"
  },
  {
    id: 'sp-6',
    pitch: "A platform where you hire certified professional cuddlers to meet you for strictly platonic, therapeutic hugging and cuddling sessions.",
    isReal: true,
    name: "Cuddlist",
    category: "Real Startup (Active Network)",
    funFact: "Certified professional cuddlers charge between $80 to $120 per hour, complete with a strict code of conduct and formal background checks!"
  },
  {
    id: 'sp-7',
    pitch: "A social alarm clock where you don’t hear a digital ringtone—instead, a complete stranger from somewhere in the world receives an automated phone call to personally wake you up.",
    isReal: true,
    name: "Wakie",
    category: "Real Startup (Raised $3M+)",
    funFact: "Over 30 million wake-up calls were completed by strangers across 80 countries, starting as an experimental community project and raising over $3M in venture funding!"
  },
  {
    id: 'sp-8',
    pitch: "A bicycle with no pedals, no gears, and no seat, where the rider is strapped into an overhead hanging harness and runs forward on the pavement.",
    isReal: true,
    name: "Fliz",
    category: "Real Concept (Design Award Nominee)",
    funFact: "German designers created it based on the historical 1817 'running machine'. The concept video went viral worldwide with millions of views!"
  },
  {
    id: 'sp-9',
    pitch: "An Android app that costs $0.99, displays a completely blank grey screen with no buttons, and does absolutely nothing.",
    isReal: true,
    name: "Nothing (The App)",
    category: "Real Startup (1M+ Downloads)",
    funFact: "Over 1 million people downloaded it, and thousands left 5-star reviews praising how relaxing it was that the app genuinely did nothing at all!"
  },
  {
    id: 'sp-10',
    pitch: "A Bluetooth smart collar that converts your dog's tail wags into kinetic energy to mine fractional Bitcoin while they chase balls in the yard.",
    isReal: false,
    name: "DoggyCrypto",
    category: "Parody / Joke",
    funFact: "A satirical tech prank! Physicists calculated a Golden Retriever would need to wag its tail non-stop for 42,000 years to mine even $0.01 of Bitcoin!"
  },
  {
    id: 'sp-11',
    pitch: "An alarm clock app that automatically charges your credit card $10 every time you hit snooze and donates it directly to your most hated rival political party.",
    isReal: false,
    name: "SnoozeCash",
    category: "Parody / Viral Concept",
    funFact: "A viral satirical concept from Reddit. While several indie developers tried building prototypes, major payment processors banned automated punitive billing!"
  },
  {
    id: 'sp-12',
    pitch: "An AI dating app that monitors your text messages, detects when a date is losing interest, and automatically generates polite excuses to ghost them first.",
    isReal: false,
    name: "GhostMate AI",
    category: "Parody / Comedy Sketch",
    funFact: "Created as an April Fools parody by a comedy group, but thousands of people genuinely submitted their email addresses to join the beta waiting list!"
  },
  {
    id: 'sp-13',
    pitch: "A high-tech smart toaster that syncs with morning stock market feeds and toasts a mini line-graph onto your bread showing whether the S&P 500 is up or down.",
    isReal: false,
    name: "BreadPrint AI",
    category: "Parody / Tech Satire",
    funFact: "A viral meme mocking modern tech hardware startups that slap 'AI and Bluetooth' onto ordinary kitchen appliances!"
  },
  {
    id: 'sp-14',
    pitch: "An on-demand service where people rent professional actors to attend funerals, cry convincingly, and mingle with guests to make the deceased look widely beloved.",
    isReal: true,
    name: "Rent-A-Mourner",
    category: "Real Business (UK Service)",
    funFact: "Before the service, actors are thoroughly briefed on the deceased's fake friendship background so they can smoothly chat with genuine family members!"
  },
  {
    id: 'sp-15',
    pitch: "A website selling official certificates guaranteeing your soul a travel reservation and flight ticket to Heaven, backed by a 100% money-back guarantee.",
    isReal: true,
    name: "ReserveASpotInHeaven.com",
    category: "Real Business (Novelty Hit)",
    funFact: "They sold thousands of certificates at $12.79 each, backed by a 100% money-back guarantee payable in person if you don't make it past St. Peter!"
  },
  {
    id: 'sp-16',
    pitch: "High-tech commuter sleep pods installed on city buses where passengers are flash-chilled to 4°C to take 10-minute micro-hibernations in heavy traffic.",
    isReal: false,
    name: "CryoNap Transit",
    category: "Parody / Sci-Fi Spoof",
    funFact: "A fictional spoof from a futuristic design contest. Medical doctors pointed out that flash-chilling passengers in traffic would be instantly fatal!"
  }
];

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function StallKiosk({ initialStall = null }) {
  const [selectedStall, setSelectedStall] = useState(initialStall);
  const [sessionKey, setSessionKey] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [lastRoundPoints, setLastRoundPoints] = useState(0);
  const [lastRoundTime, setLastRoundTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);
  const [nickname, setNickname] = useState('');
  const [started, setStarted] = useState(false);

  // Pool for Stall 1: Founder's Call (draw 5 from deal questions)
  const foundersCallQuestions = useMemo(() => {
    const deals = allQuestions.filter(q => q.game === 'deal');
    return shuffleArray(deals).slice(0, 5);
  }, [sessionKey]);

  // Pool for Stall 2: Real Startup or Total Parody (draw 5)
  const parodyQuestions = useMemo(() => {
    return shuffleArray(PARODY_QUESTIONS).slice(0, 5);
  }, [sessionKey]);

  const activeQuestions = selectedStall === 'founders-call' ? foundersCallQuestions : parodyQuestions;
  const currentQ = activeQuestions[currentIndex];

  const handleStart = (name) => {
    setNickname(name || 'Visitor');
    setStarted(true);
    setCurrentIndex(0);
    setScore(0);
    setPoints(0);
    setTotalTime(0);
    setSelectedAnswer(null);
    setIsFinished(false);
    setQuestionStartTime(Date.now());
  };

  const handleReset = () => {
    setSessionKey(k => k + 1);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setPoints(0);
    setTotalTime(0);
    setIsFinished(false);
    setStarted(false);
    setNickname('');
  };

  const handleAnswer = (choice) => {
    if (selectedAnswer !== null) return;
    const elapsed = Math.max(0.4, (Date.now() - questionStartTime) / 1000);
    setTotalTime(t => t + elapsed);
    setLastRoundTime(elapsed);
    setSelectedAnswer(choice);
    
    let isCorrect = false;
    if (selectedStall === 'founders-call') {
      isCorrect = currentQ.answers.includes(choice);
    } else {
      isCorrect = currentQ.isReal === choice;
    }

    if (isCorrect) {
      setScore(s => s + 1);
      // 1000 base + up to 200 speed bonus (faster answer = higher score)
      const speedBonus = Math.floor(200 * Math.max(0, 1 - elapsed / 25));
      const earned = 1000 + speedBonus;
      setLastRoundPoints(earned);
      setPoints(p => p + earned);
    } else {
      setLastRoundPoints(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setQuestionStartTime(Date.now());
    } else {
      setIsFinished(true);
    }
  };

  // 1. Selector view if no stall picked yet
  if (!selectedStall) {
    return (
      <div className="sg-stall-hub">
        <div className="sg-stall-hub-header">
          <span className="sg-kicker"><Monitor size={15} /> Summit Interactive Stalls</span>
          <h1>Choose this laptop’s<br /><em>Stall Game</em></h1>
          <p>Set up one laptop per stall. Each game runs as a fast, self-contained solo kiosk with zero audio needed.</p>
        </div>

        <div className="sg-stall-grid">
          <div className="sg-stall-card" onClick={() => setSelectedStall('founders-call')}>
            <span className="sg-chip">Stall 1 Laptop</span>
            <h2>Founder’s Call</h2>
            <p className="sg-kicker">Startup Dilemma & Decision</p>
            <p>5 sudden startup curveballs. Walk up, read the situation, and make the high-stakes executive call.</p>
            <button className="sg-button">Launch Stall 1 Kiosk <ArrowRight size={17} /></button>
          </div>

          <div className="sg-stall-card is-parody" onClick={() => setSelectedStall('real-or-parody')}>
            <span className="sg-chip is-accent">Stall 2 Laptop</span>
            <h2>Real Startup or Total Parody?</h2>
            <p className="sg-kicker" style={{ color: '#ffd280' }}>Bizarre Pitches & Mind-Blowing Facts</p>
            <p>5 unbelievable business ideas. Can visitors guess which ones actually raised millions and which ones are satire?</p>
            <button className="sg-button" style={{ background: '#ffd280', color: '#271805' }}>Launch Stall 2 Kiosk <ArrowRight size={17} /></button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Welcome / Tap to play screen for a visitor
  if (!started) {
    return (
      <div className="sg-stall-kiosk-entry">
        <div className="sg-stall-nav-back">
          <button className="sg-text" onClick={() => setSelectedStall(null)}>
            <ArrowLeft size={15} /> Switch Stall Mode
          </button>
          <button className="sg-text" onClick={() => document.documentElement.requestFullscreen?.().catch(() => {})}>
            <Monitor size={15} /> Full screen
          </button>
        </div>

        <section className="sg-stall-welcome-panel">
          <span className="sg-chip">
            {selectedStall === 'founders-call' ? 'Stall 1 Challenge' : 'Stall 2 Challenge'}
          </span>
          <h1>
            {selectedStall === 'founders-call' ? (
              <>Founder’s Call<br /><em>Startup Dilemma</em></>
            ) : (
              <>Real Startup or<br /><em>Total Parody?</em></>
            )}
          </h1>
          <p className="sg-lede">
            {selectedStall === 'founders-call'
              ? 'Step into the founder’s shoes. You will face 5 unexpected business crises. Choose the sharpest strategic move.'
              : 'Silicon Valley gets weird. 5 bizarre business pitches—can you tell the real multimillion-dollar startups from the parodies?'}
          </p>

          <div className="sg-stall-start-box">
            <input
              type="text"
              maxLength="20"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder="Your name or nickname (optional)"
              className="sg-stall-input"
            />
            <button className="sg-button is-large" onClick={() => handleStart(nickname)}>
              Start Challenge <ArrowRight size={20} />
            </button>
          </div>
          <p className="sg-footnote">Takes about 60–90 seconds · Instant score reveal</p>
        </section>
      </div>
    );
  }

  // 3. Game finished score screen
  if (isFinished) {
    const isPerfect = score === activeQuestions.length;
    return (
      <div className="sg-stall-kiosk-finish">
        <section className="sg-stall-finish-panel">
          <div className="sg-orbit">
            <Award size={48} />
          </div>
          <p className="sg-kicker">Challenge Complete</p>
          <h1>{isPerfect ? 'Unicorn Instincts!' : score >= 3 ? 'Sharp Thinking!' : 'Great Effort!'}</h1>
          <p className="sg-stall-player-tag">Played by <strong>{nickname || 'Visitor'}</strong></p>

          <div className="sg-stall-score-badge">
            <strong>{points.toLocaleString()}</strong>
            <span>pts</span>
          </div>

          <div className="sg-stall-stats-row">
            <div>
              <span>Accuracy</span>
              <strong>{score} / {activeQuestions.length}</strong>
            </div>
            <div>
              <span>Total Time</span>
              <strong>{totalTime.toFixed(1)}s</strong>
            </div>
            <div>
              <span>Average / Q</span>
              <strong>{(totalTime / activeQuestions.length).toFixed(1)}s</strong>
            </div>
          </div>

          <p className="sg-stall-summary-copy">
            {selectedStall === 'founders-call'
              ? (isPerfect ? 'You showed textbook crisis leadership under pressure.' : 'Tough calls! Entrepreneurship is all about navigating uncertainty.')
              : (isPerfect ? 'You can spot real innovation through all the tech noise!' : 'Don’t worry—some real startups sound crazier than actual jokes!')}
          </p>

          <div className="sg-stall-finish-actions">
            <button className="sg-button is-large" onClick={handleReset}>
              <RotateCcw size={18} /> Next Visitor / Play Again
            </button>
          </div>
        </section>
      </div>
    );
  }

  // 4. Active Question View
  return (
    <div className="sg-stall-kiosk-play">
      <div className="sg-stall-top-bar">
        <div>
          <span className="sg-chip">
            {selectedStall === 'founders-call' ? 'Stall 1: Founder’s Call' : 'Stall 2: Real vs Parody'}
          </span>
          <strong className="sg-stall-user-badge">{nickname || 'Visitor'}</strong>
        </div>
        <div className="sg-stall-progress-indicator">
          <span>Round {currentIndex + 1} of {activeQuestions.length}</span>
          <div className="sg-stall-dots">
            {activeQuestions.map((_, i) => (
              <span key={i} className={`sg-stall-dot ${i === currentIndex ? 'is-active' : i < currentIndex ? 'is-done' : ''}`} />
            ))}
          </div>
        </div>
      </div>

      {selectedStall === 'founders-call' ? (
        // Stall 1: Founder's Call Question Card
        <div className="sg-stall-question-card sg-game-deal">
          <p className="sg-kicker">{currentQ.public_data.prompt}</p>
          <h2>{currentQ.public_data.scenario}</h2>
          
          <div className="sg-pivot-objective">
            <strong>Your Goal</strong>
            <span>{currentQ.public_data.objective}</span>
          </div>

          <div className="sg-stall-options-grid">
            {currentQ.public_data.options.map(option => {
              const isPicked = selectedAnswer === option.id;
              const isCorrectAnswer = currentQ.answers.includes(option.id);
              let statusClass = '';
              if (selectedAnswer !== null) {
                if (isCorrectAnswer) statusClass = 'is-correct-target';
                else if (isPicked) statusClass = 'is-wrong-picked';
              }

              return (
                <button
                  key={option.id}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswer(option.id)}
                  className={`sg-stall-option-button ${isPicked ? 'is-selected' : ''} ${statusClass}`}
                >
                  <span className="sg-stall-letter">{option.id.toUpperCase()}</span>
                  <span className="sg-stall-option-text">{option.text}</span>
                  {selectedAnswer !== null && isCorrectAnswer && <CheckCircle2 className="sg-status-icon is-green" size={20} />}
                  {selectedAnswer !== null && isPicked && !isCorrectAnswer && <XCircle className="sg-status-icon is-red" size={20} />}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <div className="sg-stall-reveal-card">
              <div className="sg-stall-reveal-header">
                {currentQ.answers.includes(selectedAnswer) ? (
                  <span className="sg-verdict-tag is-correct"><CheckCircle2 size={16} /> Strategic Move! +{lastRoundPoints} pts ({lastRoundTime.toFixed(1)}s)</span>
                ) : (
                  <span className="sg-verdict-tag is-incorrect"><XCircle size={16} /> Risky Decision (+0 pts)</span>
                )}
              </div>
              <p className="sg-stall-explanation">
                <strong>Founder Takeaway: </strong>{currentQ.explanation}
              </p>
              <button className="sg-button sg-stall-next-btn" onClick={handleNext}>
                {currentIndex + 1 === activeQuestions.length ? 'See Final Score' : 'Next Scenario'} <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>
      ) : (
        // Stall 2: Real Startup or Total Parody Card
        <div className="sg-stall-question-card sg-game-parody">
          <p className="sg-kicker"><Sparkles size={14} /> Pitch #{currentIndex + 1}</p>
          <h2 className="sg-parody-pitch">“{currentQ.pitch}”</h2>

          <div className="sg-parody-decisions">
            <button
              disabled={selectedAnswer !== null}
              onClick={() => handleAnswer(true)}
              className={`sg-parody-choice is-real ${selectedAnswer === true ? 'is-picked' : ''} ${selectedAnswer !== null && currentQ.isReal === true ? 'is-verified' : ''}`}
            >
              <span className="sg-emoji">🚀</span>
              <strong>REAL STARTUP</strong>
              <small>Actual company that launched</small>
            </button>

            <button
              disabled={selectedAnswer !== null}
              onClick={() => handleAnswer(false)}
              className={`sg-parody-choice is-fake ${selectedAnswer === false ? 'is-picked' : ''} ${selectedAnswer !== null && currentQ.isReal === false ? 'is-verified' : ''}`}
            >
              <span className="sg-emoji">🤡</span>
              <strong>TOTAL PARODY</strong>
              <small>Satire / joke pitch</small>
            </button>
          </div>

          {selectedAnswer !== null && (
            <div className="sg-stall-reveal-card is-parody-reveal">
              <div className="sg-stall-reveal-header">
                {selectedAnswer === currentQ.isReal ? (
                  <span className="sg-verdict-tag is-correct"><CheckCircle2 size={18} /> You Nailed It! +{lastRoundPoints} pts ({lastRoundTime.toFixed(1)}s)</span>
                ) : (
                  <span className="sg-verdict-tag is-incorrect"><XCircle size={18} /> Believe it or not... (+0 pts)</span>
                )}
                <span className={`sg-parody-badge ${currentQ.isReal ? 'is-real-badge' : 'is-fake-badge'}`}>
                  {currentQ.category}
                </span>
              </div>

              <div className="sg-parody-company-info">
                <h3>{currentQ.name}</h3>
                <p className="sg-parody-fact">
                  💡 <strong>Fun Fact: </strong>{currentQ.funFact}
                </p>
              </div>

              <button className="sg-button sg-stall-next-btn" onClick={handleNext}>
                {currentIndex + 1 === activeQuestions.length ? 'See Final Score' : 'Next Pitch'} <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
