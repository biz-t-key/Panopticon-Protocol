import Parser from 'tree-sitter';
import ts from 'tree-sitter-typescript';
import fs from 'fs';
import path from 'path';

/**
 * The core engine of Panopticon-OS for reading files.
 * Extracts the 'bone' (AST signatures) and discards the 'flesh' (logic).
 * Ensures zero-hallucination context for Panopticon agents.
 */
export class PanopticonExtractor {
    constructor() {
        this.parser = new Parser();
        // Defaulting to TypeScript. A true Inquisitor would dynamically set this.
        this.parser.setLanguage(ts.typescript);
    }

    extract(filePath, sourceCode) {
        const tree = this.parser.parse(sourceCode);
        const rootNode = tree.rootNode;

        const ir = {
            _meta: {
                version: "1.0",
                file_path: filePath,
                language: "typescript",
            },
            imports: [],
            exports: [],
        };

        // Traverse AST to pull structure
        for (const node of rootNode.namedChildren) {
            // 1. Extract Imports (What does this file depend on?)
            if (node.type === 'import_statement') {
                const moduleNode = node.childForFieldName('source');
                const moduleName = moduleNode ? moduleNode.text.replace(/['"]/g, '') : 'unknown';

                const entities = [];
                const importClause = node.children.find(c => c.type === 'import_clause');
                if (importClause) {
                    const namedImports = importClause.children.find(c => c.type === 'named_imports');
                    if (namedImports) {
                        namedImports.namedChildren.forEach(specifier => {
                            if (specifier.type === 'import_specifier') {
                                entities.push(specifier.childForFieldName('name')?.text || '');
                            }
                        });
                    }
                }
                if (entities.length > 0) {
                    ir.imports.push({ module: moduleName, entities });
                }
            }

            // 2. Extract Exports (What is the contract this file provides?)
            if (node.type === 'export_statement') {
                const declaration = node.childForFieldName('declaration');
                if (!declaration) continue;

                // Function signature extraction
                if (declaration.type === 'function_declaration') {
                    const name = declaration.childForFieldName('name')?.text || 'anonymous';
                    const parameters = declaration.childForFieldName('parameters')?.text || '()';
                    const returnType = declaration.childForFieldName('return_type')?.text || '';

                    ir.exports.push({
                        kind: 'function',
                        name: name,
                        signature: `${parameters}${returnType}`
                    });
                }
                // Interface extraction
                else if (declaration.type === 'interface_declaration') {
                    const name = declaration.childForFieldName('name')?.text || 'unknown';
                    const body = declaration.childForFieldName('body')?.text || '{}';

                    ir.exports.push({
                        kind: 'interface',
                        name: name,
                        signature: body.replace(/\s+/g, ' ') // Compress to single line
                    });
                }
                // Class extraction
                else if (declaration.type === 'class_declaration') {
                    const name = declaration.childForFieldName('name')?.text || 'unknown';
                    ir.exports.push({
                        kind: 'class',
                        name: name,
                        signature: "class_signature_omitted" // Extension point for deeper traversal
                    });
                }
            }
        }

        return ir;
    }
}

// CLI Execution Support
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] === __filename) {
    const filePath = process.argv[2];
    if (!filePath) {
        console.error("Usage: node extractor.mjs <file_path>");
        process.exit(1);
    }
    try {
        const code = fs.readFileSync(filePath, 'utf-8');
        const extractor = new PanopticonExtractor();
        const ir = extractor.extract(filePath, code);
        console.log(JSON.stringify(ir, null, 2));
    } catch (error) {
        console.error(`Extraction failed: ${error.message}`);
        process.exit(1);
    }
}
