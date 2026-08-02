/**
 * Friend Name and Nickname Helper
 */

// Capitalize first letter of each word
export function formatName(rawName: string): string {
  if (!rawName) return '';
  const trimmed = rawName.trim();
  return trimmed
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Get friend's nickname according to prompt mapping rules
export function getFriendNickname(rawName: string): string {
  const formatted = formatName(rawName);
  const clean = formatted.toLowerCase();

  if (clean.includes('jiya')) return 'Jaggu';
  if (clean.includes('mahak')) return 'MHK';
  if (clean.includes('hemant')) return 'Hemu';
  if (clean.includes('shaukat')) return 'SRK';
  if (clean.includes('nikita')) return 'Nikki';

  return formatted;
}
