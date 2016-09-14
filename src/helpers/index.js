export function truncate(string) {
   if (string.length > 95)
      return string.substring(0,95)+'...';
   else
      return string;
};