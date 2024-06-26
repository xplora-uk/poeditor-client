import { createAxiosInstance } from '@xplora-uk/axios-with-agentkeepalive';
import { AxiosInstance } from 'axios';
import { URLSearchParams } from 'url';
import { TermAddedResponse, TermDeletedResponse, TermUpdatedResponse, TermsListFullResponse, TranslationAddedResponse, TranslationDeletedResponse, TranslationUpdatedResponse } from './generated';
import { DataToAddTerms, DataToDeleteTerms, DataToUpdateTerms, InputToUpdateTerms } from './types';

export class PoEditorApi {
  private readonly _client: AxiosInstance;
  private readonly _security: Record<string, string>;
  constructor(
    /**
     * API Token
     */
    readonly api_token: string,
    /**
     * Project ID
     */
    readonly id: string,
    readonly baseURL = 'https://api.poeditor.com/v2',
  ) {
    this._client = createAxiosInstance({
      baseURL,
    });
    this._security = { api_token, id };
  }

  _makeFormData(data: unknown) {
    const formData = new URLSearchParams({
      ...this._security, // for security it's included in every request
    });
    formData.append('data', JSON.stringify(data));
    return formData;
  }

  listTerms = async (language: string) => {
    const formData = this._makeFormData({ language });
    const response = await this._client.post<TermsListFullResponse>('/terms/list', formData.toString());
    return response.data;
  }

  addTerms = async (keys: string[]) => {
    const data: DataToAddTerms = keys.map(key => makeTermAndContext(key));
    const formData = this._makeFormData(data);
    const response = await this._client.post<TermAddedResponse>('/terms/add', formData.toString());
    return response.data;
  }

  updateTerms = async (input: InputToUpdateTerms) => {
    const data: DataToUpdateTerms = [];
    input.forEach(({ key, new_key }) => {
      const { term, context } = makeTermAndContext(key);
      const { term: new_term, context: new_context } = makeTermAndContext(new_key);
      data.push({ term, context, new_term, new_context });
    });
    const formData = this._makeFormData(data);
    const response = await this._client.post<TermUpdatedResponse>('/terms/update', formData.toString());
    return response.data;
  }

  deleteTerms = async (keys: string[]) => {
    const data: DataToDeleteTerms = keys.map(key => makeTermAndContext(key));
    const formData = this._makeFormData(data);
    const response = await this._client.post<TermDeletedResponse>('/terms/delete', formData.toString());
    return response.data;
  }

  addTranslations = async (language: string, translations: Record<string, string>) => {
    const translationsData: any[] = [];
    Object.entries(translations).forEach(([key, translation]) => {
      const { term, context } = makeTermAndContext(key);
      translationsData.push({ term, context, translation: { content: translation } });
    });
    
    const formData = this._makeFormData(translationsData);
    formData.append('language', language);
    const response = await this._client.post<TranslationAddedResponse>('/translations/add', formData.toString());
    return response.data;
  }
  
  updateTranslations = async (language: string, translations: Record<string, string>) => {
    const translationsData: any[] = [];
    Object.entries(translations).forEach(([key, translation]) => {
      const { term, context } = makeTermAndContext(key);
      translationsData.push({ term, context, translation: { content: translation } });
    });
    
    const formData = this._makeFormData(translationsData);
    formData.append('language', language);
    const response = await this._client.post<TranslationUpdatedResponse>('/translations/update', formData.toString());
    return response.data;
  }

  deleteTranslations = async (language: string, keys: string[]) => {
    const translationsData: any[] = [];
    keys.forEach(key => {
      const { term, context } = makeTermAndContext(key);
      translationsData.push({ term, context });
    });
    
    const formData = this._makeFormData(translationsData);
    formData.append('language', language);
    const response = await this._client.post<TranslationDeletedResponse>('/translations/delete', formData.toString());
    return response.data;
  }
}

export function makeTermAndContext(key: string) {
  const keyParts = key.replaceAll('"', '').split('.');
  const term     = String(keyParts.pop());
  const context  = '"' + String(keyParts.join('"."')) + '"';

  return { term, context };
}
