const fs = require('fs');
const contentBase = require('../../config').contentDir;

const resolvers = {
  Query: {
    config(obj, args, context) {
      const result = { pairs: [] };
      let path = null;
      const locale = args.locale || null;
      const topic = args.topic || null;
      if (locale === null && topic === null) {
        path = `${contentBase}/config.json`;
      } else if (locale === null && topic !== null) {
        path = `${contentBase}/topics/${topic}/config.json`;
      } else if (locale !== null && topic === null) {
        path = `${contentBase}/jurisdictions/${locale}/config.json`;
      } else if (locale !== null && topic !== null) {
        path = `${contentBase}/jurisdictions/${locale}/${topic}/config.json`;
      }
      if (path !== null && fs.existsSync(path)) {
        const c = JSON.parse(fs.readFileSync(path));
        for (const nm in c) {
          if (c.hasOwnProperty(nm)) {
            const pair = { name: null, value: null };
            pair.name = nm;
            pair.value = c[nm];
            result.pairs.push(pair);
          }
        }
      }
      return result;
    },
  },
  Mutation: {
    updateConfig(obj, args) {
      console.log(JSON.stringify(args));
      let path = null;
      const locale = args.locale || null;
      const topic = args.topic || null;

      if (locale === null && topic === null) {
        path = `${contentBase}/config.json`;
      } else if (locale === null && topic !== null) {
        path = `${contentBase}/topics/${topic}/config.json`;
      } else if (locale !== null && topic === null) {
        path = `${contentBase}/jurisdictions/${locale}/config.json`;
      } else if (locale !== null && topic !== null) {
        path = `${contentBase}/jurisdictions/${locale}/${topic}/config.json`;
      }
      if (path !== null && fs.existsSync(path)) {
        const content = JSON.stringify({ pairs: args.content.pairs });
        console.log(`Writing it out: ${content}`);
        fs.writeFileSync(path, content);
      }
      return args.content;
    },
  },
  NameValuePair: {
    name(obj, args, context) { return obj.name; },
    value(obj, args, context) { return obj.value; },
  },
  Configuration: {
    pairs(obj, args, context) { return obj.pairs; },
  },
};

module.exports = resolvers;
