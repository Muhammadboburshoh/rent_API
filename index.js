const express = require("express")

const fs = require("fs")
const util = require("util")

const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

const {  states } = require("./holders")

const app = express()

app.use(express.json())

app.get("/", (req, res) => res.send("Home page"))

app.get("/classifieds", async (req, res) => {

  const respons = await readFile("data.json", "utf8")
  holders = JSON.parse(respons)

  let newArr = []
  holders.forEach(holder => {

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
  holders = JSON.parse(respons)

  const userState = states.find(state => state.id == req.body.state_id)

  if(userState) {

    const newHolder = {
      id: holders[holders.length -1].id + 1,
      holder_id: holders[holders.length -1].id + 1,
      state_id: req.body.state_id,
      monthlyPrice: req.body.monthlyPrice,
      maxStudents: req.body.maxStudents,
      roomCount: req.body.roomCount,
      address: req.body.address,
      holder: req.body.holder,
      holderPhone: req.body.holderPhone
    }

    holders.push(newHolder)

    await writeFile("data.json", JSON.stringify(holders, null, 2))

    res.send(newHolder)
  }
  else {
    res.status(400).send("Mavjud emas!")
  }

  res.send(holders)
})

app.get("/classified/:id", async (req, res) => {

  const respons = await readFile("data.json", "utf8")
  holders = JSON.parse(respons)

  const holder = holders.find(holder => holder.id == req.params.id)

  if(holder) {

    const newHolder = {
      id: holder.id,
      holder_id: holder.holder_id,
      state: states[ holder.state_id - 1].state,
      monthlyPrice: holder.monthlyPrice,
      maxStudents: holder.maxStudents,
      roomCount: holder.maxStudents,
      address: holder.address,
      holder: holder.holder,
      holderPhone: holder.holderPhone
    }
    res.send(newHolder)
  } else {
    res.status(400).send("Mavjud emas!")
  }
})

app.delete("/classified/:id", async (req, res) => {

  const respons = await readFile("data.json", "utf8")
  holders = JSON.parse(respons)

  const holder = holders.findIndex(holder => holder.id == req.params.id)

  if(holder !== undefined && holder >=0 ) {
    const deleteHolder = holders[holder]

    const newHolder = {
      id: deleteHolder.id,
      state: states[ deleteHolder.state_id -1 ].state,
      monthlyPrice: deleteHolder.monthlyPrice,
      maxStudents: deleteHolder.maxStudents,
      roomCount: deleteHolder.maxStudents,
      address: deleteHolder.maxStudents,
      holder: deleteHolder.holder,
      holderPhone: deleteHolder.holderPhone
    }

    holders.splice(holder, 1)

    await writeFile("data.json", JSON.stringify(holders, null, 2))

    res.send(newHolder)
  } else {
    res.status(400).send("Mavjud emas!")
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`localhost:${PORT}`))