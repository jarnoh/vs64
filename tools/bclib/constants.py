"""Constants."""


class Constants:
    """Global constants."""

    DEBUG_MODE = False

    BASIC_START_ADDR = 0x0801

    BASIC_TOKENS = {
        "END": 0x80,
        "FOR": 0x81,
        "NEXT": 0x82,
        "DATA": 0x83,
        "INPUT#": 0x84,
        "INPUT": 0x85,
        "DIM": 0x86,
        "READ": 0x87,
        "LET": 0x88,
        "GOTO": 0x89,
        "RUN": 0x8A,
        "IF": 0x8B,
        "RESTORE": 0x8C,
        "GOSUB": 0x8D,
        "RETURN": 0x8E,
        "REM": 0x8F,
        "STOP": 0x90,
        "ON": 0x91,
        "WAIT": 0x92,
        "LOAD": 0x93,
        "SAVE": 0x94,
        "VERIFY": 0x95,
        "DEF": 0x96,
        "POKE": 0x97,
        "PRINT#": 0x98,
        "PRINT": 0x99,
        "CONT": 0x9A,
        "LIST": 0x9B,
        "CLR": 0x9C,
        "CMD": 0x9D,
        "SYS": 0x9E,
        "OPEN": 0x9F,
        "CLOSE": 0xA0,
        "GET": 0xA1,
        "NEW": 0xA2,
        "TAB(": 0xA3,
        "TO": 0xA4,
        "FN": 0xA5,
        "SPC(": 0xA6,
        "THEN": 0xA7,
        "NOT": 0xA8,
        "STEP": 0xA9,
        "+": 0xAA,
        "-": 0xAB,
        "*": 0xAC,
        "/": 0xAD,
        "^": 0xAE,
        "AND": 0xAF,
        "OR": 0xB0,
        ">": 0xB1,
        "=": 0xB2,
        "<": 0xB3,
        "SGN": 0xB4,
        "INT": 0xB5,
        "ABS": 0xB6,
        "USR": 0xB7,
        "FRE": 0xB8,
        "POS": 0xB9,
        "SQR": 0xBA,
        "RND": 0xBB,
        "LOG": 0xBC,
        "EXP": 0xBD,
        "COS": 0xBE,
        "SIN": 0xBF,
        "TAN": 0xC0,
        "ATN": 0xC1,
        "PEEK": 0xC2,
        "LEN": 0xC3,
        "STR$": 0xC4,
        "VAL": 0xC5,
        "ASC": 0xC6,
        "CHR$": 0xC7,
        "LEFT$": 0xC8,
        "RIGHT$": 0xC9,
        "MID$": 0xCA,
        "GO": 0xCB,
        "PI": 0xFF
    }

    TSB_TOKENS = {

        "HIRES": 1,
        "PLOT": 2,
        "LINE": 3,
        "BLOCK": 4,
        "FCHR": 5,
        "FCOL": 6,
        "FILL": 7,
        "REC": 8,
        "ROT": 9,
        "DRAW": 10,
        "CHAR": 11,
        "HI COL": 12,
        "INV": 13,
        "FRAC": 14,
        "MOVE": 15,
        "PLACE": 16,
        "UPB": 17,
        "UPW": 18,
        "LEFTW": 19,
        "LEFTB": 20,
        "DOWNB": 21,
        "DOWNW": 22,
        "RIGHTB": 23,
        "RIGHTW": 24,
        "MULTI": 25,
        "COLOUR": 26,
        "MMOB": 27,
        "BFLASH": 28,
        "MOB SET": 29,
        "MUSIC": 30,
        "FLASH": 31,
        "REPEAT": 32,
        "PLAY": 33,
        "DO": 34,
        "CENTRE": 35,
        "ENVELOPE": 36,
        "CGOTO": 37,
        "WAVE": 38,
        "FETCH": 39,
        "AT": 40,
        "UNTIL": 41,
        "*": 42,
        "+": 43,
        "USE": 44,
        "-": 45,
        "GLOBAL": 46,
        "/": 47,
        "RESET": 48,
        "PROC": 49,
        "CALL": 50,
        "EXEC": 51,
        "END PROC": 52,
        "EXIT": 53,
        "END LOOP": 54,
        "ON KEY": 55,
        "DISABLE": 56,
        "RESUME": 57,
        "LOOP": 58,
        "DELAY": 59,
        "CLS": 60,
        "X!": 61,
        "MAP": 62,
        ">": 63,
        "SECURE": 64,
        "DISAPA": 65,
        "CIRCLE": 66,
        "ON ERROR": 67,
        "NO ERROR": 68,
        "LOCAL": 69,
        "RCOMP": 70,
        "ELSE": 71,
        "RETRACE": 72,
        "TRACE": 73,
        "DIR": 74,
        "PAGE": 75,
        "DUMP": 76,
        "FIND": 77,
        "OPTION": 78,
        "AUTO": 79,
        "OLD": 80,
        "JOY": 81,
        "MOD": 82,
        "DIV": 83,
        "D!": 84,
        "DUP": 85,
        "INKEY": 86,
        "INST": 87,
        "TEST": 88,
        "LIN": 89,
        "EXOR": 90,
        "INSERT": 91,
        "POT": 92,
        "PENX": 93,
        "^": 94,
        "PENY": 95,
        "SOUND": 96,
        "GRAPHICS": 97,
        "DESIGN": 98,
        "RLOCMOB": 99,
        "CMOB": 100,
        "BCKGNDS": 101,
        "PAUSE": 102,
        "NRM": 103,
        "MOB": 104,
        "OFF": 105,
        "ANGL": 106,
        "ARC": 107,
        "COLD": 108,
        "SCRSV": 109,
        "SCRLD": 110,
        "TEXT": 111,
        "CSET": 112,
        "VOL": 113,
        "DISK": 114,
        "HRDCPY": 115,
        "KEY": 116,
        "PAINT": 117,
        "LOW COL": 118,
        "COPY": 119,
        "MERGE": 120,
        "RENUMBER": 121,
        "MEM": 122,
        "DETECT": 123,
        "CHECK": 124,
        "DISPLAY": 125,
        "ERR": 126,
        "OUT": 127
    }

    CONTROL_TOKENS = {
        "null": 0,
        "nul": 0,
        "space": 32,
        "return": 13,
        "shift-return": 141,
        "clr": 147,
        "clear": 147,
        "home": 19,
        "del": 20,
        "inst": 148,
        "run/stop": 3,

        "upper": 142,
        "uppercase": 142,
        "cset0": 142,
        "lower": 14,
        "lowercase": 14,
        "cset1": 14,

        "cursor right": 29,
        "crsr right": 29,
        "cursor left": 157,
        "crsr left": 157,
        "cursor down": 17,
        "crsr down": 17,
        "cursor up": 145,
        "crsr up": 145,

        "black": 144,
        "blk": 144,
        "white": 5,
        "wht": 5,
        "red": 28,
        "cyan": 159,
        "cyn": 159,
        "purple": 156,
        "pur": 156,
        "green": 30,
        "grn": 30,
        "blue": 31,
        "blu": 31,
        "yellow": 158,
        "yel": 158,
        "orange": 129,
        "brown": 149,
        "pink": 150,
        "light-red": 150,
        "gray1": 151,
        "darkgrey": 151,
        "grey": 152,
        "lightgreen": 153,
        "lightblue": 154,
        "grey3": 155,
        "lightgrey": 155,

        "rvs on": 18,
        "rvs off": 146,

        "f1": 133,
        "f3": 134,
        "f5": 135,
        "f7": 136,
        "f2": 137,
        "f4": 138,
        "f6": 139,
        "f8": 140,

        "ctrl-c": 3,
        "ctrl-e": 5,
        "ctrl-h": 8,
        "ctrl-i": 9,
        "ctrl-m": 13,
        "ctrl-n": 14,
        "ctrl-r": 18,
        "ctrl-s": 19,
        "ctrl-t": 20,
        "ctrl-q": 17,

        "ctrl-1": 144,
        "ctrl-2": 5,
        "ctrl-3": 28,
        "ctrl-4": 159,
        "ctrl-5": 156,
        "ctrl-6": 30,
        "ctrl-7": 31,
        "ctrl-8": 158,
        "ctrl-9": 18,
        "ctrl-0": 146,
        "ctrl-/": 142,

        "c=1": 129,
        "c=2": 149,
        "c=3": 150,
        "c=4": 151,
        "c=5": 152,
        "c=6": 153,
        "c=7": 154,
        "c=8": 155,
    }
