import { expect, jest } from '@jest/globals';
import { DocumentFormatterService } from "../../../Services/DocumentFormatterService";
import { FormattedDocument } from '../../../Models/FormattedDocument';
import { ConfigServiceFacade } from "../../../Facades/ConfigServiceFacade";

jest.mock("../../../Facades/ConfigServiceFacade", () => ({
  __esModule: true,
  ConfigServiceFacade: {
    GetInstance: jest.fn()
  }
}));


describe("DocumentFormatterService", () => {
  let documentFormatter: DocumentFormatterService;

  beforeEach(() => {
    documentFormatter = new DocumentFormatterService();
    (ConfigServiceFacade.GetInstance as jest.Mock).mockReturnValue({
      getChunkSize: jest.fn().mockReturnValue(500),
      getChunkOverlap: jest.fn().mockReturnValue(200),
    });
  });
  describe("formatByLanguage", () => {
    it("should format correctly [with filePath]", () => {

      let document: FormattedDocument;
      const language: string[] = [
        'javascript', 'typescript', 'python', 'java', 'csharp', 'markdown', 'text', ''
      ];
      const filePath: string[] = [
        "test.js", "test.ts", "test.py", "test.java", "test.cs", "test.md", "test.txt", "test"
      ];
      const code: string[] = [
        'function test() { return 1; }',
        'function test() { return 1; }',
        'def test(): int:\n    return 1',
        'public class Test { public static void main(String[] args) {} }',
        'public class Test { public static void main(String[] args) {} }',
        '# This is a comment\nprint("Hello World")\n# Another comment',
        '# This is a comment\nprint("Hello World")\n# Another comment',
        ''
      ];
      const expectedResult: FormattedDocument[] = [
        {
          originalContent: 'function test() { return 1; }', //code string
          chunks: ['function test() { return 1; }'],
          language: "javascript",
          metadata: {
            filePath: 'test.js',
            fileName: 'test.js',
            fileType: 'javascript',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: 'function test() { return 1; }', //code string
          chunks: ['function test() { return 1; }'],
          language: "typescript",
          metadata: {
            filePath: 'test.ts',
            fileName: 'test.ts',
            fileType: 'typescript',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: 'def test(): int:\n    return 1',
          chunks: ['def test(): int:\n    return'],
          language: "python",
          metadata: {
            filePath: 'test.py',
            fileName: 'test.py',
            fileType: 'python',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: 'public class Test { public static void main(String[] args) {} }',
          chunks: [' public static void main(String[] args) {}'],
          language: "java",
          metadata: {
            filePath: 'test.java',
            fileName: 'test.java',
            fileType: 'java',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: 'public class Test { public static void main(String[] args) {} }',
          chunks: [' public static void main(String[] args) {}'],
          language: "csharp",
          metadata: {
            filePath: 'test.cs',
            fileName: 'test.cs',
            fileType: 'csharp',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: '# This is a comment\nprint("Hello World")\n# Another comment',
          chunks: ['# This is a comment\nprint("Hello World")\n# Another comment'],
          language: "markdown",
          metadata: {
            filePath: 'test.md',
            fileName: 'test.md',
            fileType: 'markdown',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: '# This is a comment\nprint("Hello World")\n# Another comment',
          chunks: ['# This is a comment\nprint("Hello World")\n# Another comment'],
          language: "text",
          metadata: {
            filePath: 'test.txt',
            fileName: 'test.txt',
            fileType: 'text',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: '',
          chunks: [],
          language: "",
          metadata: {
            filePath: 'test',
            fileName: 'test',
            fileType: '',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 0
          },
        },
      ];

      for (let i = 0; i < 8; i++) {
        document = documentFormatter.formatByLanguage(code[i], language[i], filePath[i]);
        document.metadata.createdAt = 0; // cambio della data con una fissa
        expect(document).toEqual(expectedResult[i]);
      }

    });
    it("should format correctly [without filePath]", () => {
      const language = 'javascript';
      const code = 'function test() { return 1; }';
      const expectedResult: FormattedDocument =
      {
        originalContent: 'function test() { return 1; }', //code string
        chunks: ['function test() { return 1; }'],
        language: "javascript",
        metadata: {
          filePath: undefined,
          fileName: undefined,
          fileType: 'javascript',
          createdAt: 0,
          chunkSize: 500,
          chunkOverlap: 200,
          totalChunks: 1
        },
      };

      const document: FormattedDocument = documentFormatter.formatByLanguage(code, language);
      document.metadata.createdAt = 0; // cambio della data con una fissa
      expect(document).toEqual(expectedResult);
    }

    );
  });
  describe("formatSourceCode", () => {
    it("should format source code correctly", () => {

      let document: FormattedDocument;
      const filePath: string[] = [
        "test.js", "test.ts", "test.py", "test.java", "test.cs", "test.md", "test.txt", "test"
      ];
      const code: string[] = [
        'function test() { return 1; }',
        'function test() { return 1; }',
        'def test(): int:\n    return 1',
        'public class Test { public static void main(String[] args) {} }',
        'public class Test { public static void main(String[] args) {} }',
        '# This is a comment\nprint("Hello World")\n# Another comment',
        '# This is a comment\nprint("Hello World")\n# Another comment',
        ''
      ];
      const expectedResult: FormattedDocument[] = [
        {
          originalContent: 'function test() { return 1; }', //code string
          chunks: ['function test() { return 1; }'],
          language: "javascript",
          metadata: {
            filePath: 'test.js',
            fileName: 'test.js',
            fileType: 'javascript',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: 'function test() { return 1; }', //code string
          chunks: ['function test() { return 1; }'],
          language: "typescript",
          metadata: {
            filePath: 'test.ts',
            fileName: 'test.ts',
            fileType: 'typescript',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: 'def test(): int:\n    return 1',
          chunks: ['def test(): int:\n    return'],
          language: "python",
          metadata: {
            filePath: 'test.py',
            fileName: 'test.py',
            fileType: 'python',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: 'public class Test { public static void main(String[] args) {} }',
          chunks: [' public static void main(String[] args) {}'],
          language: "java",
          metadata: {
            filePath: 'test.java',
            fileName: 'test.java',
            fileType: 'java',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: 'public class Test { public static void main(String[] args) {} }',
          chunks: [' public static void main(String[] args) {}'],
          language: "csharp",
          metadata: {
            filePath: 'test.cs',
            fileName: 'test.cs',
            fileType: 'csharp',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: '# This is a comment\nprint("Hello World")\n# Another comment',
          chunks: ['# This is a comment\nprint("Hello World")\n# Another comment'],
          language: "markdown",
          metadata: {
            filePath: 'test.md',
            fileName: 'test.md',
            fileType: 'markdown',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: '# This is a comment\nprint("Hello World")\n# Another comment',
          chunks: ['# This is a comment\nprint("Hello World")\n# Another comment'],
          language: "text",
          metadata: {
            filePath: 'test.txt',
            fileName: 'test.txt',
            fileType: 'text',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
        {
          originalContent: '',
          chunks: [''],
          language: "",
          metadata: {
            filePath: 'test',
            fileName: 'test',
            fileType: '',
            createdAt: 0,
            chunkSize: 500,
            chunkOverlap: 200,
            totalChunks: 1
          },
        },
      ];

      for (let i = 0; i < 7; i++) {
        document = documentFormatter.formatSourceCode(code[i], filePath[i]);
        document.metadata.createdAt = 0; // cambio della data con una fissa
        expect(document).toEqual(expectedResult[i]);
      }

    });

  });

  describe("splitIntoChunks", () => {
    it("should work", () => {
      let result;
      result = documentFormatter.splitIntoChunks("1234567890", 3, 1);
      //expect(result).toEqual(["123", "234", "345", "456", "567", "678", "789", "890", "90","0"]);

      result = documentFormatter.splitIntoChunks("1234567890");
      expect(result).toEqual(["1234567890"]);

      result = documentFormatter.splitIntoChunks("albero\nrosso", 3, 1);
      //expect(result).toEqual(["albero", "rosso"]);

    });
    it ("should return a warn with long string", () => {
      const longString = Array(1000001).fill('a').join('');
      const result = documentFormatter.splitIntoChunks(longString, 1500, 1);
      const expectedArray = Array(500).fill('a'.repeat(2000));
      expectedArray.push("a");
      expect(result).toEqual(expectedArray);
      expect(console.warn);
    });
    it("should return a warn with long chunck", () => {
      const longString = Array(8000).fill('a').join('');
      const result = documentFormatter.splitIntoChunks(longString, 6001, 1);
      const expectedArray = Array(2).fill('a'.repeat(4000));
      expectedArray.push("aa");
      expectedArray.push("a");;
      expect(result).toEqual(expectedArray);
      expect(console.warn);
    });
});
  describe("extractCodeBlocks", () => {
    it("should extract markdown code blocks correctly", () => {
      const markdown = `
    # Example Markdown
    This is a sample markdown file with some code blocks.
    \`\`\`javascript
    console.log("Hello World");\n
    \`\`\`
    Here is another code block:\n
    \`\`\`python
    print("Hello World")\n
    \`\`\`
      `;

      const result = documentFormatter.extractCodeBlocks(markdown);
      expect(result).toEqual([
        '    console.log("Hello World");\n\n    ',
        '    print("Hello World")\n\n    ',
      ]);
    });
    it("should return empty array for no code blocks", () => {
      const markdown = `#Example markdown`;
      const result = documentFormatter.extractCodeBlocks(markdown);
      expect(result).toEqual([]);
    });
  });

});