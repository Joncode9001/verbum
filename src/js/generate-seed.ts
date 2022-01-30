//https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function xmur3(str: string): () => number {
    let h = 1779033703 ^ str.length;
    for(let i = 0; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
    } return function() {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

function sfc32(a, b, c, d) {
    return function() {
        a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
        let t = (a + b) | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        d = d + 1 | 0;
        t = t + d | 0;
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
}

let seedMaker = xmur3("");
let currentRNG = sfc32(seedMaker(), seedMaker(), seedMaker(), seedMaker());

export function setSeed(seed: string) {
    seedMaker = xmur3(seed);
    currentRNG = sfc32(seedMaker(), seedMaker(), seedMaker(), seedMaker());
}

export function getRNGInRange(min: number, max: number) {
    let rng = currentRNG();
    let diff = max - min;
    return min + Math.round(diff * rng);
}