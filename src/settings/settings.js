//
// Settings
//

const path = require('path');
const os = require('os');
const fs = require('fs');

//-----------------------------------------------------------------------------------------------//
// Init module
//-----------------------------------------------------------------------------------------------//
// eslint-disable-next-line
BIND(module);

//-----------------------------------------------------------------------------------------------//
// Required Modules
//-----------------------------------------------------------------------------------------------//
const { Utils } = require('utilities/utils');
const { Logger, LogLevel } = require('utilities/logger');

const logger = new Logger("Settings");

//-----------------------------------------------------------------------------------------------//
// Constants
//-----------------------------------------------------------------------------------------------//

const Constants = {
    BinaryMonitorPort: 6502,
    ProjectConfigFile: "project-config.json",
    SupportedLanguageIds: [ "asm", "s", "c", "cpp", "h", "hpp", "cc", "hh", "bas", "res", "raw", "spm", "properties" ],
    AssemblerLanguageId: "asm",
    BasicLanguageId: "bas",
    DebuggerType6502: "6502",
    DebuggerTypeVice: "vice",
    DebuggerTypeX16: "x16",
    CppStandard: "c++20",
    AlwaysShowOutputChannel: false,
    ProgramAddressCorrection: true,
    AutoBuildDelayMs: 1250,
    ResourceFileFilter: "|res|raw|spm|spd|ctm|sid|wav|png|koa|kla|",
    CppFileFilter: "|c|cpp|cc|",
    CppOnlyFileFilter: "|cpp|cc|",
    COnlyFileFilter: "|c|",
    AsmFileFilter: "|s|asm|",
    BasicFileFilter: "|bas|",
    ObjFileFilter: "|o|obj|",
    BasicInterpreterLoopRoutine: 0xa7e4,    // default adress of vector $308-309
    BasicInterpreterBreakRoutine: 0xa84b,   // when END is called
    BasicInterpreterErrorRoutine: 0xa437,
    BasicInterpreterListRoutine: 0xa69c,    // when LIST is called
    TSBInterpreterLoopRoutine: 0x80e8,
    TSBInterpreterErrorRoutine: 0x839c,     // TSC modified BASIC vector at $300/$301
    BasicCharset1: "big/graphics",          // used in settings
    BasicCharset2: "small/big"              // used in settings

};

const AnsiColors = {
    Reset: 0,
    Bold: 1,
    Underline: 4,
    Reverse: 7,

    Foreground: 0,
    Background: 10,

    Black: 30,
    Red: 31,
    Green: 32,
    Yellow: 33,
    Blue: 34,
    Magenta: 35,
    Cyan: 36,
    LightGrey: 37,

    DarkGrey: 90,
    LightRed: 91,
    LightGreen: 92,
    LightYellow: 93,
    LightBlue: 94,
    LightMagenta: 95,
    LightCyan: 96,
    White: 97
};

const AssemblerOpcodes = [
    "ADC","AND","ASL","BCC","BCS","BEQ","BIT","BMI","BNE","BPL",
    "BRK","BVC","BVS","CLC","CLD","CLI","CLV","CMP","CPX","CPY",
    "DEC","DEX","DEY","EOR","INC","INX","INY","JMP","JSR","LDA",
    "LDX","LDY","LSR","NOP","ORA","PHA","PHP","PLA","PLP","ROL",
    "ROR","RTI","RTS","SBC","SEC","SED","SEI","STA","STX","STY",
    "TAX","TAY","TSX","TXA","TXS","TYA",

    // from illegal opcodes

    "SLA", "RLA", "ISC", "SRE", "SAX", "RRA", "LAX", "DCP", "ANC",
    "ALR", "ARR", "SBX", "SBC", "LAS", "JAM", "SHA", "SHX", "XAA",
    "SHY", "TAS"
];

const BasicV2Keywords = [
    "RESTORE", "INPUT#", "PRINT#", "RETURN", "RIGHT$", "STATUS",
    "VERIFY", "CLOSE", "GOSUB", "INPUT", "LEFT$", "PRINT", "TIME$",
    "CHR$", "CONT", "DATA", "GET#", "GOTO", "LIST", "LOAD", "MID$",
    "NEXT", "OPEN", "PEEK", "POKE", "READ", "SAVE", "STEP", "STOP",
    "STR$", "THEN", "TIME", "WAIT", "ABS", "AND", "ASC", "ATN", "CLR",
    "CMD", "COS", "DEF", "DIM", "END", "EXP", "FOR", "FRE", "GET", "INT",
    "LEN", "LET", "LOG", "NEW", "NOT", "POS", "REM", "RND", "RUN", "SGN",
    "SIN", "SPC", "SQR", "SYS", "TAB", "TAN", "TI$", "USR", "VAL", "FN",
    "IF", "ON", "OR", "TI", "TO", "GO"
].sort((a, b) => b.length - a.length);

const BasicTSBKeywords = [
    "ENVELOPE", "END PROC", "END LOOP", "ON ERROR", "NO ERROR", "GRAPHICS",
    "RENUMBER", "MOB SET", "DISABLE", "RETRACE", "RLOCMOB", "BCKGNDS",
    "LOW COL", "DISPLAY", "HI COL", "RIGHTB", "RIGHTW", "COLOUR", "BFLASH",
    "REPEAT", "CENTRE", "GLOBAL", "ON KEY", "RESUME", "SECURE", "DISAPA",
    "CIRCLE", "OPTION", "INSERT", "DESIGN", "HRDCPY", "DETECT", "HIRES",
    "BLOCK", "PLACE", "LEFTW", "LEFTB", "DOWNB", "DOWNW", "MULTI", "MUSIC",
    "FLASH", "CGOTO", "FETCH", "UNTIL", "RESET", "DELAY", "LOCAL", "RCOMP",
    "TRACE", "INKEY", "SOUND", "PAUSE", "SCRSV", "SCRLD", "PAINT", "MERGE",
    "CHECK", "ERROR", "PLOT", "LINE", "FCHR", "FCOL", "FILL", "DRAW", "CHAR",
    "MOVE", "MMOB", "PLAY", "WAVE", "PROC", "CALL", "EXEC", "EXIT", "LOOP",
    "ELSE", "PAGE", "DUMP", "FIND", "AUTO", "INST", "TEST", "EXOR", "PENX",
    "PENY", "CMOB", "ANGL", "COLD", "TEXT", "CSET", "DISK", "COPY", "REC",
    "ROT", "INV", "UPB", "UPW", "USE", "CLS", "MAP", "DIR", "OLD", "JOY",
    "MOD", "DIV", "DUP", "LIN", "POT", "NRM", "MOB", "OFF", "ARC", "VOL",
    "KEY", "MEM", "OUT", "DO", "AT", "X!", "D!"
].sort((a, b) => b.length - a.length);

const BasicKeywords = BasicV2Keywords.concat(BasicTSBKeywords).sort((a, b) => b.length - a.length);

//-----------------------------------------------------------------------------------------------//
// Settings
//-----------------------------------------------------------------------------------------------//
class Settings {
    constructor(extensionContext) {
        this.extensionContext = extensionContext;
        this.extensionPath = extensionContext.extensionPath;
        this.logLevel = LogLevel.Info;
        this.buildDefines = null;
        this.buildIncludePaths = null;
        this.buildArgs = null;
        this.viceExecutable = null;
        this.vicePort = Constants.BinaryMonitorPort;
        this.viceArgs = null;
        this.x16Executable = null;
        this.x16Args = null;
        this.pythonExecutable = null;
        this.javaExecutable = null;
        this.ninjaExecutable = null;
        this.autoBuild = false;
        this.showWelcome = true;
        this.resourceCompiler = null;
        this.basicCompiler = null;
        this.basicCharset = null;
    }

    disableWelcome(workspaceConfig) {
        const settings = this;
        settings.showWelcome = false;
        if (workspaceConfig) {
            // update globally
            workspaceConfig.update("vs64.showWelcome", settings.showWelcome, true);
        }
    }

    update(workspaceConfig) {
        if (!workspaceConfig) return;

        const settings = this;

        settings.showWelcome = workspaceConfig.get("vs64.showWelcome");
        if (null == settings.showWelcome) settings.showWelcome = true;

        settings.logLevel = workspaceConfig.get("vs64.loglevel")||"info";
        Logger.setGlobalLevel(settings.logLevel);

        settings.buildDefines = workspaceConfig.get("vs64.buildDefines")||"";
        settings.buildIncludePaths = workspaceConfig.get("vs64.buildIncludePaths")||"";
        settings.buildArgs = workspaceConfig.get("vs64.buildArgs")||"";
        settings.autoBuild = workspaceConfig.get("vs64.autoBuild");
        if (null == settings.autoBuild) settings.autoBuild = true;

        settings.recursiveLabelParsing = workspaceConfig.get("vs64.recursiveLabelParsing")||true;

        this.setupPython(workspaceConfig);
        this.setupJava(workspaceConfig);
        this.setupResourceCompiler(workspaceConfig);
        this.setupBasicCompiler(workspaceConfig);
        this.setupNinja(workspaceConfig);
        this.setupAcme(workspaceConfig);
        this.setupKickAssembler(workspaceConfig);
        this.setupCC65(workspaceConfig);
        this.setupLLVM(workspaceConfig);
        this.setupVice(workspaceConfig);
        this.setupX16(workspaceConfig);

        this.show();
    }

    setupResourceCompiler(workspaceConfig) {
        let resourceCompiler = this.#getAbsDir(workspaceConfig.get("vs64.resourceCompiler"));
        if (resourceCompiler) {
            this.resourceCompiler = resourceCompiler;
        } else {
            this.resourceCompiler = path.resolve(this.extensionPath, "tools", "rc.py");
        }
    }

    setupBasicCompiler(workspaceConfig) {
        let basicCompiler = this.#getAbsDir(workspaceConfig.get("vs64.basicCompiler"));
        if (basicCompiler) {
            this.basicCompiler = basicCompiler;
        } else {
            this.basicCompiler = path.resolve(this.extensionPath, "tools", "bc.py");
        }

        const basicCharsetName = workspaceConfig.get("vs64.basicCharset")||Constants.BasicCharset1;
        this.basicCharset = basicCharsetName == Constants.BasicCharset2 ? 2 : 1;
    }

    setupNinja(workspaceConfig) {
        let executablePath = this.#getAbsDir(workspaceConfig.get("vs64.ninjaExecutable"));
        if (executablePath) {
            this.ninjaExecutable = Utils.normalizeExecutableName(executablePath);
        } else {
            const extensionPath = this.extensionPath;
            if (extensionPath) {
                const platform = process.platform;
                if (platform == "win32") {
                    executablePath = path.resolve(extensionPath, "resources", "ninja", "win", "ninja.exe");
                } else if (platform == "darwin") {
                    executablePath = path.resolve(extensionPath, "resources", "ninja", "mac", "ninja");
                    Utils.setExecutablePermission(executablePath);
                } else if (platform == "linux") {
                    executablePath = path.resolve(extensionPath, "resources", "ninja", "linux", "ninja");
                    Utils.setExecutablePermission(executablePath);
                }
            }
            if (executablePath && Utils.fileExists(executablePath)) {
                this.ninjaExecutable = executablePath;
            } else {
                this.ninjaExecutable = "ninja";
            }
        }
    }

    setupAcme(workspaceConfig) {
        const installDir = this.#getAbsDir(workspaceConfig.get("vs64.acmeInstallDir"));
        if (installDir) {
            this.acmeExecutable = path.resolve(installDir, Utils.normalizeExecutableName("acme"));
        } else {
            this.acmeExecutable = "acme";
        }
    }

    setupKickAssembler(workspaceConfig) {
        const installDir = this.#getAbsDir(workspaceConfig.get("vs64.kickInstallDir"));
        if (installDir) {
            this.kickExecutable = path.resolve(installDir, "KickAss.jar");
        } else {
            this.kickExecutable = "KickAss.jar";
        }
    }

    setupCC65(workspaceConfig) {
        const installDir = this.#getAbsDir(workspaceConfig.get("vs64.cc65InstallDir"));
        if (installDir) {
            this.cc65Includes = [ path.resolve(installDir, "include") ];
            this.cc65Executable = path.resolve(installDir, "bin", Utils.normalizeExecutableName("cc65"));
            this.ca65Executable = path.resolve(installDir, "bin", Utils.normalizeExecutableName("ca65"));
            this.ld65Executable = path.resolve(installDir, "bin", Utils.normalizeExecutableName("ld65"));
        } else {
            this.cc65Includes = null;
            if (fs.existsSync("/usr/share/cc65/include")) {
                this.cc65Includes = [ "/usr/share/cc65/include" ];
            }
            this.cc65Executable = "cc65";
            this.ca65Executable = "ca65";
            this.ld65Executable = "ld65";
        }
    }

    setupLLVM(workspaceConfig) {
        const installDir = this.#getAbsDir(workspaceConfig.get("vs64.llvmInstallDir"));
        if (installDir) {
            const llvmIncludesDir = path.resolve(installDir);

            this.llvmIncludes = [
                path.resolve(llvmIncludesDir, "mos-platform", "common", "include"),
                path.resolve(llvmIncludesDir, "mos-platform", "commodore", "include"),
                path.resolve(llvmIncludesDir, "mos-platform", "c64", "include"),
                path.resolve(llvmIncludesDir, "lib", "clang", "16", "include")
            ];

            this.llvmIncludesX16 = [
                path.resolve(llvmIncludesDir, "mos-platform", "common", "include"),
                path.resolve(llvmIncludesDir, "mos-platform", "commodore", "include"),
                path.resolve(llvmIncludesDir, "mos-platform", "cx16", "include"),
                path.resolve(llvmIncludesDir, "lib", "clang", "16", "include")
            ];

            this.clangExecutable = path.resolve(installDir, "bin", Utils.normalizeExecutableName("mos-clang++"));
            this.clangcExecutable = path.resolve(installDir, "bin", Utils.normalizeExecutableName("mos-clang"));

            const clangTidyExecutable = path.resolve(installDir, "bin", Utils.normalizeExecutableName("clang-tidy"));
            if (Utils.fileExists(clangTidyExecutable)) {
                workspaceConfig.update("C_Cpp.codeAnalysis.clangTidy.path", clangTidyExecutable, false);
            }

        } else {
            this.llvmIncludes = null;
            this.llvmIncludesX16 = null;
            this.clangExecutable = "mos-clang++";
            this.clangcExecutable = "mos-clang";
        }
    }

    getCompilerIncludes(toolkit, machine) {
        if (null == toolkit) return null;

        let compilerIncludes = null;

        if (toolkit.isLLVM) {
            if (machine == "x16" || machine == "cx16") {
                compilerIncludes = this.llvmIncludesX16;
            } else {
                compilerIncludes = this.llvmIncludes;
            }
        } else if (toolkit.isCC65) {
            compilerIncludes = this.cc65Includes;
        }

        return compilerIncludes;

    }

    #migrateConfig(workspaceConfig, oldProperty, newProperty, deleteOld) {
        const newValue = workspaceConfig.get(newProperty);
        const oldValue = workspaceConfig.get(oldProperty);

        if ((null == newValue || newValue == "") && null != oldValue && oldValue != "") {
            workspaceConfig.update(newProperty, oldValue, true);
            if (deleteOld) {
                workspaceConfig.update(oldProperty, undefined, true);
                workspaceConfig.update(oldProperty, undefined);
            }
        }
    }

    setupVice(workspaceConfig) {

        this.#migrateConfig(workspaceConfig, "vs64.emulatorExecutable", "vs64.viceExecutable")
        this.#migrateConfig(workspaceConfig, "vs64.emulatorPort", "vs64.vicePort")
        this.#migrateConfig(workspaceConfig, "vs64.emulatorArgs", "vs64.viceArgs")

        const executablePath = this.#getAbsDir(workspaceConfig.get("vs64.viceExecutable")||workspaceConfig.get("vs64.emulatorExecutable")||"x64sc");
        if (executablePath) {
            this.viceExecutable = Utils.normalizeExecutableName(executablePath);
        } else {
            this.viceExecutable = "x64sc";
        }
        this.vicePort = workspaceConfig.get("vs64.vicePort")||workspaceConfig.get("vs64.emulatorPort")||Constants.BinaryMonitorPort;
        this.viceArgs = workspaceConfig.get("vs64.viceArgs")||workspaceConfig.get("vs64.emulatorArgs")||"";
    }

    setupX16(workspaceConfig) {
        const executablePath = this.#getAbsDir(workspaceConfig.get("vs64.x16Executable"));
        if (executablePath) {
            this.x16Executable = Utils.normalizeExecutableName(executablePath);
        } else {
            this.x16Executable = "x16emu";
        }
        this.x16Args = workspaceConfig.get("vs64.x16Args")||"";
    }

    setupPython(workspaceConfig) {
        const executablePath = this.#getAbsDir(workspaceConfig.get("vs64.pythonExecutable"));
        if (executablePath) {
            this.pythonExecutable = Utils.normalizeExecutableName(executablePath)
        } else {
            this.pythonExecutable = null; // Utils.getDefaultPythonExecutablePath();
            if (!this.pythonExecutable) {
                const platform = process.platform;
                if (platform == "win32") {
                    const embeddedPythonPath = path.resolve(this.extensionPath, "resources", "python", "python.exe");
                    if (Utils.fileExists(embeddedPythonPath)) {
                        this.pythonExecutable = Utils.normalizeExecutableName(embeddedPythonPath);
                    } else {
                        this.pythonExecutable = "python";
                    }
                } else {
                    this.pythonExecutable = "python3";
                }
            }
        }
    }

    setupJava(workspaceConfig) {
        const executablePath = this.#getAbsDir(workspaceConfig.get("vs64.javaExecutable"));
        if (executablePath) {
            this.javaExecutable = Utils.normalizeExecutableName(executablePath)
        } else {
            this.javaExecutable = "java";
        }
    }

    #getAbsDir(dir) {
        if (!dir || dir.length < 2) return dir;

        if (dir.startsWith('~/')) {
            return path.join(os.homedir(), dir.substring(1));
        }

        return dir;
    }

    show() {
        const settings = this;

        logger.debug("extension log level is " + Logger.getLevelName(Logger.getGlobalLevel()));
        logger.debug("auto build is " + (settings.autoBuild ? "enabled" : "disabled"));
        logger.debug("clang++ executable: " + settings.clangExecutable);
        logger.debug("clang executable: " + settings.clangcExecutable);
        logger.debug("acme executable: " + settings.acmeExecutable);
        logger.debug("kickass executable: " + settings.kickExecutable);
        logger.debug("cc65 executable: " + settings.cc65Executable);
        logger.debug("ca65 executable: " + settings.ca65Executable);
        logger.debug("ld65 executable: " + settings.ld65Executable);
        logger.debug("vice executable: " + settings.viceExecutable);
        logger.debug("ninja executable: " + settings.ninjaExecutable);
        logger.debug("python executable: " + settings.pythonExecutable);
        logger.debug("java executable: " + settings.javaExecutable);
    }

}

//-----------------------------------------------------------------------------------------------//
// Module Exports
//-----------------------------------------------------------------------------------------------//

module.exports = {
    Constants: Constants,
    Settings: Settings,
    AnsiColors: AnsiColors,
    AssemblerOpcodes: AssemblerOpcodes,
    BasicKeywords: BasicKeywords,
    BasicV2Keywords: BasicV2Keywords,
    BasicTSBKeywords: BasicTSBKeywords
};
