describe('schedule api test spec', () => {
  it('Verify schedule page is display properly', () => {
    cy.request({
      method: 'GET',
      url: 'https://schedules.fithub.id/',
    })
    .then((response)=>{
      expect(response.status).to.equal(200)
    })
  }),
  it('Verify queryCities is load correct city properly', () => {
    cy.request({
      method: 'POST',
      url: 'https://asia-southeast2-thehub-965c7.cloudfunctions.net/prodtakananiumnv02/queryCities',
    })
    .then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body[0].category).to.equal("clubCity")
      expect(response.body[0].child).to.equal("JAKARTA")
      expect(response.body[0].homeClubs[1].documentId).to.equal("FITHUBBENHIL")
      expect(response.body[1].category).to.equal("clubCity")
      expect(response.body[1].child).to.equal("SURABAYA")
      expect(response.body[1].homeClubs[1].documentId).to.equal("GUBENG")
      expect(response.body[2].category).to.equal("clubCity")
      expect(response.body[2].child).to.equal("TANGERANG SELATAN")
      expect(response.body[2].homeClubs[2].documentId).to.equal("TANGSELBSD1")
    })
  }),
  it('Verify loadClassType is load correct class type properly', () => {
    cy.request({
      method: 'POST',
      url: 'https://asia-southeast2-thehub-965c7.cloudfunctions.net/prodtakananiumnv02/schedules/loadClassType',
    })
    .then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body[0].category).to.equal("classType")
      expect(response.body[0].child).to.equal("CARDIO")
      expect(response.body[0].classList[0].className).to.equal("POUNDFIT")
      expect(response.body[1].category).to.equal("classType")
      expect(response.body[1].child).to.equal("MIND & BODY")
      expect(response.body[1].classList[0].className).to.equal("BELLY DANCE")
      expect(response.body[2].category).to.equal("classType")
      expect(response.body[2].child).to.equal("STRENGTH")
      expect(response.body[2].classList[0].className).to.equal("HIIT")
    })
  }),
  it('Verify schedule page is load schedule properly', () => {
    const dayjs = require('dayjs')
    cy.request({
      method: 'POST',
      url: 'https://asia-southeast2-thehub-965c7.cloudfunctions.net/prodtakananiumnv02/schedules/loadSchedulesPublic',
      body: '{"selectedCity":"BOGOR","selectedClub":"FIT HUB BOGOR","selectedCategory":null,"dateFrom":"'+ dayjs().add(1, 'day').format('YYYY-MM-DD') +'","dateTo":"'+dayjs().add(5, 'day').format('YYYY-MM-DD')+'"}',
      headers: {'Content-Type':"application/json",
                'accept':'application/json, text/plain, */*'}
    })
    .then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body[dayjs().add(1, 'day').format('YYYYMMDD')][1].locationSchedule).to.equal("FIT HUB BOGOR")
    })
  })
})