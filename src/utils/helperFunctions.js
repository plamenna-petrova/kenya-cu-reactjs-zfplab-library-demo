
export const isNullOrWhitespace = (input) => !input || input.trim().length === 0;

export const sleepAsync = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));