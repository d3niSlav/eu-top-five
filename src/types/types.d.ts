export enum STAGE_ENUM {
  FINAL = 'FINAL',
  THIRD_PLACE = 'THIRD_PLACE',
  SEMI_FINALS = 'SEMI_FINALS',
  QUARTER_FINALS = 'QUARTER_FINALS',
  LAST_16 = 'LAST_16',
  LAST_32 = 'LAST_32',
  LAST_64 = 'LAST_64',
  ROUND_4 = 'ROUND_4',
  ROUND_3 = 'ROUND_3',
  ROUND_2 = 'ROUND_2',
  ROUND_1 = 'ROUND_1',
  GROUP_STAGE = 'GROUP_STAGE',
  PRELIMINARY_ROUND = 'PRELIMINARY_ROUND',
  QUALIFICATION = 'QUALIFICATION',
  QUALIFICATION_ROUND_1 = 'QUALIFICATION_ROUND_1',
  QUALIFICATION_ROUND_2 = 'QUALIFICATION_ROUND_2',
  QUALIFICATION_ROUND_3 = 'QUALIFICATION_ROUND_3',
  PLAYOFF_ROUND_1 = 'PLAYOFF_ROUND_1',
  PLAYOFF_ROUND_2 = 'PLAYOFF_ROUND_2',
  PLAYOFFS = 'PLAYOFFS',
  REGULAR_SEASON = 'REGULAR_SEASON',
  CLAUSURA = 'CLAUSURA',
  APERTURA = 'APERTURA',
  CHAMPIONSHIP_ROUND = 'CHAMPIONSHIP_ROUND',
  RELEGATION_ROUND = 'RELEGATION_ROUND'
}

export enum COMPETITION_TYPES_ENUM {
  CUP = 'CUP', PLAYOFFS = 'PLAYOFFS', LEAGUE_CUP = 'LEAGUE_CUP', LEAGUE = 'LEAGUE'
}

export enum GROUP_ENUM {
  GROUP_A = 'GROUP_A',
  GROUP_B = 'GROUP_B',
  GROUP_C = 'GROUP_C',
  GROUP_D = 'GROUP_D',
  GROUP_E = 'GROUP_E',
  GROUP_F = 'GROUP_F',
  GROUP_G = 'GROUP_G',
  GROUP_H = 'GROUP_H',
  GROUP_I = 'GROUP_I',
  GROUP_J = 'GROUP_J',
  GROUP_K = 'GROUP_K',
  GROUP_L = 'GROUP_L'
}

export enum STATUS_ENUM {
  SCHEDULED = 'SCHEDULED',
  TIMED = 'TIMED',
  IN_PLAY = 'IN_PLAY',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
  SUSPENDED = 'SUSPENDED',
  POSTPONED = 'POSTPONED',
  CANCELLED = 'CANCELLED',
  AWARDED = 'AWARDED'
}

export enum VENUE_ENUM {
  HOME = 'HOME',
  AWAY = 'AWAY'
}

type Nullable<T> = T | undefined | null;

export interface ErrorResponse {
  errorCode?: Nullable<number>;
  message?: Nullable<string>;
}
export interface Area {
  code: string;
  flag?: string;
  id: number;
  name: string;
}

export interface Competition {
  area?: Area;
  code: string;
  emblem?: string;
  id: number;
  name: string;
  type: string; //COMPETITION_TYPES_ENUM;
}

export interface CompetitionData extends Competition {
  area: Area;
  currentSeason: Season;
  seasons: Season[];
  lastUpdated: string;
}

export interface Season {
  currentMatchday?: Nullable<number>;
  endDate?: string;
  id: number;
  startDate?: string;
  winner?: Team | null;
}

export interface Time {
  home?: number;
  away?: number;
}

export interface Score {
  duration?: string; //enum
  fullTime?: Time;
  halfTime?: Time;
  winner?: string; //enum
}

export interface Odds {
  msg?: string;
}

export interface Referee {
  id: number;
  name: string;
  nationality: string;
  type: string; //enum
}

export interface Match {
  area: Area;
  competition: Competition;
  season: Season;
  id: number;
  utcDate: string;
  status: STATUS_ENUM;
  matchday: number;
  stage?: STAGE_ENUM;
  group?: GROUP_ENUM | null;
  lastUpdated?: string;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  odds: Odds;
  referees: Referee[]
}

export interface MatchSubresourceFilters {
  season?: string;
  matchday?: number;
  status?: STATUS_ENUM;
  dateFrom?: string;
  dateTo?: string;
  stage?: STAGE_ENUM;
  group?: GROUP_ENUM | null;
}

export interface MatchFilters {
  ids?: string;
  date?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: STATUS_ENUM;
}

export interface MatchDataFilters {
  competitions?: string;
  permission?: string;
  id?: string;
  status?: STATUS_ENUM;
  season?: number;
}

export interface MatchDataResultSet {
  competitions?: string;
  count: number;
  first: string;
  last: string;
  played: number;
  wins?: number;
  draws?: number;
  losses?: number;
}

export interface MatchData {
  filters: MatchDataFilters;
  resultSet: MatchDataResultSet;
  matches: Match[];
  aggregations?: string;
  person?: Player;
}

export interface Contract {
  start: string;
  until: string;
}

export interface Coach {
  contract: Contract;
  dateOfBirth: string;
  firstName: string;
  id: number;
  lastName: string;
  name: string;
  nationality: string;
}


export interface Team {
  area?: Nullable<Area>;
  id: number;
  name: string;
  shortName?: Nullable<string>;
  tla?: Nullable<string>;
  crest?: Nullable<string>;
  address?: Nullable<string>;
  website?: Nullable<string>;
  founded?: Nullable<number>;
  clubColors?: Nullable<string>;
  venue?: Nullable<string>;
  runningCompetitions?: Nullable<Competition[]>;
  coach?: Coach;
  squad?: Player[];
  staff?: Coach[];
  lastUpdated?: string;
  contract?: Nullable<Contract>;
}

export interface Player {
  dateOfBirth: string;
  id: number;
  name: string;
  nationality: string;
  position: string;
  firstName?: string;
  lastName?: string;
  lastUpdated?: string;
  section?: string;
  shirtNumber?: number;
  currentTeam?: Team;
}

export interface Scorer {
  assists?: number;
  goals?: number;
  penalties?: number;
  playedMatches?: number;
  player: Player;
  team: Team;
}

export interface ScorersFilters {
  limit?: number;
  season?: string;
  matchday?: number;
}

export interface ScorersData {
  competition: Competition;
  count: number;
  filters: ScorersFilters;
  scorers: Scorer[];
  season: Season;
}

export interface StandingDetail {
  position: number;
  team: Team;
  playedGames: number;
  form: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface Standing {
  stage?: string; //STAGE_ENUM;
  type: string; //enum;
  group?: string | null; //GROUP_ENUM | null;
  table: StandingDetail[];
}

export interface StandingFilters {
  season?: string;
  matchday?: number;
  date?: string;
}

export interface StandingsData {
  area: Area;
  competition: Competition;
  season: Season;
  count?: number;
  filters: any;
  standings: Standing[];
}

export interface LeagueTeamsFilters {
  season?: string;
}

export interface TeamFilters extends LeagueTeamsFilters {
  limit?: number;
  offset?: number;
  permission?: string;
}

export interface LeagueTeamsData {
  competition: Competition;
  count: number;
  filters: LeagueTeamsFilters;
  season: Season;
  teams: Team[];
}

export interface TeamsData {
  filters: TeamFilters;
  count: number;
  teams: Team[];
}

export interface User {
  id: string;
  username: string;
  favorites?: number[];
}