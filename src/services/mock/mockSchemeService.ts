import { ISchemeService } from '../interfaces/ISchemeService';
import { SchemeDefinition } from '../../types/scheme';
import { SCHEMES } from '../../config/schemes';

export class MockSchemeService implements ISchemeService {
  public async getAllSchemes(): Promise<SchemeDefinition[]> {
    await new Promise((r) => setTimeout(r, 100));
    return SCHEMES;
  }

  public async getSchemeById(id: string): Promise<SchemeDefinition | null> {
    await new Promise((r) => setTimeout(r, 100));
    const scheme = SCHEMES.find((s) => s.id.toLowerCase() === id.toLowerCase());
    return scheme || null;
  }

  public async searchSchemes(query: string): Promise<SchemeDefinition[]> {
    await new Promise((r) => setTimeout(r, 100));
    const q = query.toLowerCase();
    return SCHEMES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q)
    );
  }
}

export const mockSchemeService = new MockSchemeService();
