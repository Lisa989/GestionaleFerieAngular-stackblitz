export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6,

}

export function GetLogLevel(level: LogLevel){
  switch (level) {
    case LogLevel.All: return 'ALL   ';
    case LogLevel.Debug: return 'DEBUG';
    case LogLevel.Info: return 'INFO ';
    case LogLevel.Warn: return 'WARN ';
    case LogLevel.Error: return 'ERROR';
    case LogLevel.Fatal: return 'FATAL';
  }
}
