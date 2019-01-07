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

  it('validates if request is NOT GET', () => {

    const request = {
      method: 'PUT'
    }

    const result = utils.isGetRequest(request)

    expect(result).to.equal(false)
  })

  it('validates if request is GET', () => {

    const request = {
      method: 'GET'
    }

    const result = utils.isGetRequest(request)

    expect(result).to.equal(true)
  })

  it('validates if payload is valid email format', () => {
    const payload = 'test@mail.com'

    const result = utils.isEmail(payload)

    expect(result).to.equal(true)
  })

  it('validates if payload is invalid email format', () => {
    const payload = "<p>' OR '1'='1</p>"

    const result = utils.isEmail(payload)

    expect(result).to.equal(false)
  })

  it('validates if payload is an integer', () => {
    const payload = 10

    const result = utils.isInt(payload)

    expect(result).to.equal(true)
  })

  it('validates if payload is an integer', () => {
    const payload = { not: 'a integer' }

    const result = utils.isInt(payload)

    expect(result).to.equal(false)
  })

  it('validates uk phone numbers 07', () => {
    const payload = '07961491797'

    const result = utils.isPhoneNumber(payload)

    expect(result).to.equal(true)
  })

  it('validates uk phone numbers +44', () => {
    const payload = '+447961491797'

    const result = utils.isPhoneNumber(payload)

    expect(result).to.equal(true)
  })

  it('validates uk phone numbers 01', () => {
    const payload = '01946825918'

    const result = utils.isPhoneNumber(payload)

    expect(result).to.equal(true)
  })

  it('validates uk phone numbers string', () => {
    const payload = 'not number'

    const result = utils.isPhoneNumber(payload)

    expect(result).to.equal(false)
  })
})
