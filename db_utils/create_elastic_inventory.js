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
            food_type: 'Beef',
            food_amount: 120,
            location: 'R1C3'
        },
        { index: { _index: 'inventory', _type: 'foods', _id: 2} },
        {
            food_type: 'Grass',
            food_amount: 50,
            location: 'R2C7'
        },
        { index: { _index: 'inventory', _type: 'foods', _id: 3} },
        {
            food_type: 'Berries',
            food_amount: 15,
            location: 'R3C5'
        },
        { index: { _index: 'inventory', _type: 'foods', _id: 4} },
        {
            food_type: 'Deer',
            food_amount: 20,
            location: 'R1C8'
        },
        { index: { _index: 'inventory', _type: 'foods', _id: 5} },
        {
            food_type: 'Nuts',
            food_amount: 20,
            location: 'R3C1'
        },
        { index: { _index: 'inventory', _type: 'foods', _id: 6} },
        {
            food_type: 'Bananas',
            food_amount: 45,
            location: 'R3C3'
        },
        { index: { _index: 'inventory', _type: 'foods', _id: 7} },
        {
            food_type: 'Leaves',
            food_amount: 80,
            location: 'R2C4'
        },
        { index: {_index: 'inventory', _type: 'id_count', _id: 2}},
        {
            count: 7
        }
    ]
}, ((err, response) => {
    if (err) {
        console.log(err);
    } else {
        console.log(response);
    }
}));
