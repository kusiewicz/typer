import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  decimal,
  boolean,
  primaryKey,
  pgSchema,
  index,
} from "drizzle-orm/pg-core";
const authSchema = pgSchema("auth");

const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

// --- Tabele Główne ---
export const profiles = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  username: text("username").notNull().unique(),
  isAdmin: boolean("is_admin").default(false).notNull(),
}).enableRLS();

export const teams = pgTable("teams", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  countryCode: text("country_code").notNull().unique(),
}).enableRLS();

export const players = pgTable("players", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  teamId: uuid("team_id").references(() => teams.id),
}).enableRLS();

export const rooms = pgTable("rooms", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdBy: uuid("created_by")
    .references(() => profiles.id)
    .notNull(),
  inviteCode: text("invite_code").unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}).enableRLS();

export const stages = pgTable("stages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  multiplier: decimal("multiplier", { precision: 4, scale: 2 }).notNull().$type<number>(),
});

export const matchDays = pgTable("match_days", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  stageId: uuid("stage_id")
    .references(() => stages.id)
    .notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const matches = pgTable("matches", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchDayId: uuid("match_day_id")
    .references(() => matchDays.id)
    .notNull(),
  homeTeamId: uuid("home_team_id")
    .references(() => teams.id)
    .notNull(),
  awayTeamId: uuid("away_team_id")
    .references(() => teams.id)
    .notNull(),
  matchTime: timestamp("match_time", { withTimezone: true }).notNull(),
  homeScore: integer("home_score"),
  awayScore: integer("away_score"),
  isFinished: boolean("is_finished").default(false),
}).enableRLS();

// --- Tabele Pośredniczące i Typy ---
export const roomMembers = pgTable(
  "room_members",
  {
    roomId: uuid("room_id")
      .references(() => rooms.id)
      .notNull(),
    userId: uuid("user_id")
      .references(() => profiles.id)
      .notNull(),
    joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.roomId, table.userId] }),
  })
).enableRLS();

export const userMatchPredictions = pgTable(
  "user_match_predictions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    roomId: uuid("room_id")
      .references(() => rooms.id)
      .notNull(),
    userId: uuid("user_id")
      .references(() => profiles.id)
      .notNull(),
    matchId: uuid("match_id")
      .references(() => matches.id)
      .notNull(),
    predictedHomeScore: integer("predicted_home_score").notNull(),
    predictedAwayScore: integer("predicted_away_score").notNull(),
    useBonus: boolean("use_bonus").default(false).notNull(),
    pointsAwarded: decimal("points_awarded", { precision: 5, scale: 2 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    userIdx: index("ump_user_id_idx").on(table.userId),
    matchIdx: index("ump_match_id_idx").on(table.matchId),
    roomIdx: index("ump_room_id_idx").on(table.roomId),
  })
).enableRLS();

export const userGlobalPredictions = pgTable("user_global_predictions", {
  id: uuid("id").primaryKey().defaultRandom(),
  roomId: uuid("room_id")
    .references(() => rooms.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => profiles.id)
    .notNull(),
  predictedWinnerId: uuid("predicted_winner_id").references(() => teams.id),
  predictedTopScorerId: uuid("predicted_top_scorer_id").references(
    () => players.id
  ),
  pointsAwarded: integer("points_awarded"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}).enableRLS();
