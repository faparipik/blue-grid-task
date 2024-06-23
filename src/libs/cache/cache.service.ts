import NodeCache, { Key } from "node-cache";

const cache = new NodeCache({ stdTTL: 0 });

export default {
  get: <T>(key: Key) => cache.get<T>(key),
  set: <T>(key: Key, value: T, ttl?: number | string) =>
    cache.set<T>(key, value, ttl as number | string),
};
