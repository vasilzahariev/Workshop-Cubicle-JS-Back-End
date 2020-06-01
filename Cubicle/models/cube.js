const uuid = require('uuid').v4;
const fs = require('fs');
const path = require('path');

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = uuid();
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficulty = difficulty;
    }

    save() {
        const filePath = path.join(__dirname, path.normalize('../config/database.json'));
        const data = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        }

        const db = JSON.parse(fs.readFileSync(filePath));

        db.push(data);

        fs.writeFileSync(filePath, JSON.stringify(db));
    }
}

const test = new Cube('Test', 'Test Desc', 'www.google.com', 7);
const test2 = new Cube('Test2', 'Test Desc', 'www.google.com', 7);

test.save();
test2.save();

module.exports = Cube;
