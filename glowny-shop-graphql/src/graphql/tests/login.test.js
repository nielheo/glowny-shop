import {tester} from 'graphql-tester'
import expect from 'expect.js'

describe('auth', () => {
  let test = tester({
      url: 'http://localhost:4000/auth',
      contentType: 'application/x-www-form-urlencoded',
      Accept: 'application/json',
  })

  describe('login', function () {
    it('admin - correct', function () {
      return test('email=super@glowny-shop.com&password=P@ssw0rd&site=admin')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
      })
    })
  })

  describe('login', function () {
    it('admin - missing email', function () {
      return test('password=P@ssw0rd&site=admin')
      .then(result => {
        expect(result.status).to.equal(400)
        //expect(result.success).to.equal(false)
      })
    })
  })

  describe('login', function () {
    it('admin - missing password', function () {
      return test('email=super@glowny-shop.com&site=admin')
      .then(result => {
        expect(result.status).to.equal(400)
        //expect(result.success).to.equal(false)
      })
    })
  })

  describe('login', function () {
    it('admin - missing site', function () {
      return test('email=super@glowny-shop.com&password=P@ssw0rd')
      .then(result => {
        expect(result.status).to.equal(400)
        //expect(result.success).to.equal(false)
      })
    })
  })

  describe('login', function () {
    it('shop - missing shop code', function () {
      return test('email=super@glowny-shop.com&password=P@ssw0rd&site=shop')
      .then(result => {
        expect(result.status).to.equal(400)
        //expect(result.success).to.equal(false)
      })
    })
  })

  describe('login', function () {
    it('shop - success', function () {
      return test('email=super@glowny-cloth.com&password=P@ssw0rd&site=shop&shopCode=Glowny_Cloth')
      .then(result => {
        expect(result.status).to.equal(200)
        //expect(result.success).to.equal(false)
      })
    })
  })

  describe('login', function () {
    it('shop - failed / wrong password', function () {
      return test('email=super@glowny-cloth.com&password=P@ssw0rd1&site=shop&shopCode=Glowny_Cloth')
      .then(result => {
        expect(result.status).to.equal(400)
        //expect(result.success).to.equal(false)
      })
    })
  })

  describe('login', function () {
    it('shop - failed / wrong shop code', function () {
      return test('email=super@glowny-cloth.com&password=P@ssw0rd&site=shop&shopCode=Glowny_Cloth1')
      .then(result => {
        expect(result.status).to.equal(400)
        //expect(result.success).to.equal(false)
      })
    })
  })
    
})
