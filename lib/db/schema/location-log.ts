import { relations } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { DescriptionSchema, LatSchema, LongSchema, NameSchema } from "~/lib/zod-schemas";

import { user } from "./auth";
import { location } from "./location";

export const locationLog = sqliteTable("locationLog", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  startedAt: int().notNull(),
  endedAt: int().notNull(),
  lat: real().notNull(),
  long: real().notNull(),
  locationId: int().notNull().references(() => location.id),
  userId: int().notNull().references(() => user.id),
  created_at: int().notNull().$default(() => Date.now()),
  updated_at: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

export const locationLogRelations = relations(locationLog, ({ one }) => ({
  location: one(location, {
    fields: [locationLog.locationId],
    references: [location.id],
  }),
}));

export const InsertLocationLog = createInsertSchema(locationLog, {
  name: NameSchema,
  description: DescriptionSchema,
  lat: LatSchema,
  long: LongSchema,
}).omit({
  id: true,
  userId: true,
  locationId: true,
  created_at: true,
  updated_at: true,
}).superRefine((values, context) => {
  if (values.startedAt > values.endedAt || values.endedAt < values.startedAt) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Start date must be before end date",
      path: ["startedAt"],
    });
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "End date must be after start date",
      path: ["endedAt"],
    });
  }
});

export type InsertLocationLog = z.infer<typeof InsertLocationLog>;
export type SelectLocationLog = typeof locationLog.$inferSelect;
