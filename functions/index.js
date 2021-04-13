const get_airtable = require("../util/init_airtable");

const airtable = get_airtable('saved');

const PRIMARY_COLUMN_NAME = 'Content';

exports.handler = async (event, context) => {
    const {records} = await airtable.list();

    console.log(event);

    const record_list = records.map(rec => {
        console.log(rec);
        return rec.fields[PRIMARY_COLUMN_NAME]
    });
    return {
        statusCode: 200,
        body: JSON.stringify(record_list)
    };
}
