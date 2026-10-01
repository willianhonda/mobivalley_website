import en from "@/content/en";
import pt from "@/content/pt";
import type { Locale } from "@/lib/i18n";

export type { Dictionary } from "@/content/pt";

const dictionaries = { pt, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
