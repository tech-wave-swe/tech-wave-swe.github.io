import { FileSystem } from "../../../Interfaces/FileSystem";
import { jest } from "@jest/globals";

export const MockFileSystemService: jest.Mocked<FileSystem> = {
  read: jest.fn<(path: string) => string>().mockImplementation(() => {
    return (
      "{\n" +
      '"endpoint": "http://localhost:11434",\n' +
      '      "model": "qwen2.5-coder:7b",\n' +
      '      "embeddingModel": "nomic-embed-text:latest",\n' +
      '      "temperature": 0.7,\n' +
      '      "chunkOverlap": 200,\n' +
      '      "chunkSize": 1000,\n' +
      '      "maxResults": 5,\n' +
      '  "filters": {\n' +
      '    "path": {\n' +
      '      "include": [],\n' +
      '      "exclude": ["**/Projects/**"]\n' +
      "    },\n" +
      '    "file_extension": {\n' +
      '      "include": ["md"],\n' +
      '      "exclude": []\n' +
      "    },\n" +
      '    "requirements": {\n' +
      '      "req1": {\n' +
      '        "search_path": ["./ADC/"]\n' +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "}\n"
    );
  }),
};
