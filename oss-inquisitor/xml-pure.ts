/**
 * @name XML Pure: Minimalist Parser
 * @version 1.0.0
 * @license MIT
 * @author Panopticon-OS
 * 
 * THE SOUL:
 * This module replaces the heavy 'xml2js' and its deep dependency tree (sax, etc.)
 * with a streamlined, zero-dependency parser for predictable XML data.
 * Ideal for API responses and configuration files.
 */

/**
 * A minimalist XML to JSON parser.
 * Converts XML tags to object properties. Handles nested tags and attributes.
 */
export function parseXml(xml: string): any {
    const result: any = {};

    // Clean comments and header
    const cleanXml = xml.replace(/<!--[\s\S]*?-->/g, '').replace(/<\?xml[\s\S]*?\?>/g, '').trim();

    const tagRegex = /<([^\s>]+)([^>]*)>([\s\S]*?)<\/\1>|<([^\s>]+)([^>]*)\/>/g;
    let match;

    while ((match = tagRegex.exec(cleanXml)) !== null) {
        const tagName = match[1] || match[4];
        const rawContent = match[3] || '';

        // Recursive parse or terminal value
        let content: any = rawContent.trim();
        if (content.startsWith('<')) {
            content = parseXml(content);
        }

        // Handle multiple tags of same name (array conversion)
        if (result[tagName]) {
            if (!Array.isArray(result[tagName])) {
                result[tagName] = [result[tagName]];
            }
            result[tagName].push(content);
        } else {
            result[tagName] = content;
        }
    }

    return result;
}
