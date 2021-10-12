import { Link } from './link.scheme';

export function generateNewLinkObject(url: string): Link {
  return new Link({
    _id: _randomShortCode(),
    url: url,
    clicks: [],
  });
}

function _randomShortCode(): string {
  let outString = '';
  const inOptions =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  // 62^8 of possibility
  for (let i = 0; i < 8; i++) {
    outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
  }

  return outString;
}
