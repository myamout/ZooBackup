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


const animal_index = {
    index: 'animals',
    body: {
        'settings': {
            'number_of_shards': 1
        },
        'mappings': {
            'animal': {
                'properties': {
                    'name': { type: 'text', fielddata: true},
                    'identification': { type: 'integer'},
                    'age': { type: 'integer'},
                    'animal_type': { type: 'text', fielddata: true},
                    'animal_food': { type: 'text', fielddata: true},
                    'animal_health': { type: 'text', fielddata: true},
                    'animal_gender': { type: 'text', fielddata: true}
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

client.indices.create(animal_index, ((err, response) => {
    if (err) {
        console.log(err);
    } else {
        console.log(response);
    }
}));

client.bulk({
    body: [
        { index: { _index: 'animals', _type: 'animal', _id: 1} },
        {
            name: 'Logan',
            identification: 1,
            age: 22,
            animal_type: 'Tiger',
            animal_food: 'Meat',
            animal_health: 'Healthy',
            animal_gender: 'Male'
        },
        { index: { _index: 'animals', _type: 'animal', _id: 2} },
        {
            name: 'Steph',
            identification: 2,
            age: 22,
            animal_type: 'Tiger',
            animal_food: 'Meat',
            animal_health: 'Healthy',
            animal_gender: 'Female'
        },
        { index: { _index: 'animals', _type: 'id_count', _id: 1} },
        {
            count: 2
        }
    ]
}, ((err, response) => {
    if (err) {
        console.log(err);
    } else {
        console.log(response);
    }
}));
