const N_BUILDINGS = 5;

const addBuildings = () => {
    for (let i = 0; i < N_BUILDINGS; ++i) {
        const x = randomInt(0, WIDTH);
        addBuilding(x);
    }
    buildings.sort((b1, b2) => b1.left > b2.left);
}

const addBuilding = (x) => {
    const h = randomInt(10, HEIGHT / 2);
    const w = randomInt(10, (WIDTH - x) / 2);
    buildings.push(new Building(x, x + w, h));
}