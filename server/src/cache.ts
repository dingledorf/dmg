import NodeCache from "node-cache";

const cache = new NodeCache({stdTTL: 60}) // standard TTL 1 minute

module.exports = cache;