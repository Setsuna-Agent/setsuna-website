import type { Locale } from "./config";
import { en } from "./messages/en";
import { zhCN, type Messages } from "./messages/zh-CN";

export type { Messages } from "./messages/zh-CN";

const messages: Record<Locale, Messages> = { "zh-CN": zhCN, en };

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
