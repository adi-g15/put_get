const get_airtable = require("../util/init_airtable");

const airtable = get_airtable('saved');

const PRIMARY_COLUMN_NAME = 'Content';

exports.handler = async (event, context) => {
    const {records} = await airtable.list();

    const record_list = records.map(rec => ({
        id: rec.id,
        content: rec.fields[PRIMARY_COLUMN_NAME],
        createdAt: rec.createdTime
    }));
    return {
        statusCode: 200,
        body: JSON.stringify(record_list)
    };
}
