const candidates = [
    {
      name: "colin o' brien",
      photo: "https://drive.google.com/thumbnail?id=1EEpZmGIOqW5jLzG_jQX_0nUBHEvAIfhT&sz=w400",
      quote: "i love my big Eed"
    },
    {
      name: "arjun mathu",
      photo: "https://drive.google.com/thumbnail?id=12DbkF-mKoCuB79qMXENwcsiW7W1ZKHJk&sz=w400",
      quote: "wtf is poochena??"
    },
    {
      name: "tiffany",
      photo: "https://drive.google.com/thumbnail?id=1RFQjfXyCGf277Xtii-M5eB_cQ1YQu05g&sz=w400",
      quote: "we welcome cougs"
    },
    {
      name: "parth",
      photo: "https://drive.google.com/thumbnail?id=1USXieHpJDRwEoOjFGx5VbAJxg5pous04&sz=w400",
      quote: "if he's free friday.. we BANGING!"
    },
    {
      name: "isael larios",
      photo: "https://drive.google.com/thumbnail?id=1gkpQBkZONiY206IOJyp2g_F_1UEfkt7A&sz=w400",
      quote: "where's the biggie??"
    },
    {
      name: "manya",
      photo: "https://drive.google.com/thumbnail?id=1VSNRL-BOkDZDQskh8smDk7fHxWXUJeJM&sz=w400",
      quote: "i'm feining for the biggie"
    },
    {
      name: "annabella",
      photo: "https://drive.google.com/thumbnail?id=1IXrCKxaRheZKCj_FCbMawaT43ZbLO8D7&sz=w400",
      quote: "meow"
    },
    {
      name: "evelyn",
      photo: "https://drive.google.com/thumbnail?id=1klTZ8jFkUM3ssm4cSHcs15uXAzUyZ0Mm&sz=w400",
      quote: "evelyn is feeling feisty!"
    }
  ];
  
  // Get the next page from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const nextPage = urlParams.get('next');
  
  // Pick random candidate
  const randomIndex = Math.floor(Math.random() * candidates.length);
  const randomCandidate = candidates[randomIndex];
  
  // Display the candidate
  document.getElementById('transitionPhoto').src = randomCandidate.photo;
  document.getElementById('transitionPhoto').alt = randomCandidate.name;
  document.getElementById('transitionQuote').textContent = `"${randomCandidate.quote}"`;
  
  // After 2 seconds, go to next page
  setTimeout(() => {
    if (nextPage) {
      window.location.href = nextPage;
    }
  }, 2000);