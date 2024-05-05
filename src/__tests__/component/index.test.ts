import { expect } from 'chai';
import { PoEditorApi } from '../..';

describe('PoEditorApi', () => {
  it('should be constructed', () => {
    const api = new PoEditorApi('token', '12345');
    expect(api).to.be.an.instanceOf(PoEditorApi);
  });
});
