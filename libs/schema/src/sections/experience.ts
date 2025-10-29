import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

export const workTypeEnum = z.enum(["On-Site", "Remote", "Hybrid", "none", "other"]);
export const employmentTypeEnum = z.enum([
  "Full-Time",
  "Part-Time",
  "Internship",
  "Contract",
  "Freelance",
  "Temporary",
  "Volunteer",
  "none",
  "other",
]);

export type WorkTypeEnum = z.infer<typeof workTypeEnum>;
export type EmploymentTypeEnum = z.infer<typeof employmentTypeEnum>;

// Schema
export const experienceSchema = itemSchema.extend({
  company: z.string().min(1),
  position: z.string(),
  location: z.string(),
  date: z.string(),
  summary: z.string(),
  overview: z.string(),
  industries: z.array(z.string()).default([]),
  specialities: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  url: urlSchema,
  companyDescription: z.string().optional(),
  workType: workTypeEnum.optional(),
  employmentType: employmentTypeEnum.optional(),
  customEmploymentType: z.string().optional(),
  customWorkType: z.string().optional(),
});

// Type
export type Experience = z.infer<typeof experienceSchema>;

// Defaults
export const defaultExperience: Experience = {
  ...defaultItem,
  company: "",
  position: "",
  location: "",
  date: "",
  summary: "",
  overview: "",
  industries: [],
  specialities: [],
  tags: [],
  companyDescription: "",
  url: defaultUrl,
  workType: "none",
  employmentType: "none",
};
