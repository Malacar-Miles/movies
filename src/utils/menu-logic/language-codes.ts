import { reverseMap } from "./helper-functions"

export const mapCodeToLanguage: Record<string, string> = {
  "AF": "Afrikaans",
  "AR": "Arabic",
  "EU": "Basque",
  "BG": "Bulgarian",
  "CA": "Catalan",
  "ZH": "Chinese",
  "HR": "Croatian",
  "CS": "Czech",
  "DA": "Danish",
  "NL": "Dutch",
  "EN": "English",
  "FI": "Finnish",
  "FR": "French",
  "DE": "German",
  "HE": "Hebrew",
  "HU": "Hungarian",
  "IT": "Italian",
  "KO": "Korean",
  "NO": "Norwegian",
  "FA": "Persian",
  "PL": "Polish",
  "PT": "Portuguese",
  "RO": "Romanian",
  "RU": "Russian",
  "SR": "Serbian",
  "SK": "Slovak",
  "SL": "Slovenian",
  "ES": "Spanish",
  "SV": "Swedish",
  "TR": "Turkish",
  "UK": "Ukrainian"
}

export const mapLanguageToCode = reverseMap(mapCodeToLanguage);