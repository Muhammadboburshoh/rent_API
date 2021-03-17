const express = require("express")

const fs = require("fs")
const util = require("util")

const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

const { states } = require("./states")

const app = express()

app.use(express.json())

app.get("/", (req, res) => res.send("Home pages"))

app.get("/classifieds", async (req, res) => {

  const respons = await readFile("data.json", "utf8")
  const ads = JSON.parse(respons)

  let newArr = []
  ads.forEach(holder => {

    let newState = states.find(state => state.id == holder.state_id)

    let newHolder = {
      id: holder.id,
      state: newState.state,
      monthlyPrice: holder.monthlyPrice,
      maxStudents: holder.maxStudents,
      roomCount: holder.roomCount,
      address: holder.address,
    }

    newArr.push(newHolder)
  })

  res.send(newArr)
})

app.post("/classifieds", async (req, res) => {

  const respons = await readFile("data.json", "utf8")
  const ads = JSON.parse(respons)


  /* const holdersRespons = await readFile("holders.json", "utf8")
  const holder = JSON.parse(holdersRespons) */


  const userState = states.find(state => state.id == req.body.state_id)

  let adsId

  if(ads.length ===0 ) {
    adsId = 0
  } else {
    adsId = ads[ads.length -1].id + 1
  }

  if(userState) {

    const newHolder = {
      id: adsId,
      holder_id: adsId,
      state_id: req.body.state_id,
      monthlyPrice: req.body.monthlyPrice,
      maxStudents: req.body.maxStudents,
      roomCount: req.body.roomCount,
      address: req.body.address,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }

    ads.push(newHolder)

    await writeFile("data.json", JSON.stringify(ads, null, 2))

    res.send(newHolder)
  }
  else {
    res.status(400).send("Mavjud emas!")
  }

})

app.get("/classified/:id", async (req, res) => {

  const respons = await readFile("data.json", "utf8")
  ads = JSON.parse(respons)

  const ad = ads.find(ad => ad.id == req.params.id)

  if(ad) {

    const newad = {
      id: ad.id,
      ad_id: ad.ad_id,
      state: states[ ad.state_id - 1].state,
      monthlyPrice: ad.monthlyPrice,
      maxStudents: ad.maxStudents,
      roomCount: ad.maxStudents,
      address: ad.address,
      firstName: ad.firstName,
      lastName: ad.lastName
    }
    res.send(newad)
  } else {
    res.status(400).send("Mavjud emas!")
  }
})

app.delete("/classified/:id", async (req, res) => {

  const respons = await readFile("data.json", "utf8")
  ads = JSON.parse(respons)

  const ad = ads.findIndex(ad => ad.id == req.params.id)

  if(ad !== undefined && ad >=0 ) {
    let deleteAd = ads[ad]

    const newads = {
      id: deleteAd.id,
      state: states[ deleteAd.state_id -1 ].state,
      monthlyPrice: deleteAd.monthlyPrice,
      maxStudents: deleteAd.maxStudents,
      roomCount: deleteAd.maxStudents,
      address: deleteAd.maxStudents,
    }

    ads.splice(ad, 1)

    await writeFile("data.json", JSON.stringify(ads, null, 2))

    res.send(newads)
  } else {
    res.status(400).send("Mavjud emas!")
  }
})

const PORT = process.env.PORT || 4005
app.listen(PORT, () => console.log(`localhost:${PORT}`))