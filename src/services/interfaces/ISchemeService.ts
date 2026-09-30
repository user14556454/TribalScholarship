import { SchemeDefinition } from '../../types/scheme';

export interface ISchemeService {
  getAllSchemes(): Promise<SchemeDefinition[]>;
  getSchemeById(id: string): Promise<SchemeDefinition | null>;
  searchSchemes(query: string): Promise<SchemeDefinition[]>;
}
