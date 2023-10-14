const defState = {
  ribbon: [
    "luca",
    "unescape",
    "microsoft 365",
    "essential apps",
    "xbox gamepass",
    "spotify",
    "social media",
    "security",
    "utility apps",
    "forza horizon",
    "kids apps",
  ],
  apprib: [
    "netflix",
    "whatsApp",
    "telegram",
    "facebook",
    "amazon prime",
    "office",
    "lightroom",
  ],
  gamerib: [
    "call of duty",
    "cyberpunk 2077",
    "minecraft",
    "battle field v",
    "far cry 5",
    "hitman 3",
    "residental evil",
  ],
  movrib: [
    "antman",
    "godzilla vs kong",
    "tom and jerry",
    "wrath of man",
    "john wick",
    "wonder woman 1984",
    "nobody",
  ],
};

const globalReducer = (state = defState, action) => {
  return state;
};

export default globalReducer;
