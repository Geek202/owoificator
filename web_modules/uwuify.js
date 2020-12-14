var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var utils = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUri = exports.InitModifierParam = exports.getCapitalPercentage = exports.getRandomInt = exports.getElement = void 0;
exports.getElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};
exports.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.getCapitalPercentage = function (input) {
    var totalLetters = 0;
    var upperLetters = 0;
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var currentLetter = input_1[_i];
        if (new RegExp(/^[a-zA-Z]+$/).test(currentLetter)) {
            totalLetters++;
            if (currentLetter === currentLetter.toUpperCase()) {
                upperLetters++;
            }
        }
    }
    return upperLetters / totalLetters;
};
exports.InitModifierParam = function () {
    return function (target, key) {
        var value = target[key];
        var sum = 0;
        var getter = function () { return value; };
        var setter = function (next) {
            if (typeof next === 'object') {
                sum = Object.values(next).reduce(function (a, b) { return a + b; });
            }
            if (next < 0 || sum < 0 || next > 1 || sum > 1) {
                throw new Error(key + " modifier value must be a number between 0 and 1");
            }
            value = next;
        };
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
};
function isUri(value) {
    if (!value)
        return false;
    // check for illegal characters
    if (/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(value))
        return false;
    // check for hex escapes that aren't complete
    if (/%[^0-9a-f]/i.test(value) || /%[0-9a-f](:?[^0-9a-f]|$)/i.test(value))
        return false;
    // directly from RFC 3986
    var split = value.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
    if (!split)
        return false;
    var _a = [split[1], split[2], split[3]], scheme = _a[0], authority = _a[1], path = _a[2];
    // scheme and path are required, though the path can be empty
    if (!(scheme && scheme.length && path.length >= 0))
        return false;
    // if authority is present, the path must be empty or begin with a /
    if (authority && authority.length) {
        if (!(path.length === 0 || /^\//.test(path)))
            return false;
    }
    else {
        // if authority is not present, the path must not start with //
        if (/^\/\//.test(path))
            return false;
    }
    // scheme must begin with a letter, then consist of letters, digits, +, ., or -
    if (!/^[a-z][a-z0-9\+\-\.]*$/.test(scheme.toLowerCase()))
        return false;
    return true;
}
exports.isUri = isUri;
});

var seed = createCommonjsModule(function (module, exports) {
// This random seed package was previously publicated on the Deno site as a standalone package but I've decided to just integrate it into the Uwuifier
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seed = void 0;
var Seed = /** @class */ (function () {
    function Seed(seed) {
        if (seed === void 0) { seed = ''; }
        this._seed = seed;
        this._seeder = this.generateSeeder(seed);
    }
    Seed.prototype.generateRange = function (value, min, max) {
        // Make sure the minimum and maximum values are correct
        if (min > max)
            throw new Error('The minimum value must be below the maximum value');
        else if (min === max)
            throw new Error('The minimum value cannot equal the maximum value');
        // Everything is run through the map value so if the defaults haven't changed just return
        else if (min === 0 && max === 1)
            return value;
        // Actually map the number range
        return ((value - 0) * (max - min)) / (1 - 0) + min;
    };
    Seed.prototype.generateSeeder = function (seed) {
        // https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
        // This is a seeded random generator
        // Returns a function which returns a value between 0 and 0xFFFFFFFF (32-bits)
        // Had to use a eslint ignore here since var has different scoping than let
        // tslint:disable-next-line
        for (var i = 0, h = 1779033703 ^ seed.length; i < seed.length; i++)
            (h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)), (h = (h << 13) | (h >>> 19));
        return function () {
            h = Math.imul(h ^ (h >>> 16), 2246822507);
            h = Math.imul(h ^ (h >>> 13), 3266489909);
            return (h ^= h >>> 16) >>> 0;
        };
    };
    Object.defineProperty(Seed.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (seed) {
            // If the seed hasn't changed just return
            if (this._seed === seed)
                return;
            this._seed = seed;
            this._seeder = this.generateSeeder(seed);
        },
        enumerable: false,
        configurable: true
    });
    Seed.prototype.random = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        // Use the default sfc32 random generator
        return this.generateRange(this.sfc32(), min, max);
    };
    Seed.prototype.randomInt = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        return Math.round(this.random(min, max));
    };
    Seed.prototype.sfc32 = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        var a = this._seeder();
        var b = this._seeder();
        var c = this._seeder();
        var d = this._seeder();
        a >>>= 0;
        b >>>= 0;
        c >>>= 0;
        d >>>= 0;
        var t = (a + b) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        d = (d + 1) | 0;
        t = (t + d) | 0;
        c = (c + t) | 0;
        return this.generateRange((t >>> 0) / 4294967296, min, max);
    };
    Seed.prototype.mulberry32 = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        var a = this._seeder();
        var t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return this.generateRange(((t ^ (t >>> 14)) >>> 0) / 4294967296, min, max);
    };
    Seed.prototype.jsf32 = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        var a = this._seeder();
        var b = this._seeder();
        var c = this._seeder();
        var d = this._seeder();
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        // Using eslint here since this stolen code is definitely not optimized for readability
        // tslint:disable-next-line
        var t = (a - ((b << 27) | (b >>> 5))) | 0;
        a = b ^ ((c << 17) | (c >>> 15));
        b = (c + d) | 0;
        c = (d + t) | 0;
        d = (a + t) | 0;
        return this.generateRange((d >>> 0) / 4294967296, min, max);
    };
    Seed.prototype.xoshiro128 = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        var a = this._seeder();
        var b = this._seeder();
        var c = this._seeder();
        var d = this._seeder();
        // Using eslint here since this stolen code is definitely not optimized for readability
        // tslint:disable-next-line
        var t = b << 9, r = a * 5;
        r = ((r << 7) | (r >>> 25)) * 9;
        c ^= a;
        d ^= b;
        b ^= c;
        a ^= d;
        c ^= t;
        d = (d << 11) | (d >>> 21);
        return this.generateRange((r >>> 0) / 4294967296, min, max);
    };
    return Seed;
}());
exports.Seed = Seed;
});

var dist = createCommonjsModule(function (module, exports) {
var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uwuifier = void 0;


var Uwuifier = /** @class */ (function () {
    function Uwuifier(_a) {
        var _b = _a === void 0 ? {
            spaces: { faces: 0.05, actions: 0.075, stutters: 0.1 },
            words: 1,
            exclamations: 1
        } : _a, _c = _b.spaces, spaces = _c === void 0 ? { faces: 0.05, actions: 0.075, stutters: 0.1 } : _c, _d = _b.words, words = _d === void 0 ? 1 : _d, _e = _b.exclamations, exclamations = _e === void 0 ? 1 : _e;
        this.faces = ["(\u30FB`\u03C9\u00B4\u30FB)", ";;w;;", "owo", "UwU", ">w<", "^w^", "\u00DAw\u00DA", ":3", "x3"];
        this.exclamations = ["?!!", "?!?1", "!!11", "?!?!", "!?"];
        this.actions = [
            "*blushes*",
            "*whispers to self*",
            "*sweats*",
            "*sees buldge*",
            "*runs away*",
            "*huggles tightly*",
            "*boops your nose*",
            "*starts twerking*"
        ];
        this.uwuMap = [
            [/(?:r|l)/g, "w"],
            [/(?:R|L)/g, "W"],
            [/n([aeiou])/g, "ny$1"],
            [/N([aeiou])/g, "Ny$1"],
            [/N([AEIOU])/g, "Ny$1"],
            [/ove/g, "uv"]
        ];
        this._spacesModifier = spaces || {
            faces: 0.05,
            actions: 0.075,
            stutters: 0.1
        };
        this._wordsModifier = words || 1;
        this._exclamationsModifier = exclamations || 1;
    }
    Uwuifier.prototype.uwuifyWords = function (sentence) {
        var _this = this;
        var words = sentence.split(" ");
        var uwuifiedSentence = words
            .map(function (word) {
            if (utils.isUri(word))
                return word;
            var seed$1 = new seed.Seed(word);
            for (var _i = 0, _a = _this.uwuMap; _i < _a.length; _i++) {
                var _b = _a[_i], oldWord = _b[0], newWord = _b[1];
                // Generate a random value for every map so words will be partly uwuified instead of not at all
                if (seed$1.random() > _this._wordsModifier)
                    continue;
                word = word.replace(oldWord, newWord);
            }
            return word;
        })
            .join(' ');
        return uwuifiedSentence;
    };
    Uwuifier.prototype.uwuifySpaces = function (sentence) {
        var _this = this;
        var words = sentence.split(" ");
        var faceThreshold = this._spacesModifier.faces;
        var actionThreshold = this._spacesModifier.actions + faceThreshold;
        var stutterThreshold = this._spacesModifier.stutters + actionThreshold;
        var uwuifiedSentence = words
            .map(function (word, index) {
            var seed$1 = new seed.Seed(word);
            var random = seed$1.random();
            var firstCharacter = word[0];
            if (random <= faceThreshold && _this.faces) {
                // Add random face before the word
                word += ' ' + _this.faces[seed$1.randomInt(0, _this.faces.length - 1)];
                checkCapital();
            }
            else if (random <= actionThreshold && _this.actions) {
                // Add random action before the word
                word += ' ' + _this.actions[seed$1.randomInt(0, _this.actions.length - 1)];
                checkCapital();
            }
            else if (random <= stutterThreshold && !utils.isUri(word)) {
                // Add stutter with a length between 0 and 2
                var stutter = seed$1.randomInt(0, 2);
                return (firstCharacter + '-').repeat(stutter) + word;
            }
            function checkCapital() {
                // Check if we should remove the first capital letter
                if (firstCharacter !== firstCharacter.toUpperCase())
                    return;
                // if word has higher than 50% upper case
                if (utils.getCapitalPercentage(word) > 0.5)
                    return;
                // If it's the first word
                if (index === 0) {
                    // Remove the first capital letter
                    word = firstCharacter.toLowerCase() + word.slice(1);
                }
                else {
                    var previousWord = words[index - 1];
                    var previousWordLastChar = previousWord[previousWord.length - 1];
                    var prevWordEndsWithPunctuation = new RegExp('[.!?\\-]').test(previousWordLastChar);
                    if (!prevWordEndsWithPunctuation)
                        return;
                    word = firstCharacter.toLowerCase() + word.slice(1);
                }
            }
            return word;
        })
            .join(' ');
        return uwuifiedSentence;
    };
    Uwuifier.prototype.uwuifyExclamations = function (sentence) {
        var _this = this;
        var words = sentence.split(" ");
        var pattern = new RegExp('[?!]+$');
        var uwuifiedSentence = words
            .map(function (word) {
            var seed$1 = new seed.Seed(word);
            // If there are no exclimations return
            if (!pattern.test(word) || seed$1.random() > _this._exclamationsModifier)
                return word;
            word = word.replace(pattern, "");
            word += _this.exclamations[seed$1.randomInt(0, _this.exclamations.length - 1)];
            return word;
        })
            .join(' ');
        return uwuifiedSentence;
    };
    Uwuifier.prototype.uwuifySentence = function (sentence) {
        var uwuifiedString = sentence;
        uwuifiedString = this.uwuifyWords(uwuifiedString);
        uwuifiedString = this.uwuifyExclamations(uwuifiedString);
        uwuifiedString = this.uwuifySpaces(uwuifiedString);
        return uwuifiedString;
    };
    __decorate([
        utils.InitModifierParam()
    ], Uwuifier.prototype, "_spacesModifier", void 0);
    __decorate([
        utils.InitModifierParam()
    ], Uwuifier.prototype, "_wordsModifier", void 0);
    __decorate([
        utils.InitModifierParam()
    ], Uwuifier.prototype, "_exclamationsModifier", void 0);
    return Uwuifier;
}());
exports.Uwuifier = Uwuifier;
});

// uwuify
// By BadBoyHaloCat
// 
// Copyright (C) 2020  Logan Devine
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
// Import Uwuifier

// Due to the way uwuify is built, we use
// a class called "uwuifier" to store the
// main infrastructure.
var uwuifier = /** @class */ (function () {
    // Now we have the main constructor used for
    // the actual creation
    function uwuifier() {
        // Create the uwuifier
        this._uwuifier = new dist.Uwuifier();
        // INSERTIONS
        // Uwuifier has built in items that we want to
        // modify.
        // Place our actions into this uwuifier instance
        this._uwuifier.actions = [
            '*blushes*',
            '*cries*',
            '*screams*',
            '*sweats*',
            '*sees bulge*',
            '*thinks about your bulge*',
            '*runs away*',
            '*hugs*',
            '*huggles tightly*',
            '*boops your nose*',
            '*twerks*',
            '*starts twerking*',
            '*screams*',
            '*walks away*',
            '*looks at you*',
            '*cries*',
            '*screeches*',
            '*pounces on you*',
            '*eats*',
            '*boops self*'
        ];
        // Place in our faces instead of the Uwuifier ones
        this._uwuifier.faces = [
            ':3',
            'x3',
            'owo',
            'OwO',
            'uwu',
            'UwU',
            '^-^',
            '^_^'
        ];
        // Custom exclamations too!
        this._uwuifier.exclamations = [
            '!',
            '!?',
            '?!',
            '!??',
            '??!',
            '?!?',
            '!?!?!?!??!?',
            '??!!',
            '!11!!'
        ];
    }
    uwuifier.prototype.uwuify = function (text) {
        return this._uwuifier.uwuifySentence(text);
    };
    return uwuifier;
}());
var uwuify = uwuifier;

export default uwuify;
