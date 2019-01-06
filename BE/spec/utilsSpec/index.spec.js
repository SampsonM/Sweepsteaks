'use strict'
import { expect } from 'chai'
import utils from '../../utils'

describe('utils file functions test', () => {
  it('validates time stamp is current', () => {

    const date = new Date().toISOString()
    const request = {
      body: {
        sync: date
      }
    }

    const result = utils.timestampValid(request)
    
    expect(result).to.equal(true)
  })
})