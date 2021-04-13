const get_airtable = require("../util/init_airtable");

const airtable = get_airtable('saved');

exports.handler = async (event, context) => {
    try{
        const {content} = JSON.parse(event.body);
        const res = await airtable.set(content);

        if(event)
        if(!content) {
            return {
                statusCode: 401, // bad request
                body: "No `content` query parameter found"
            }
        }

        console.log(res);
    
    }catch(err){
        console.error(err);
    }

    return {
        statusCode: 200,
        body: "Run"
    }
}
