#  eu-top-five

A simple web solution for visualization of sport data regarding the top leagues in Europe, including
- the Premier League in England
- the Bundesliga in Germany
- La Liga in Spain
- Serie A in Italy
- Ligue 1 in France

## Prerequisite

The Client App is using data from the [football-data](https://www.football-data.org/) API.
You will need to register for an API KEY.

Copy the `.env.example` file and add the key user `VUE_APP_API_KEY`

!Important: Currently .env is not connected to the APP, so replace YOUR_API_KEY in the `src/services/api.ts` file

When running the code from `localhost`, you will need to allow CORS in your browser to access the API.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Project routes

There two stages of navigation in the app - when a league is selected and when not.

If no league is chosen, the user can see:
- *Matches* - list of all matches per week
- *Teams* - list of all football teams

When the user selects a league from the dropdown, he can now see league specific details:
- *Archive* - league summary and history of the previous seasons winners
- *Matches* - all matches for the season in the selected league
- *Teams* - all teams under the selected league
- *Standings* - the standings statistics for the league
- *Scorer* - the high scorers of the league

In addition, there are a few details pages:
- *Team profile* - includes details for the team, recent matches, squad list, couch, staff history;
- *Player profile* - includes details for the player and his last matches.

## Future features
For the future development of the project a user management system can be created

Authentication:
- Login
- Register
- Forgotten password

User preferences:
- Favorite teams
- Favorite players
- Favorite leagues