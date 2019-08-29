import sinon from 'sinon';
import SinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import CommonService from '../src/services/common.service';

chai.use(SinonChai);

describe('common service test', () => {
  it('getData should fire findOne method in the Model', () => {
    const MockModel = { findOne: sinon.spy() };
    const commonService = CommonService(MockModel);
    const expectedArgs = { todo: 'Sample Todo' };
    commonService.getData(expectedArgs);
    /* eslint-disable */
    expect(MockModel.findOne).calledOnce;
    expect(MockModel.findOne).calledWith(expectedArgs);
    /* eslint-enable */
  });

  it('create should fire create method in the Model', () => {
    const MockModel = { create: sinon.spy() };
    const commonService = CommonService(MockModel);
    const expectedArgs = { todo: 'Sample Todo' };
    commonService.create(expectedArgs);
    /* eslint-disable */
    expect(MockModel.create).calledOnce;
    expect(MockModel.create).calledOnceWith(expectedArgs);
    /* eslint-enable */
  });
});
