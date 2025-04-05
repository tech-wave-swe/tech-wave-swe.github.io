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
              content: "int main() {",
              filePath: "test.c",
              fileType: "c",
              lineNumber: 1,
            },
            {
              content: "    return 0;",
              filePath: "test.c",
              fileType: "c",
              lineNumber: 2,
            },
            {
              content: "}",
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
              content: "void test() {",
              filePath: "test.cpp",
              fileType: "cpp",
              lineNumber: 1,
            },
            {
              content: '    cout << "Hello";',
              filePath: "test.cpp",
              fileType: "cpp",
              lineNumber: 2,
            },
            {
              content: "}",
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
          content: "fn main() {",
          filePath: "test.rs",
          fileType: "rust",
          lineNumber: 1,
        },
        {
          content: '    println!("Hello");',
          filePath: "test.rs",
          fileType: "rust",
          lineNumber: 2,
        },
        {
          content: "}",
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
          content: "int main() {",
          filePath: "test.c",
          fileType: "c",
          lineNumber: 1,
        },
        {
          content: "    return 0;",
          filePath: "test.c",
          fileType: "c",
          lineNumber: 3,
        },
        {
          content: "}",
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
          content: "line 1",
          filePath: "test.unknown",
          fileType: "text",
          lineNumber: 1,
        },
        {
          content: "line 2",
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
              content: "#ifndef TEST_H",
              filePath: "test.h",
              fileType: "c",
              lineNumber: 1,
            },
            {
              content: "#define TEST_H",
              filePath: "test.h",
              fileType: "c",
              lineNumber: 2,
            },
            {
              content: "#endif",
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
              content: "#pragma once",
              filePath: "test.hpp",
              fileType: "cpp",
              lineNumber: 1,
            },
            {
              content: "class Test {};",
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
