const get_airtable = require("../util/init_airtable");

const airtable = get_airtable('saved');

exports.handler = async (event, context) => {
    const { id } = event.queryStringParameters;

    if(event.httpMethod !== 'DELETE') {
        return {
            statusCode: 405 // Method Not Allowed
        }
    }

    if (!id) {
        return {
            statusCode: 400,
        };
    }

    try {
        await airtable.delete(id);

        return {
            statusCode: 204
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500.
        }
    }
}
