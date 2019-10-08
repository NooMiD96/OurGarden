using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Core.Helpers
{
    public static class StringHelper
    {
        public static string TransformToId(this string text, int maxLength = 255)
        {
            if (String.IsNullOrEmpty(text))
            {
                return "";
            }

            text = RemoveTags(text.ToLower());
            return text.Substring(0, Math.Min(text.Length, maxLength));
        }

        private static string RemoveTags(string str)
        {
            //string result = Regex.Replace(str, @"(?></?\w+)(?>(?:[^>'""]+|'[^']*'|""[^""]*"")*)>", String.Empty);
            string result = Regex.Replace(str, @"[.,\/#!$%\^&\*;:{}=\/_`~()""]", String.Empty);
            result = Regex.Replace(result, "&nbsp;", " ");
            result = Regex.Replace(result, "&mdash;|&ndash;", "-");
            result = Regex.Replace(result.Trim(), " ", "-");

            return result;
        }
    }
}
