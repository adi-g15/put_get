const Airtable = require("airtable-node");

module.exports = function (table_name) {
    return new Airtable({
        apiKey: process.env.AIRTABLE_API_KEY,
        base: 'appHu7WWKTo2lY0gL',
        table: table_name});
}
