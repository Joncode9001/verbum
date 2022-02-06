interface Translation {
    english: string,
    latin: string
}

type TranslationSet = {
    [key: string]: Translation
}

export const translations: TranslationSet = {
    "title": {
        "english": "Verbdum - A daily word game",
        "latin": "Verbdum - Ludus verborum cotidianus",
    },
    "htp-title": {
        "english": "HOW TO PLAY",
        "latin": "QUOMODO LUSUS EST",
    },
    "htp-1": {
        "english": "Guess the <b>VERBDUM</b> in 6 tries or fewer.",
        "latin": "Inveni <b>VERBDUM</b> sex conatis.",
    },
    "htp-2": {
        "english": "Each guess must be a five letter Latin word.",
        "latin": "Quodque verbum continet verbum Latīnum quinque litterarum.",
    },
    "htp-3": {
        "english": "After each guess, the color of the tiles will change to show how close your guess was to the word.",
        "latin": "Post quodque conatum, littera tingentur ut demonstrent partes rectas conati.",
    },
    "htp-ex": {
        "english": "Examples",
        "latin": "Exempla",
    },
    "htp-ex-1": {
        "english": "The letter A is in the word and in the right place.",
        "latin": "Littera A est in verbō et in locō propio.",
    },
    "htp-ex-2": {
        "english": "The letter T is in the word but not in the right place.",
        "latin": "Littera T est in verbō sed non in locō propio.",
    },
    "htp-ex-3": {
        "english": "The letter E is not in the word.",
        "latin": "Littera E est non in verbō.",
    },
    "htp-4": {
        "english": "There is a new <b>VERBDUM</b> each day or you can play past <b>VERBDUMs</b> in the archive.",
        "latin": "Est novum <b>VERBDUM</b> cotidiē vel <b>VERBDA</b> priora ludi possunt in archivis.",
    },
    "stat-title": {
        "english": "STATISTICS",
        "latin": "STATISTICAE",
    },
    "stat-played": {
        "english": "Played",
        "latin": "Lūsus Est",
    },
    "stat-win": {
        "english": "Win %",
        "latin": "% Victoriae",
    },
    "stat-cstreak": {
        "english": "Current Streak",
        "latin": "Ordo Hactenus",
    },
    "stat-mstreak": {
        "english": "Max Streak",
        "latin": "Ordo Maximus",
    },
    "stat-dist": {
        "english": "GUESS DISTRIBUTION",
        "latin": "DISTRIBŪTIО̄ CONATORUM",
    },
    "stat-next": {
        "english": "NEXT VERBDUM",
        "latin": "VERBDUM SEQUENS",
    },
    "current-lang": {
        "english": "English",
        "latin": "Latine",
    }
};