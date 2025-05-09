/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { LanceDBAdapter } from "../../../Adapters/LanceDBAdapter";
import { ConfigServiceFacade } from "../../../Facades/ConfigServiceFacade";
import * as fs from "fs";
import { connect, Table, Connection, Query } from "@lancedb/lancedb";
import { COLLECTION_TYPE } from "../../../Models/CollectionType";
import { File } from "../../../Models/File";
import { Requirement, RequirementStatus } from "../../../Models/Requirement";
import { Chunk } from "../../../Models/Chunk";
import { ILanguageModel } from "../../../Interfaces/ILanguageModel";

// Mock external dependencies
jest.mock("fs");
jest.mock("path");
jest.mock("@lancedb/lancedb");
jest.mock("@langchain/ollama");
jest.mock("../../../Services/FileSystemService");

describe("LanceDBAdapter", () => {
  let adapter: LanceDBAdapter;
  let mockQuery: jest.Mocked<Query>;
  let mockTable: jest.Mocked<Table>;
  let mockConnection: jest.Mocked<Connection>;
  let mockLanguageModel: jest.Mocked<ILanguageModel>;
  let mockConfigServiceFacade: jest.Mocked<ConfigServiceFacade>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockQuery = {
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      nearestTo: jest.fn().mockReturnThis(),
      toArray: jest.fn<() => Promise<any[]>>().mockResolvedValue([]),
    } as unknown as jest.Mocked<Query>;

    mockTable = {
      query: jest.fn().mockReturnValue(mockQuery),
      add: jest
        .fn<(records: any[]) => Promise<void>>()
        .mockResolvedValue(undefined),
      delete: jest
        .fn<(records: any[]) => Promise<void>>()
        .mockResolvedValue(undefined),
    } as unknown as jest.MockedObject<Table>;

    mockConnection = {
      openTable: jest
        .fn<(name: string) => Promise<Table>>()
        .mockResolvedValue(mockTable),
      tableNames: jest.fn<() => Promise<string[]>>().mockResolvedValue([]),
      createTable: jest
        .fn<(name: string, data: any[]) => Promise<Table>>()
        .mockResolvedValue(mockTable),
    } as unknown as jest.Mocked<Connection>;

    (
      connect as unknown as jest.Mock<(uri: string) => Promise<Connection>>
    ).mockResolvedValue(mockConnection);

    mockLanguageModel = {
      generate: jest.fn(
        async (prompt: string) => `Mock response for: ${prompt}`,
      ),
      generateEmbeddings: jest.fn(async (_text: string) => [0.1, 0.2, 0.3]),
      refreshModels: jest.fn(async () => {}),
      generateStream: jest.fn(
        async (
          prompt: string,
          _context: string,
          onToken: (token: string) => void,
        ) => {
          onToken(`Mock stream response for: ${prompt}`);
        },
      ),
      checkModelAvailability: jest.fn(async () => true),
      pullModel: jest.fn(async (_model: string) => true),
    } as unknown as jest.Mocked<ILanguageModel>;

    mockConfigServiceFacade = {
      getEndpoint: jest.fn().mockReturnValue("http://localhost:11434"),
      getBearerToken: jest.fn().mockReturnValue("test-token"),
      getEmbeddingModel: jest.fn().mockReturnValue("test-model"),
      getMaxResults: jest.fn().mockReturnValue(5),
    } as unknown as jest.Mocked<ConfigServiceFacade>;

    adapter = LanceDBAdapter.Init(
      mockConfigServiceFacade,
      mockLanguageModel,
      "/mock/path",
    );

    (adapter as any)._dbConnection = mockConnection;
    (adapter as any)._embeddingDimension = 768;
  });

  describe("resetDatabase", () => {
    it("should reset the database by removing and recreating the directory", async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      await adapter.resetDatabase();

      expect(fs.rmSync).toHaveBeenCalled();
      expect(fs.mkdirSync).toHaveBeenCalled();
      expect(connect).toHaveBeenCalled();
    });

    it("should handle errors during database reset", async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.rmSync as jest.Mock).mockImplementation(() => {
        throw new Error("Permission denied");
      });

      await expect(adapter.resetDatabase()).rejects.toThrow(
        "Failed to reset database",
      );
    });
  });

  describe("fileExists", () => {
    it("should return true if the file exists", async () => {
      const filePath = "/test/file.txt";

      (mockQuery.toArray as jest.Mock<() => Promise<any[]>>).mockResolvedValue([
        { file_path: filePath },
      ]);

      return adapter.fileExists(filePath).then((result) => {
        expect(result).toBe(true);
      });
    });

    it("should return true if file exists with matching checksum", async () => {
      const filePath = "/test/file.txt";
      const checksum = "123abc";

      (mockQuery.toArray as jest.Mock<() => Promise<any[]>>).mockResolvedValue([
        { file_path: filePath, checksum: checksum },
      ]);

      const result = await adapter.fileExists(filePath, checksum);

      expect(result).toBe(true);
    });

    it("should return false if file exists but checksum differs", async () => {
      const filePath = "/test/file.txt";
      const storedChecksum = "123abc";
      const newChecksum = "456def";

      (mockQuery.toArray as jest.Mock<() => Promise<any[]>>).mockResolvedValue([
        { file_path: filePath, checksum: storedChecksum },
      ]);

      const result = await adapter.fileExists(filePath, newChecksum);

      expect(result).toBe(false);
    });

    it("should handle database errors", async () => {
      const filePath = "/test/file.txt";

      (mockQuery.toArray as jest.Mock<() => Promise<any[]>>).mockRejectedValue(
        new Error("Database error"),
      );

      await expect(adapter.fileExists(filePath)).rejects.toThrow();
    });
  });

  describe("addFiles", () => {
    it("should handle being called with no files", () => {
      expect(() => adapter.addFiles([])).not.toThrow();
    });

    it("should add a file to the database", async () => {
      const file: File = {
        originalContent: "test.txt",
        filePath: "123abc",
        checksum: "",
      };

      await adapter.addFiles([file]);

      expect(mockTable.add).toHaveBeenCalledWith([
        {
          file_path: file.filePath,
          checksum: file.checksum,
          original_content: file.originalContent,
          vector: Array(3).fill(0),
        },
      ]);
    });

    it("should skip adding a file already in the database", async () => {
      const file: File = {
        originalContent: "test.txt",
        filePath: "123abc",
        checksum: "",
      };

      jest.spyOn(adapter, "fileExists").mockResolvedValue(true);

      await adapter.addFiles([file]);

      expect(mockTable.add).not.toHaveBeenCalled();
    });

    it("should delete an existing file if there's a checksum mismatch", async () => {
      const file: File = {
        originalContent: "test.txt",
        filePath: "123abc",
        checksum: "new-checksum",
      };

      jest
        .spyOn(adapter, "fileExists")
        .mockImplementationOnce(() => Promise.resolve(true)) // First call - file exists
        .mockImplementationOnce(() => Promise.resolve(false)); // Second call - checksum mismatch

      await adapter.addFiles([file]);

      expect(adapter.fileExists).toHaveBeenNthCalledWith(1, "123abc");
      expect(adapter.fileExists).toHaveBeenNthCalledWith(
        2,
        "123abc",
        "new-checksum",
      );

      expect(mockTable.delete).toHaveBeenCalledWith(
        `file_path = '${file.filePath}'`,
      );
    });

    it("should throw an error when _getTable fails", async () => {
      const file: File = {
        originalContent: "test.txt",
        filePath: "123abc",
        checksum: "",
      };

      const originalConsoleError = console.error;
      console.error = jest.fn();

      try {
        const error = new Error("Database connection failed");
        jest.spyOn(adapter as any, "_getTable").mockRejectedValueOnce(error);

        await expect(adapter.addFiles([file])).rejects.toThrow(
          "Database connection failed",
        );

        expect(console.error).toHaveBeenCalledWith(
          "Error adding files to LanceDB:",
          error,
        );
      } finally {
        console.error = originalConsoleError;
      }
    });
  });

  describe("addRequirements", () => {
    it("should handle being called with no requirements", () => {
      expect(() => adapter.addRequirements([])).not.toThrow();
    });

    it("should add requirements to the database", async () => {
      const requirements: Requirement[] = [
        {
          id: "1",
          name: "Requirement 1",
          description: "Description 1",
          type: COLLECTION_TYPE.requirements,
          version: "1.0",
          status: RequirementStatus.NOT_TRACKED,
        },
        {
          id: "2",
          name: "Requirement 2",
          description: "Description 2",
          type: COLLECTION_TYPE.requirements,
          version: "2.0",
          status: RequirementStatus.NOT_TRACKED,
        },
      ];

      await adapter.addRequirements(requirements);

      expect(mockTable.add).toHaveBeenCalledTimes(2);
    });

    it("should handle errors during requirement addition", async () => {
      const requirements: Requirement[] = [
        {
          id: "1",
          name: "Requirement 1",
          description: "Description 1",
          type: COLLECTION_TYPE.requirements,
          version: "1.0",
          status: RequirementStatus.NOT_TRACKED,
        },
      ];

      (
        mockTable.add as jest.Mock<(records: any[]) => Promise<void>>
      ).mockRejectedValue(new Error("Failed to add requirement"));

      await expect(adapter.addRequirements(requirements)).rejects.toThrow(
        "Failed to add requirement",
      );
    });
  });

  describe("addChunks", () => {
    it("should handle being called with no chunks", () => {
      expect(() => adapter.addChunks([])).not.toThrow();
    });

    it("should add chunks to the database", async () => {
      const chunks: Chunk[] = [
        {
          content: "Chunk 1",
          lineContent: "Line 1",
          filePath: "file.txt",
          fileType: "text",
          lineNumber: 1,
        },
        {
          content: "Chunk 2",
          lineContent: "Line 2",
          filePath: "file.txt",
          fileType: "text",
          lineNumber: 2,
        },
      ];

      await adapter.addChunks(chunks);

      expect(mockTable.add).toHaveBeenCalledTimes(2);
    });

    it("should handle errors during chunk addition", async () => {
      const chunks: Chunk[] = [
        {
          content: "Chunk 1",
          lineContent: "Line 1",
          filePath: "file1.txt",
          fileType: "text",
          lineNumber: 1,
        },
      ];

      (
        mockTable.add as jest.Mock<(records: any[]) => Promise<void>>
      ).mockRejectedValue(new Error("Failed to add chunk"));

      await expect(adapter.addChunks(chunks)).rejects.toThrow(
        "Failed to add chunk",
      );
    });
  });

  describe("queryForFiles", () => {
    it("should query for files based on a search term", async () => {
      const searchTerm = "test";
      const queryResults = [
        {
          file_path: "file1.txt",
          checksum: "123abc",
          originalContent: "Test content",
          _distance: 0.3, // Distance score of 0.3 should become a score of 0.7
          vector: [0.1, 0.2, 0.3],
        },
      ];

      const expectedFiles = [
        {
          filePath: "file1.txt",
          checksum: "123abc",
          originalContent: "Test content",
          score: 0.7, // 1 - 0.3 = 0.7
        },
      ];

      (mockQuery.toArray as jest.Mock<() => Promise<any[]>>).mockResolvedValue(
        queryResults,
      );

      const result = await adapter.queryForFiles(searchTerm);

      expect(result).toEqual(expectedFiles);
      expect(mockQuery.nearestTo).toHaveBeenCalledWith(
        new Float32Array([0.1, 0.2, 0.3]),
      );
    });

    it("should handle errors during file query", async () => {
      const searchTerm = "test";

      (mockQuery.toArray as jest.Mock<() => Promise<any[]>>).mockRejectedValue(
        new Error("Database error"),
      );

      await expect(adapter.queryForFiles(searchTerm)).rejects.toThrow(
        "Database error",
      );
    });
  });

  describe("queryForRequirements", () => {
    it("should query for requirements based on a search term", async () => {
      const searchTerm = "test";
      const queryResults = [
        {
          id: "1",
          name: "Requirement 1",
          description: "Description 1",
          type: COLLECTION_TYPE.requirements,
          version: "1.0",
          _distance: 0.3, // Distance score of 0.3 should become a score of 0.7
          vector: [0.1, 0.2, 0.3],
        },
      ];
      const expectedRequirements = [
        {
          id: "1",
          name: "Requirement 1",
          description: "Description 1",
          type: COLLECTION_TYPE.requirements,
          version: "1.0",
          score: 0.7, // 1 - 0.3 = 0.7
        },
      ];

      (mockQuery.toArray as jest.Mock<() => Promise<any[]>>).mockResolvedValue(
        queryResults,
      );

      const result = await adapter.queryForRequirements(searchTerm);

      expect(result).toEqual(expectedRequirements);
      expect(mockQuery.nearestTo).toHaveBeenCalledWith(
        new Float32Array([0.1, 0.2, 0.3]),
      );
    });

    it("should handle errors during requirement query", async () => {
      const searchTerm = "test";

      (mockQuery.toArray as jest.Mock<() => Promise<any[]>>).mockRejectedValue(
        new Error("Database error"),
      );

      await expect(adapter.queryForRequirements(searchTerm)).rejects.toThrow(
        "Database error",
      );
    });
  });

  describe("queryForChunks", () => {
    it("should query for chunks based on a search term", async () => {
      const searchTerm = "test";
      const queryResults = [
        {
          content: "Chunk 1",
          filePath: "file.txt",
          fileType: "text",
          lineNumber: 1,
          _distance: 0.3, // Distance score of 0.3 should become a score of 0.7
          vector: [0.1, 0.2, 0.3],
        },
      ];

      const expectedChunks = [
        {
          content: "Chunk 1",
          filePath: "file.txt",
          fileType: "text",
          lineNumber: 1,
          score: 0.7, // 1 - 0.3 = 0.7
        },
      ];

      (mockQuery.toArray as jest.Mock<() => Promise<any[]>>).mockResolvedValue(
        queryResults,
      );

      const result = await adapter.queryForChunks(searchTerm);

      expect(result).toEqual(expectedChunks);
      expect(mockQuery.nearestTo).toHaveBeenCalledWith(
        new Float32Array([0.1, 0.2, 0.3]),
      );
    });

    it("should handle multiple filePaths", async () => {
      const searchTerm = "test";

      const queryResults = [
        {
          content: "Chunk 1",
          filePath: "file1.txt",
          fileType: "text",
          lineNumber: 1,
          _distance: 0.3, // Distance score of 0.3 should become a score of 0.7
          vector: [0.1, 0.2, 0.3],
        },
        {
          content: "Chunk 2",
          filePath: "file2.txt",
          fileType: "text",
          lineNumber: 2,
          _distance: 0.4, // Distance score of 0.4 should become a score of 0.6
          vector: [0.4, 0.5, 0.6],
        },
      ];

      const expectedChunks = [
        {
          content: "Chunk 1",
          filePath: "file1.txt",
          fileType: "text",
          lineNumber: 1,
          score: 0.7, // 1 - 0.3 = 0.7
        },
        {
          content: "Chunk 2",
          filePath: "file2.txt",
          fileType: "text",
          lineNumber: 2,
          score: 0.6, // 1 - 0.4 = 0.6
        },
      ];

      (mockQuery.toArray as jest.Mock<() => Promise<any[]>>).mockResolvedValue(
        queryResults,
      );

      const result = await adapter.queryForChunks(searchTerm, [
        "file1.txt",
        "file2.txt",
      ]);

      expect(result).toEqual(expectedChunks);
      expect(mockQuery.nearestTo).toHaveBeenCalledWith(
        new Float32Array([0.1, 0.2, 0.3]),
      );
    });

    it("should handle errors during chunk query", async () => {
      const searchTerm = "test";

      (mockQuery.toArray as jest.Mock<() => Promise<any[]>>).mockRejectedValue(
        new Error("Database error"),
      );

      await expect(adapter.queryForChunks(searchTerm)).rejects.toThrow(
        "Database error",
      );
    });
  });

  describe("deleteFiles", () => {
    it("should handle being called with no files to delete", () => {
      expect(() => adapter.deleteFiles([])).not.toThrow();
    });

    it("should delete files from the database", async () => {
      const filePaths = [
        { filePath: "file1.txt" },
        { filePath: "file2.txt" },
      ] as File[];

      await adapter.deleteFiles(filePaths);

      expect(mockTable.delete).toHaveBeenCalledWith("file_path = 'file1.txt'");
      expect(mockTable.delete).toHaveBeenCalledWith("file_path = 'file2.txt'");
    });

    it("should handle errors during file deletion", async () => {
      const filePaths = [{ filePath: "file1.txt" }] as File[];

      (
        mockTable.delete as jest.Mock<(string: string) => Promise<void>>
      ).mockRejectedValue(new Error("Failed to delete files"));

      await expect(adapter.deleteFiles(filePaths)).rejects.toThrow(
        "Failed to delete files",
      );
    });
  });

  describe("_initialize", () => {
    it("should initialize the database connection and table", async () => {
      (connect as jest.Mock)
        .mockReset()
        .mockImplementation(() => Promise.resolve(mockConnection));

      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.mkdirSync as jest.Mock).mockReturnValue(undefined);

      (adapter as any)._dbPath = "/mock/path/lancedb";

      await adapter["_initialize"]();

      expect(connect).toHaveBeenCalledWith("/mock/path/lancedb");
    });

    it("should handle undefined BearerToken", async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.mkdirSync as jest.Mock).mockReturnValue(undefined);

      (mockConfigServiceFacade.getBearerToken as jest.Mock).mockReturnValue(
        undefined,
      );

      (adapter as any)._dbPath = "/mock/path/lancedb";
      await adapter["_initialize"]();

      expect((adapter as any)._dbConnection).not.toBe(null);
    });

    it("should handle errors during initialization", async () => {
      (connect as jest.Mock).mockReset().mockImplementation(() => {
        throw new Error("Failed to initialize LanceDB");
      });

      (fs.existsSync as jest.Mock).mockReturnValue(true);

      await expect(adapter["_initialize"]()).rejects.toThrow(
        "Failed to initialize LanceDB",
      );
    });
  });

  describe("_determineEmbeddingDimension", () => {
    it("should determine the embedding dimension", async () => {
      const dimension = await adapter["_determineEmbeddingDimension"]();
      expect(dimension).toBe(3);
    });

    it("should return default dimension (768) when embedding generation fails", async () => {
      const originalConsoleError = console.error;
      console.error = jest.fn();

      try {
        (LanceDBAdapter as unknown as { _instance: unknown })._instance =
          undefined;

        const error = new Error("Failed to generate embeddings");

        mockLanguageModel.generateEmbeddings.mockRejectedValueOnce(error);

        adapter = LanceDBAdapter.Init(
          mockConfigServiceFacade,
          mockLanguageModel,
          "/mock/path",
        );

        const dimension = await adapter["_determineEmbeddingDimension"]();

        expect(console.error).toHaveBeenCalledWith(
          "Error determining embedding dimension:",
          error,
        );

        expect(dimension).toBe(768);
      } finally {
        console.error = originalConsoleError;
      }
    });
  });

  describe("_getDB", () => {
    it("should return the database connection", async () => {
      const db = await adapter["_getDB"]();
      expect(db).toBe(mockConnection);
    });

    it("should connect if connection doesn't exist", async () => {
      (adapter as any)._dbConnection = null;

      const db = await adapter["_getDB"]();
      expect(db).toBe(mockConnection);
      expect(connect).toHaveBeenCalled();
    });
  });

  describe("_tableExists", () => {
    it("should return true if the table exists", async () => {
      (
        mockConnection.tableNames as jest.Mock<() => Promise<string[]>>
      ).mockResolvedValue([COLLECTION_TYPE.file]);

      const exists = await adapter["_tableExists"](COLLECTION_TYPE.file);

      expect(exists).toBe(true);
    });

    it("should return false if the table does not exist", async () => {
      (
        mockConnection.tableNames as jest.Mock<() => Promise<string[]>>
      ).mockResolvedValue([]);

      const exists = await adapter["_tableExists"]("nonexistent_table" as any);

      expect(exists).toBe(false);
    });

    it("should handle errors during table existence check", async () => {
      (
        mockConnection.tableNames as jest.Mock<() => Promise<string[]>>
      ).mockRejectedValue(new Error("Database error"));

      await expect(
        adapter["_tableExists"](COLLECTION_TYPE.file),
      ).rejects.toThrow("Database error");
    });
  });

  describe("_getTable", () => {
    it("should return the table if it exists", async () => {
      (adapter as any)._tableExists = jest
        .fn<(collectionName: COLLECTION_TYPE) => Promise<boolean>>()
        .mockResolvedValue(true);

      const table = await adapter["_getTable"](COLLECTION_TYPE.file);

      expect(table).toBe(mockTable);
    });

    it("should create a table if it doesn't exist", async () => {
      (adapter as any)._tableExists = jest
        .fn<(collectionName: COLLECTION_TYPE) => Promise<boolean>>()
        .mockResolvedValue(false);
      (adapter as any)._determineEmbeddingDimension = jest
        .fn<() => Promise<number>>()
        .mockResolvedValue(768);

      const table = await adapter["_getTable"](COLLECTION_TYPE.file);

      expect(mockConnection.createTable).toHaveBeenCalled();
      expect(table).toBe(mockTable);
    });

    it("should handle errors during table retrieval", async () => {
      (adapter as any)._tableExists = jest
        .fn<(collectionName: COLLECTION_TYPE) => Promise<boolean>>()
        .mockResolvedValue(true);

      (
        mockConnection.openTable as jest.Mock<(name: string) => Promise<Table>>
      ).mockRejectedValue(new Error("Database error"));

      await expect(adapter["_getTable"](COLLECTION_TYPE.file)).rejects.toThrow(
        "Database error",
      );
    });

    it("should throw an error for unknown collection type", async () => {
      const originalConsoleError = console.error;
      console.error = jest.fn();

      try {
        (adapter as any)._tableExists = jest
          .fn<(collectionName: string) => Promise<boolean>>()
          .mockResolvedValue(false);
        (adapter as any)._determineEmbeddingDimension = jest
          .fn<() => Promise<number>>()
          .mockResolvedValue(768);

        const unknownType = "unknown_collection" as COLLECTION_TYPE;

        await expect(adapter["_getTable"](unknownType)).rejects.toThrow(
          `Unknown collection type: ${unknownType}`,
        );

        expect(console.error).toHaveBeenCalledWith(
          `Error getting table ${unknownType}:`,
          expect.any(Error),
        );
      } finally {
        console.error = originalConsoleError;
      }
    });
  });

  describe("GetInstance", () => {
    let originalInstance: LanceDBAdapter | null;

    beforeEach(() => {
      originalInstance = (LanceDBAdapter as any)._instance;
    });

    afterEach(() => {
      (LanceDBAdapter as any)._instance = originalInstance;
    });

    it("should throw an error if the instance has not been initialized", () => {
      (LanceDBAdapter as any)._instance = null;

      expect(() => LanceDBAdapter.GetInstance()).toThrow(
        "LanceDBAdapter must be initialized first!",
      );
    });

    it("should return the singleton instance when initialized", () => {
      (LanceDBAdapter as any)._instance = adapter;

      const instance = LanceDBAdapter.GetInstance();
      expect(instance).toBe(adapter);
    });
  });
});
