import { expect } from "@jest/globals";
import { DocumentFormatterService } from "../../../Services/DocumentFormatterService";
import { Chunk } from "../../../Models/Chunk";

describe("DocumentFormatterService", () => {
  let documentFormatter: DocumentFormatterService;

  beforeEach(() => {
    documentFormatter = new DocumentFormatterService();
  });

  describe("formatSourceCode", () => {
    it("should format C/C++ source code correctly", () => {
      const testCases = [
        {
          filePath: "test.c",
          code: "int main() {\n    return 0;\n}",
          expectedChunks: [
            {
              content: "int main() {\n    return 0;\n}",
              lineContent: "int main() {",
              filePath: "test.c",
              fileType: "c",
              lineNumber: 1,
            },
            {
              content: "int main() {\n    return 0;\n}",
              lineContent: "    return 0;",
              filePath: "test.c",
              fileType: "c",
              lineNumber: 2,
            },
            {
              content: "int main() {\n    return 0;\n}",
              lineContent: "}",
              filePath: "test.c",
              fileType: "c",
              lineNumber: 3,
            },
          ],
        },
        {
          filePath: "test.cpp",
          code: 'void test() {\n    cout << "Hello";\n}',
          expectedChunks: [
            {
              content: 'void test() {\n    cout << "Hello";\n}',
              lineContent: "void test() {",
              filePath: "test.cpp",
              fileType: "cpp",
              lineNumber: 1,
            },
            {
              content: 'void test() {\n    cout << "Hello";\n}',
              lineContent: '    cout << "Hello";',
              filePath: "test.cpp",
              fileType: "cpp",
              lineNumber: 2,
            },
            {
              content: 'void test() {\n    cout << "Hello";\n}',
              lineContent: "}",
              filePath: "test.cpp",
              fileType: "cpp",
              lineNumber: 3,
            },
          ],
        },
      ];

      testCases.forEach(({ filePath, code, expectedChunks }) => {
        const chunks = documentFormatter.formatSourceCode(code, filePath);
        expect(chunks).toEqual(expectedChunks);
      });
    });

    it("should format Rust source code correctly", () => {
      const filePath = "test.rs";
      const code = 'fn main() {\n    println!("Hello");\n}';
      const expectedChunks: Chunk[] = [
        {
          content: 'fn main() {\n    println!("Hello");\n}',
          lineContent: "fn main() {",
          filePath: "test.rs",
          fileType: "rust",
          lineNumber: 1,
        },
        {
          content: 'fn main() {\n    println!("Hello");\n}',
          lineContent: '    println!("Hello");',
          filePath: "test.rs",
          fileType: "rust",
          lineNumber: 2,
        },
        {
          content: 'fn main() {\n    println!("Hello");\n}',
          lineContent: "}",
          filePath: "test.rs",
          fileType: "rust",
          lineNumber: 3,
        },
      ];

      const chunks = documentFormatter.formatSourceCode(code, filePath);
      expect(chunks).toEqual(expectedChunks);
    });

    it("should handle empty lines correctly", () => {
      const filePath = "test.c";
      const code = "int main() {\n\n    return 0;\n\n}";
      const expectedChunks: Chunk[] = [
        {
          content: "int main() {\n\n    return 0;\n",
          lineContent: "int main() {",
          filePath: "test.c",
          fileType: "c",
          lineNumber: 1,
        },
        {
          content: "int main() {\n\n    return 0;\n\n}",
          lineContent: "    return 0;",
          filePath: "test.c",
          fileType: "c",
          lineNumber: 3,
        },
        {
          content: "\n    return 0;\n\n}",
          lineContent: "}",
          filePath: "test.c",
          fileType: "c",
          lineNumber: 5,
        },
      ];

      const chunks = documentFormatter.formatSourceCode(code, filePath);
      expect(chunks).toEqual(expectedChunks);
    });

    it("should handle unknown file extensions as text", () => {
      const filePath = "test.unknown";
      const code = "line 1\nline 2";
      const expectedChunks: Chunk[] = [
        {
          content: "line 1\nline 2",
          lineContent: "line 1",
          filePath: "test.unknown",
          fileType: "text",
          lineNumber: 1,
        },
        {
          content: "line 1\nline 2",
          lineContent: "line 2",
          filePath: "test.unknown",
          fileType: "text",
          lineNumber: 2,
        },
      ];

      const chunks = documentFormatter.formatSourceCode(code, filePath);
      expect(chunks).toEqual(expectedChunks);
    });

    it("should handle header files correctly", () => {
      const testCases = [
        {
          filePath: "test.h",
          code: "#ifndef TEST_H\n#define TEST_H\n#endif",
          expectedChunks: [
            {
              content: "#ifndef TEST_H\n#define TEST_H\n#endif",
              lineContent: "#ifndef TEST_H",
              filePath: "test.h",
              fileType: "c",
              lineNumber: 1,
            },
            {
              content: "#ifndef TEST_H\n#define TEST_H\n#endif",
              lineContent: "#define TEST_H",
              filePath: "test.h",
              fileType: "c",
              lineNumber: 2,
            },
            {
              content: "#ifndef TEST_H\n#define TEST_H\n#endif",
              lineContent: "#endif",
              filePath: "test.h",
              fileType: "c",
              lineNumber: 3,
            },
          ],
        },
        {
          filePath: "test.hpp",
          code: "#pragma once\nclass Test {};",
          expectedChunks: [
            {
              content: "#pragma once\nclass Test {};",
              lineContent: "#pragma once",
              filePath: "test.hpp",
              fileType: "cpp",
              lineNumber: 1,
            },
            {
              content: "#pragma once\nclass Test {};",
              lineContent: "class Test {};",
              filePath: "test.hpp",
              fileType: "cpp",
              lineNumber: 2,
            },
          ],
        },
      ];

      testCases.forEach(({ filePath, code, expectedChunks }) => {
        const chunks = documentFormatter.formatSourceCode(code, filePath);
        expect(chunks).toEqual(expectedChunks);
      });
    });
  });
});
