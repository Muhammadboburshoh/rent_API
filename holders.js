const states = [
  {
    id: 1, state: "toshkent"
  },
  {
    id: 2, state: "samarqand"
  },
  {
    id: 3, state: "buxoro"
  },
  {
    id: 4, state: "xorazm"
  },
  {
    id: 5, state: "qo'qon"
  },
]


const holders = [
  {
    id: 1,
    state_id: 1,
    monthlyPrice: 200,
    maxStudents: 4,
    roomCount: 2,
    address: "Beruniy"
  }, {
    id: 2,
    state_id: 3,
    monthlyPrice: 250,
    maxStudents: 5,
    roomCount: 2,
    address: "G'ijdivon"
  },
  {
    id: 3,
    state_id: 1,
    monthlyPrice: 200,
    maxStudents: 4,
    roomCount: 2,
    address: "Chorsu"
  },
]

module.exports.holders = holders
module.exports.states = states