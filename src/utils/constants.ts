export const ALLOWED_LEAGUES = ['PL', 'BL1', 'PD', 'SA', 'FL1'];

interface StoredTeamDetails {
  name: string;
  crest: string;
}

interface StoredTeams {
  [key: number]: StoredTeamDetails;
}

export const STORED_TEAMS: StoredTeams = {
  1: {
    name: "1. FC Köln",
    crest: "https://crests.football-data.org/1.png"
  },
  2: {
    name: "TSG 1899 Hoffenheim",
    crest: "https://crests.football-data.org/2.png"
  },
  3: {
    name: "Bayer 04 Leverkusen",
    crest: "https://crests.football-data.org/3.png"
  },
  4: {
    name: "Borussia Dortmund",
    crest: "https://crests.football-data.org/4.png"
  },
  5: {
    name: "FC Bayern München",
    crest: "https://crests.football-data.org/5.svg"
  },
  10: {
    name: "VfB Stuttgart",
    crest: "https://crests.football-data.org/10.png"
  },
  11: {
    name: "VfL Wolfsburg",
    crest: "https://crests.football-data.org/11.svg"
  },
  12: {
    name: "SV Werder Bremen",
    crest: "https://crests.football-data.org/12.svg"
  },
  15: {
    name: "1. FSV Mainz 05",
    crest: "https://crests.football-data.org/15.png"
  },
  16: {
    name: "FC Augsburg",
    crest: "https://crests.football-data.org/16.png"
  },
  17: {
    name: "SC Freiburg",
    crest: "https://crests.football-data.org/17.svg"
  },
  18: {
    name: "Borussia Mönchengladbach",
    crest: "https://crests.football-data.org/18.png"
  },
  19: {
    name: "Eintracht Frankfurt",
    crest: "https://crests.football-data.org/19.svg"
  },
  28: {
    name: "1. FC Union Berlin",
    crest: "https://crests.football-data.org/28.svg"
  },
  36: {
    name: "VfL Bochum 1848",
    crest: "https://crests.football-data.org/36.png"
  },
  44: {
    name: "1. FC Heidenheim 1846",
    crest: "https://crests.football-data.org/44.svg"
  },
  55: {
    name: "SV Darmstadt 98",
    crest: "https://crests.football-data.org/55.png"
  },
  57: {
    name: "Arsenal FC",
    crest: "https://crests.football-data.org/57.png"
  },
  58: {
    name: "Aston Villa FC",
    crest: "https://crests.football-data.org/58.png"
  },
  61: {
    name: "Chelsea FC",
    crest: "https://crests.football-data.org/61.png"
  },
  62: {
    name: "Everton FC",
    crest: "https://crests.football-data.org/62.png"
  },
  63: {
    name: "Fulham FC",
    crest: "https://crests.football-data.org/63.svg"
  },
  64: {
    name: "Liverpool FC",
    crest: "https://crests.football-data.org/64.png"
  },
  65: {
    name: "Manchester City FC",
    crest: "https://crests.football-data.org/65.png"
  },
  66: {
    name: "Manchester United FC",
    crest: "https://crests.football-data.org/66.png"
  },
  67: {
    name: "Newcastle United FC",
    crest: "https://crests.football-data.org/67.png"
  },
  73: {
    name: "Tottenham Hotspur FC",
    crest: "https://crests.football-data.org/73.svg"
  },
  76: {
    name: "Wolverhampton Wanderers FC",
    crest: "https://crests.football-data.org/76.svg"
  },
  77: {
    name: "Athletic Club",
    crest: "https://crests.football-data.org/77.png"
  },
  78: {
    name: "Club Atlético de Madrid",
    crest: "https://crests.football-data.org/78.svg"
  },
  79: {
    name: "CA Osasuna",
    crest: "https://crests.football-data.org/79.svg"
  },
  81: {
    name: "FC Barcelona",
    crest: "https://crests.football-data.org/81.svg"
  },
  82: {
    name: "Getafe CF",
    crest: "https://crests.football-data.org/82.png"
  },
  83: {
    name: "Granada CF",
    crest: "https://crests.football-data.org/83.svg"
  },
  86: {
    name: "Real Madrid CF",
    crest: "https://crests.football-data.org/86.png"
  },
  87: {
    name: "Rayo Vallecano de Madrid",
    crest: "https://crests.football-data.org/87.svg"
  },
  89: {
    name: "RCD Mallorca",
    crest: "https://crests.football-data.org/89.png"
  },
  90: {
    name: "Real Betis Balompié",
    crest: "https://crests.football-data.org/90.png"
  },
  92: {
    name: "Real Sociedad de Fútbol",
    crest: "https://crests.football-data.org/92.svg"
  },
  94: {
    name: "Villarreal CF",
    crest: "https://crests.football-data.org/94.png"
  },
  95: {
    name: "Valencia CF",
    crest: "https://crests.football-data.org/95.svg"
  },
  98: {
    name: "AC Milan",
    crest: "https://crests.football-data.org/98.svg"
  },
  99: {
    name: "ACF Fiorentina",
    crest: "https://crests.football-data.org/99.svg"
  },
  100: {
    name: "AS Roma",
    crest: "https://crests.football-data.org/100.svg"
  },
  102: {
    name: "Atalanta BC",
    crest: "https://crests.football-data.org/102.svg"
  },
  103: {
    name: "Bologna FC 1909",
    crest: "https://crests.football-data.org/103.svg"
  },
  104: {
    name: "Cagliari Calcio",
    crest: "https://crests.football-data.org/104.svg"
  },
  107: {
    name: "Genoa CFC",
    crest: "https://crests.football-data.org/107.svg"
  },
  108: {
    name: "FC Internazionale Milano",
    crest: "https://crests.football-data.org/108.png"
  },
  109: {
    name: "Juventus FC",
    crest: "https://crests.football-data.org/109.svg"
  },
  110: {
    name: "SS Lazio",
    crest: "https://crests.football-data.org/110.svg"
  },
  113: {
    name: "SSC Napoli",
    crest: "https://crests.football-data.org/113.svg"
  },
  115: {
    name: "Udinese Calcio",
    crest: "https://crests.football-data.org/115.png"
  },
  263: {
    name: "Deportivo Alavés",
    crest: "https://crests.football-data.org/263.png"
  },
  264: {
    name: "Cádiz CF",
    crest: "https://crests.football-data.org/264.png"
  },
  267: {
    name: "UD Almería",
    crest: "https://crests.football-data.org/267.png"
  },
  275: {
    name: "UD Las Palmas",
    crest: "https://crests.football-data.org/275.png"
  },
  298: {
    name: "Girona FC",
    crest: "https://crests.football-data.org/298.png"
  },
  328: {
    name: "Burnley FC",
    crest: "https://crests.football-data.org/328.png"
  },
  351: {
    name: "Nottingham Forest FC",
    crest: "https://crests.football-data.org/351.png"
  },
  354: {
    name: "Crystal Palace FC",
    crest: "https://crests.football-data.org/354.png"
  },
  356: {
    name: "Sheffield United FC",
    crest: "https://crests.football-data.org/356.svg"
  },
  389: {
    name: "Luton Town FC",
    crest: "https://crests.football-data.org/389.png"
  },
  397: {
    name: "Brighton & Hove Albion FC",
    crest: "https://crests.football-data.org/397.svg"
  },
  402: {
    name: "Brentford FC",
    crest: "https://crests.football-data.org/402.png"
  },
  445: {
    name: "Empoli FC",
    crest: "https://crests.football-data.org/445.png"
  },
  450: {
    name: "Hellas Verona FC",
    crest: "https://crests.football-data.org/450.png"
  },
  455: {
    name: "US Salernitana 1919",
    crest: "https://crests.football-data.org/455.png"
  },
  470: {
    name: "Frosinone Calcio",
    crest: "https://crests.football-data.org/470.png"
  },
  471: {
    name: "US Sassuolo Calcio",
    crest: "https://crests.football-data.org/471.svg"
  },
  511: {
    name: "Toulouse FC",
    crest: "https://crests.football-data.org/511.png"
  },
  512: {
    name: "Stade Brestois 29",
    crest: "https://crests.football-data.org/512.png"
  },
  516: {
    name: "Olympique de Marseille",
    crest: "https://crests.football-data.org/516.png"
  },
  518: {
    name: "Montpellier HSC",
    crest: "https://crests.football-data.org/518.png"
  },
  521: {
    name: "Lille OSC",
    crest: "https://crests.football-data.org/521.svg"
  },
  522: {
    name: "OGC Nice",
    crest: "https://crests.football-data.org/522.png"
  },
  523: {
    name: "Olympique Lyonnais",
    crest: "https://crests.football-data.org/523.svg"
  },
  524: {
    name: "Paris Saint-Germain FC",
    crest: "https://crests.football-data.org/524.png"
  },
  525: {
    name: "FC Lorient",
    crest: "https://crests.football-data.org/525.png"
  },
  529: {
    name: "Stade Rennais FC 1901",
    crest: "https://crests.football-data.org/529.png"
  },
  533: {
    name: "Le Havre AC",
    crest: "https://crests.football-data.org/533.png"
  },
  541: {
    name: "Clermont Foot 63",
    crest: "https://crests.football-data.org/541.svg"
  },
  543: {
    name: "FC Nantes",
    crest: "https://crests.football-data.org/543.png"
  },
  545: {
    name: "FC Metz",
    crest: "https://crests.football-data.org/545.svg"
  },
  546: {
    name: "Racing Club de Lens",
    crest: "https://crests.football-data.org/546.png"
  },
  547: {
    name: "Stade de Reims",
    crest: "https://crests.football-data.org/547.png"
  },
  548: {
    name: "AS Monaco FC",
    crest: "https://crests.football-data.org/548.png"
  },
  558: {
    name: "RC Celta de Vigo",
    crest: "https://crests.football-data.org/558.svg"
  },
  559: {
    name: "Sevilla FC",
    crest: "https://crests.football-data.org/559.svg"
  },
  563: {
    name: "West Ham United FC",
    crest: "https://crests.football-data.org/563.png"
  },
  576: {
    name: "RC Strasbourg Alsace",
    crest: "https://crests.football-data.org/576.png"
  },
  586: {
    name: "Torino FC",
    crest: "https://crests.football-data.org/586.svg"
  },
  721: {
    name: "RB Leipzig",
    crest: "https://crests.football-data.org/721.png"
  },
  1044: {
    name: "AFC Bournemouth",
    crest: "https://crests.football-data.org/1044.png"
  },
  5890: {
    name: "US Lecce",
    crest: "https://crests.football-data.org/5890.png"
  },
  5911: {
    name: "AC Monza",
    crest: "https://crests.football-data.org/5911.png"
  }
};
