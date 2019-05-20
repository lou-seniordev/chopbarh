import keys from "./keys";

export default {
  apiService: `https://${keys.apiKeyPrefix}.gamesparks.net/rs/debug/${
    keys.apiKeySuffix
  }/LogEventRequest`
};
