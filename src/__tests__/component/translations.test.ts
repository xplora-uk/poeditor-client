import { expect } from 'chai';
import { PoEditorApi } from '../..';

const API_TOKEN = process.env.API_TOKEN || '';
const PROJECT_ID = process.env.PROJECT_ID || '';

describe('poEditor translations', () => {
  const api = new PoEditorApi(API_TOKEN, PROJECT_ID);
  const defaultLanguage = 'en-gb';
  const translations = {
    'test.test': 'Translation test',
    'test.test2': 'Translation test2'
  }
  const updatedTranslations = {
    'test.test': 'Updated translation test',
    'test.test2': 'Updated translation test2'
  }

  it('should add test terms', async () => {  
    const response = await api.addTerms(Object.keys(translations));
    
    expect(response.result).to.ownProperty('terms');
    const { parsed, added } = response.result!.terms!;
    expect(parsed).to.be.equal(Object.keys(translations).length);
    expect(added).to.be.equal(Object.keys(translations).length);
  });

  it('should add translations to the terms', async () => {
    const languageObject = {
      language: defaultLanguage,
      translations: translations
    }
    const response = await api.addTranslations(languageObject.language, languageObject.translations);

    expect(response).to.ownProperty('result');
    const {result} = response;
    expect(result).to.ownProperty('translations');
    const { parsed, added } = result!.translations!;
    expect(parsed).to.be.equal(Object.keys(translations).length);
    expect(added).to.be.equal(Object.keys(translations).length);
  });

  it('should update translations to the terms', async () => {
    const languageObject = {
      language: defaultLanguage,
      translations: updatedTranslations
    };

    const response = await api.updateTranslations(languageObject.language, languageObject.translations);
    
    expect(response).to.ownProperty('result');
    const {result} = response;
    expect(result).to.ownProperty('translations');
    const { parsed, updated } = result!.translations!;
    expect(parsed).to.be.equal(Object.keys(updatedTranslations).length);
    expect(updated).to.be.equal(Object.keys(updatedTranslations).length);
  });

  it('should delete translations', async () => {
    const response = await api.deleteTranslations(defaultLanguage, Object.keys(updatedTranslations));
    
    expect(response.result).to.ownProperty('translations');
    const { parsed, deleted } = response.result!.translations!;
    expect(parsed).to.be.equal(Object.keys(updatedTranslations).length);
    expect(deleted).to.be.equal(Object.keys(updatedTranslations).length);
  });

  it('should delete terms', async () => {
    const response = await api.deleteTerms(Object.keys(updatedTranslations));
    
    expect(response.result).to.ownProperty('terms');
    const { parsed, deleted } = response.result!.terms!;
    expect(parsed).to.be.equal(Object.keys(updatedTranslations).length);
    expect(deleted).to.be.equal(Object.keys(updatedTranslations).length);
  });

});

