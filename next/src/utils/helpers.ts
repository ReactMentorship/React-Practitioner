/**
 * Shortens a given string to a specified maximum length, adding an ellipsis ("...") if the string exceeds the maximum length.
 *
 * @param str - The string to be shortened.
 * @param maxLen - The maximum allowed length of the shortened string.
 * @returns The shortened string with an ellipsis if it exceeds the maximum length, or the original string if it is within the limit.
 *
 */
export const shorten = (str: string, maxLen: number) => {
  if (!str) return;
  if (str.length <= maxLen) return str;
  const shortenStatement = str.slice(0, str.lastIndexOf(" ", maxLen));
  const shortenString = str.slice(0, maxLen);
  const isShortenStatementExceeded = shortenStatement.length > maxLen;
  return `${isShortenStatementExceeded ? shortenString : shortenStatement}...`;
};