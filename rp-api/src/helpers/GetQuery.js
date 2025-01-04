/**
 * @description GetQuery helper function
 * @param {Object} data
 * @returns {String} query
 */

export default (data) => {
  return Object.keys(data)
    .map((key) => ` @${key}=:${key}`)
    .join(",");
};
