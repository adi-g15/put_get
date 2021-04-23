const fetch = require("node-fetch");

const PRIMARY_COLUMN_NAME = 'Content';
exports.handler = async (event, context) => {
    if(event.httpMethod !== 'POST') {
        return {
            statusCode: 405 // Method Not Allowed
        }
    }

    try{
        const {content} = JSON.parse(event.body);

        if(!content) {
            return {
                statusCode: 401, // bad request
                body: "No `content` query parameter found"
            }
        }

        const {id, createdTime: createdAt} = await fetch(`https://api.airtable.com/v0/appHu7WWKTo2lY0gL/saved`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                records: [
                    {
                        fields: {
                            "Content": content
                        }
                    }
                ]
            })
        }).then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw Error(res.statusText || res.status);
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify({id, createdAt})
        };
        
    }catch(err){
        console.error(err);
        return {
            statusCode: 500
        }
    }
}
