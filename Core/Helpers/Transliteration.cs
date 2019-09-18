using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Core.Helpers
{
    public class Transliteration
    {
        public static char[] chOrigTable =
        {
            'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и',
            'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т',
            'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь',
            'э', 'ю', 'я', ' '
        };

        public static string[] chSafeTable =
        {
            "a", "b", "v", "g", "d", "e", "e", "j", "z", "i",
            "i", "k", "l", "m", "n", "o", "p", "r", "s", "t",
            "y", "f", "h", "c", "c", "s", "s", "", "i", "",
            "e", "u", "ya", "-"
        };

        public static char[] latins =
        {
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        };

        public static char[] digits = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };

        public static string Transform(string text, int maxLength = 255)
        {
            text = RemoveTags(text);
            text = ConvertToLatin(text);
            return text.Substring(0, Math.Min(text.Length, maxLength));
        }

        private static string ConvertToLatin(string text)
        {
            var resultText = "";

            if (!String.IsNullOrEmpty(text))
            {
                text = text.ToLower();

                foreach (char t in text)
                {
                    if (Array.IndexOf(digits, t) > -1)
                    {
                        resultText += t;
                        continue;
                    }

                    if (Array.IndexOf(latins, t) > -1)
                    {
                        resultText += t;
                        continue;
                    }

                    var index = Array.IndexOf(chOrigTable, t);
                    if (index > -1)
                    {
                        resultText += chSafeTable[index];
                        continue;
                    }

                    resultText += '-';
                }

                resultText = Regex.Replace(resultText, @"-{2,}", "-");
                resultText = resultText.Trim('-');
            }

            return resultText;
        }

        private static string RemoveTags(string str)
        {
            string result = Regex.Replace(str, @"(?></?\w+)(?>(?:[^>'""]+|'[^']*'|""[^""]*"")*)>", String.Empty);
            result = Regex.Replace(result, "&nbsp;", " ");
            result = Regex.Replace(result, "&mdash;|&ndash;", "-");

            return result;
        }
    }
}
