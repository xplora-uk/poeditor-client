import { expect } from 'chai';
import { PoEditorApi } from '../..';

const API_TOKEN = process.env.API_TOKEN || '';
const PROJECT_ID = process.env.PROJECT_ID || '';

describe('poEditor terms', () => {
  const api = new PoEditorApi(API_TOKEN, PROJECT_ID);
  const defaultLanguage = 'en-gb';
  const term1 = 'test';
  const term2 = 'test2';
  const termsPair1 = [`test.${term1}`, `test.${term2}`];
  const termsPair2 = ['test.test3', 'test.test4'];

  it('should add terms', async () => {  
    const response = await api.addTerms(termsPair1);
    
    expect(response.result).to.ownProperty('terms');
    const { parsed, added } = response.result!.terms!;
    expect(parsed).to.be.equal(termsPair1.length);
    expect(added).to.be.equal(termsPair1.length);
  });

  it('should list terms and check added ones', async () => {
    const response = await api.listTerms(defaultLanguage);

    expect(response.result).to.ownProperty('terms');
    const { terms } = response.result!;
    expect(terms).to.be.an('array');
    expect(terms!.map(e => e.term)).to.include(term1);
    expect(terms!.map(e => e.term)).to.include(term2);
  });

  it('should update terms', async () => {
    const response = await api.updateTerms([
      { key: termsPair1[0], new_key: termsPair2[0] },
      { key: termsPair1[1], new_key: termsPair2[1] },
    ]);
    
    expect(response.result).to.ownProperty('terms');
    const { parsed, updated } = response.result!.terms!;
    expect(parsed).to.be.equal(termsPair1.length);
    expect(updated).to.be.equal(termsPair2.length);
  });

  it('should delete terms', async () => {
    const response = await api.deleteTerms(termsPair2);
    
    expect(response.result).to.ownProperty('terms');
    const { parsed, deleted } = response.result!.terms!;
    expect(parsed).to.be.equal(termsPair2.length);
    expect(deleted).to.be.equal(termsPair2.length);
  });

});

