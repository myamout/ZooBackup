import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
    host: 'localhost:9200'
});

client.ping({
    requestTimeout: 2000
}, ((error) => {
    if (error) {
        console.log('[-] Could not connect to Elastic Cluster at localhost:9200');
    } else {
        console.log('[+] Connected to Elastic Cluster at localhost:9200');
    }
}));


const inventory_index = {
    index: 'inventory',
    body: {
        'settings': {
            'number_of_shards': 1
        },
        'mappings': {
            'foods': {
                'properties': {
                    'food_type': { type: 'text', fielddata: true},
                    'food_amount': { type: 'text', fielddata: true},
                    'location': { type: 'text', fielddata: true}
                }
            },
            'id_count': {
                'properties': {
                    'count': { type: 'integer'}
                }
            }
        }
    }
}

client.indices.create(inventory_index, ((err, response) => {
    if (err) {
        console.log(err);
    } else {
        console.log(response);
    }
}));

client.bulk({
    body: [
        { index: { _index: 'inventory', _type: 'foods', _id: 1} },
        {
            food_type: 'Meat',
            food_amount: 100,
            location: '3R4C'
        },
        { index: {_index: 'inventory', _type: 'id_count', _id: 2}},
        {
            count: 1
        }
    ]
}, ((err, response) => {
    if (err) {
        console.log(err);
    } else {
        console.log(response);
    }
}));
