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
                    'animal_health': {type: 'integer'},
                    'animal_gender': { type: 'text', fielddata: true},
                    'animal_origin': { type: 'text', fielddata: true},
                    'animal_weight': { type: 'integer'},
                    'animal_enclosure_id': { type: 'integer'},
                    'animal_size': { type: 'text', fielddata: true}
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
        { index: { _index: 'animals', _type: 'animal', _id: 1}},
        {
            name: 'Stripey',
            identification: 1,
            age: 3,
            animal_type: 'Tiger',
            animal_food: 'Beef',
            animal_health: 10,
            animal_gender: 'M',
            animal_origin: 'Asia',
            animal_weight: 270,
            animal_enclosure_id: 0,
            animal_size: 'M'
        },
        { index: { _index: 'animals', _type: 'animal', _id: 2}},
        {
            name: 'Max',
            identification: 2,
            age: 12,
            animal_type: 'Tiger',
            animal_food: 'Beef',
            animal_health: 4,
            animal_gender: 'M',
            animal_origin: 'Asia',
            animal_weight: 500,
            animal_enclosure_id: 0,
            animal_size: 'M'
        },
        { index: { _index: 'animals', _type: 'animal', _id: 3}},
        {
            name: 'Conga',
            identification: 3,
            age: 5,
            animal_type: 'Tiger',
            animal_food: 'Beef',
            animal_health: 8,
            animal_gender: 'F',
            animal_origin: 'Asia',
            animal_weight: 280,
            animal_enclosure_id: 0,
            animal_size: 'M'
        },
        { index: { _index: 'animals', _type: 'animal', _id: 4}},
        {
            name: 'Jake',
            identification: 4,
            age: 3,
            animal_type: 'Tiger',
            animal_food: 'Beef',
            animal_health: 7,
            animal_gender: 'M',
            animal_origin: 'Asia',
            animal_weight: 300,
            animal_enclosure_id: 0,
            animal_size: 'M'
        },
        { index: { _index: 'animals', _type: 'animal', _id: 5}},
        {
            name: 'Boxer',
            identification: 5,
            age: 10,
            animal_type: 'Tiger',
            animal_food: 'Beef',
            animal_health: 1,
            animal_gender: 'M',
            animal_origin: 'Asia',
            animal_weight: 240,
            animal_enclosure_id: 0,
            animal_size: 'M'
        }
    ]
}, ((err, response) => {
    if (err) {
        console.log(err);
    } else {
        console.log(response);
    }
}));

client.bulk({
    body: [
        { index: { _index: 'animals', _type: 'animal', _id: 6}},
        {
            name: 'Pointy',
            identification: 6,
            age: 3,
            animal_type: 'Gray Wolf',
            animal_food: 'Beef',
            animal_health: 5,
            animal_gender: 'M',
            animal_origin: 'North America',
            animal_weight: 100,
            animal_enclosure_id: 1,
            animal_size: 'M'
        },
        { index: { _index: 'animals', _type: 'animal', _id: 7}},
        {
            name: 'Mark',
            identification: 7,
            age: 7,
            animal_type: 'Gray Wolf',
            animal_food: 'Beef',
            animal_health: 8,
            animal_gender: 'M',
            animal_origin: 'North America',
            animal_weight: 165,
            animal_enclosure_id: 1,
            animal_size: 'M'
        },{ index: { _index: 'animals', _type: 'animal', _id: 8}},
        {
            name: 'Barb',
            identification: 8,
            age: 1,
            animal_type: 'Gray Wolf',
            animal_food: 'Beef',
            animal_health: 8,
            animal_gender: 'F',
            animal_origin: 'North America',
            animal_weight: 62,
            animal_enclosure_id: 1,
            animal_size: 'M'
        },
        { index: { _index: 'animals', _type: 'animal', _id: 9}},
        {
            name: 'Matt',
            identification: 9,
            age: 3,
            animal_type: 'Gray Wolf',
            animal_food: 'Beef',
            animal_health: 9,
            animal_gender: 'M',
            animal_origin: 'North America',
            animal_weight: 113,
            animal_enclosure_id: 1,
            animal_size: 'M'
        },
        { index: { _index: 'animals', _type: 'animal', _id: 3} },
        {
            name: 'Conga',
            identification: 3,
            age: 5,
            animal_type: 'Tiger',
            animal_food: 'Beef',
            animal_health: 8,
            animal_gender: 'F',
            animal_origin: 'Asia',
            animal_weight: 280,
            animal_enclosure_id: 0,
            animal_size: 'M'
        },



        { index: { _index: 'animals', _type: 'id_count', _id: 1} },
        {
            count: 9
        }
    ]
}, ((err, response) => {
    if (err) {
        console.log(err);
    } else {
        console.log(response);
    }
}));
