const isDev = process.env.NEXT_PUBLIC_IS_DEV as string === "dev";


const logger = {
    log: (...args: unknown[]) => isDev && console.log(...args),
    info: (...args: unknown[]) => isDev && console.log(...args),
    error: (...args: unknown[]) => isDev && console.error(...args),
    warn: (...args: unknown[]) => isDev && console.warn(...args),
    debug: (...args: unknown[]) => isDev && console.debug(...args),
    trace: (...args: unknown[]) => isDev && console.trace(...args),
}

export default logger;


