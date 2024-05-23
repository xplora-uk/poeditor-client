import { expect } from 'chai';
import { PoEditorApi, makeTermAndContext } from '../..';

const API_TOKEN = process.env.API_TOKEN || '';
const PROJECT_ID = process.env.PROJECT_ID || '';

describe('PoEditorApi', () => {
  it('should be constructed', () => {
    const api = new PoEditorApi(API_TOKEN, PROJECT_ID);
    expect(api).to.be.an.instanceOf(PoEditorApi);
  });
});

describe('Make term and context', () => {
  it('should return term and context', () => {
   const sampleKey = '"Adventure"."adv-123"."title"';
   const { term, context } = makeTermAndContext(sampleKey);
    expect(term).to.be.equal('title');
    expect(context).to.be.equal('"Adventure"."adv-123"');
  });
});

