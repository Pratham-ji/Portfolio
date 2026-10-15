import MiniSearch from 'minisearch';
import { FileNode } from './FileSystemTypes';

class Indexer {
  private miniSearch: MiniSearch<FileNode>;

  constructor() {
    this.miniSearch = new MiniSearch({
      fields: ['name', 'tags'],
      storeFields: ['id', 'name', 'isDirectory', 'parentId', 'metadata', 'permissions', 'thumbnail', 'tags'],
      searchOptions: {
        prefix: true,
        fuzzy: 0.2
      }
    });
  }

  public addDocuments(nodes: FileNode[]) {
    // Only index non-root directories if needed, but definitely index all files and important folders.
    this.miniSearch.addAll(nodes);
  }

  public search(query: string): FileNode[] {
    if (!query || query.trim() === '') return [];
    // minisearch returns search results which we map back to our FileNode objects
    // because we used storeFields, we can just cast the results
    return this.miniSearch.search(query) as unknown as FileNode[];
  }
}

export const SearchIndexer = new Indexer();
