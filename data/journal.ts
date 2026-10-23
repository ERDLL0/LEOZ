import records from './journal.json';

export type JournalArticle = {
  slug: string;
  category: string;
  title: string;
  image: string;
  body: string[];
  author: string | null;
  publishedAt: string | null;
  verified: boolean;
  source: string | null;
};

export const journalArticles: JournalArticle[] = records;
