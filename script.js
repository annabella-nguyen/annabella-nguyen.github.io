const candidates = [
    {
      name: "colin o' brien",
      answers: {
        q1: "amazing",
        q2: "playing guitar",
        q3: "drum sticks",
        q4: "chilling",
        q5: "too much aura"
      },
      photo: "https://drive.google.com/thumbnail?id=1EEpZmGIOqW5jLzG_jQX_0nUBHEvAIfhT&sz=w400"
    },
    {
      name: "arjun mathu",
      answers: {
        q1: "humble",
        q2: "group blackout",
        q3: "aura",
        q4: "fork and knife",
        q5: "youre not arjun"
      },
      photo: "https://drive.google.com/thumbnail?id=12DbkF-mKoCuB79qMXENwcsiW7W1ZKHJk&sz=w400"
    },
    {
      name: "tiffany",
      answers: {
        q1: "soup-tastic",
        q2: "sharkcage underwater basket weaving",
        q3: "a gun",
        q4: "no cameras, black trashbag, remove teeth",
        q5: "you watch pimple popping videos before bed"
      },
      photo: "https://drive.google.com/thumbnail?id=1RFQjfXyCGf277Xtii-M5eB_cQ1YQu05g&sz=w400"
    },
    {
      name: "parth",
      answers: {
        q1: "fiend",
        q2: "twister but balancing an egg in a spoon",
        q3: "bananas and grapes",
        q4: "stealing",
        q5: "insane"
      },
      photo: "https://drive.google.com/thumbnail?id=1USXieHpJDRwEoOjFGx5VbAJxg5pous04&sz=w400"
    },
    {
      name: "isael larios",
      answers: {
        q1: "hungry",
        q2: "going to dubai",
        q3: "food",
        q4: "playing clash",
        q5: "spend too much money on clothes"
      },
      photo: "https://drive.google.com/thumbnail?id=1gkpQBkZONiY206IOJyp2g_F_1UEfkt7A&sz=w400"
    },
    {
      name: "manya",
      answers: {
        q1: "adventurous",
        q2: "concert + ice cream",
        q3: "double decker couch",
        q4: "making friends with everyone else in the elevator and hiding it with them",
        q5: "nothing"
      },
      photo: "https://drive.google.com/thumbnail?id=1VSNRL-BOkDZDQskh8smDk7fHxWXUJeJM&sz=w400"
    },
    {
      name: "annabella",
      answers: {
        q1: "tweaker",
        q2: "mega kbbq malatang myomy mukbang",
        q3: "my cat",
        q4: "closing the door...",
        q5: "she lowkey a crazy cat lady"
      },
      photo: "https://drive.google.com/thumbnail?id=1IXrCKxaRheZKCj_FCbMawaT43ZbLO8D7&sz=w400"
    },
    {
      name: "evelyn",
      answers: {
        q1: "discombobulated",
        q2: "rolling down hills",
        q3: "matcha (im addicted)",
        q4: "stealing the wallet on the body",
        q5: "as a kid collected rolly pollies"
      },
      photo: "https://drive.google.com/thumbnail?id=1klTZ8jFkUM3ssm4cSHcs15uXAzUyZ0Mm&sz=w400"
    }
  ];
  
  let userAnswers = {};
  
  // Load answers from localStorage if they exist
  function loadAnswers() {
    const saved = localStorage.getItem('quizAnswers');
    if (saved) {
      userAnswers = JSON.parse(saved);
    }
  }
  
  // Save answers to localStorage
  function saveAnswers() {
    localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));
  }
  
  // Initialize the page
  function init() {
    loadAnswers();
    
    const page = document.body.dataset.page;
    
    if (page === 'start') {
      // Clear previous answers when starting fresh
      localStorage.removeItem('quizAnswers');
      userAnswers = {};
      
      const startBtn = document.getElementById('startBtn');
      if (startBtn) {
        startBtn.addEventListener('click', function() {
          window.location.href = this.dataset.next;
        });
      }
    } else if (page === 'result') {
      displayResult();
    } else {
      // Question pages
      setupQuestionButtons();
    }
  }
  
  // Setup buttons for question pages
  function setupQuestionButtons() {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    
    choiceButtons.forEach(button => {
      button.addEventListener('click', function() {
        const question = this.dataset.question;
        const value = this.dataset.value;
        const next = this.dataset.next;
        
        // Save the answer
        userAnswers[question] = value;
        saveAnswers();
        
        // Navigate to next page
        window.location.href = next;
      });
    });
  }
  
  // Normalize strings for comparison
  function normalize(str) {
    return str.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
  }
  
  // Calculate match score
  function calculateMatch(candidate) {
    let score = 0;
    let totalQuestions = 5;
    
    for (let question in userAnswers) {
      const userAnswer = normalize(userAnswers[question]);
      const candidateAnswer = normalize(candidate.answers[question]);
      
      if (userAnswer === candidateAnswer) {
        score++;
      }
    }
    
    return {
      score: score,
      percentage: Math.round((score / totalQuestions) * 100)
    };
  }
  
  // Find best match
  function findBestMatch() {
    let bestMatch = null;
    let highestScore = -1;
    
    candidates.forEach(candidate => {
      const match = calculateMatch(candidate);
      if (match.score > highestScore) {
        highestScore = match.score;
        bestMatch = {
          candidate: candidate,
          score: match.score,
          percentage: match.percentage
        };
      }
    });
    
    return bestMatch;
  }
  
  // Find top 3 matches
  function findTopMatches() {
    let matches = [];
    
    candidates.forEach(candidate => {
      const match = calculateMatch(candidate);
      matches.push({
        candidate: candidate,
        score: match.score,
        percentage: match.percentage
      });
    });
    
    // Sort by score descending
    matches.sort((a, b) => b.score - a.score);
    
    // Return top 3
    return matches.slice(0, 3);
  }
  
  // Display result
  function displayResult() {
    const topMatches = findTopMatches();
    
    if (!topMatches || topMatches.length === 0) {
      document.querySelector('.result-card').innerHTML = `
        <h2>Oops!</h2>
        <p>It looks like you haven't answered all the questions yet.</p>
        <button class="btn primary" onclick="window.location.href='index.html'">Start Over</button>
      `;
      return;
    }
    
    const bestMatch = topMatches[0];
    const candidate = bestMatch.candidate;
    
    // Build runner-ups HTML
    let runnerUpsHTML = '<div class="runner-ups"><h3>Runner-ups:</h3>';
    
    for (let i = 1; i < Math.min(3, topMatches.length); i++) {
      const runnerUp = topMatches[i];
      runnerUpsHTML += `
        <div class="runner-up">
          <img src="${runnerUp.candidate.photo}" alt="${runnerUp.candidate.name}" class="runner-up-photo" onerror="this.style.display='none'">
          <div class="runner-up-info">
            <h4>${runnerUp.candidate.name}</h4>
            <p class="runner-up-score">${runnerUp.percentage}% match (${runnerUp.score}/5)</p>
          </div>
        </div>
      `;
    }
    
    runnerUpsHTML += '</div>';
    
    document.querySelector('.result-card').innerHTML = `
      <h2 class="match-header">ur mentuzz match is...</h2>
      <h1 class="match-name">${candidate.name}!</h1>
      <img src="${candidate.photo}" alt="${candidate.name}" class="match-photo" onerror="this.style.display='none'">
      <p class="match-score">Match Score: ${bestMatch.percentage}% (${bestMatch.score}/5 answers matched!)</p>
      
      ${runnerUpsHTML}
      
      <div class="action-buttons">
        <button class="btn primary" onclick="window.location.href='index.html'">take again</button>
      </div>
    `;
  }
  
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', init);