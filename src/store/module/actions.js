import firebaseDB from 'boot/firebase'

export const getVolunteers = ({ commit }, payload) => {
  firebaseDB.ref('data/dataVolunteers/').on('value', snapshot => {
    const fromFBvolunteers = snapshot.val()
    console.log(fromFBvolunteers)
    const volunteersUpdated = []
    for (const volunteer in fromFBvolunteers) {
      volunteersUpdated.push({
        name: fromFBvolunteers[volunteer].name,
        tel: fromFBvolunteers[volunteer].tel,
        apt: fromFBvolunteers[volunteer].apt,
        city: fromFBvolunteers[volunteer].city,
        street: fromFBvolunteers[volunteer].street,
        quantity: fromFBvolunteers[volunteer].quantity,
        receivers: fromFBvolunteers[volunteer].receivers
      })
    }
    commit('getVolunteers', { volunteersUpdated })
  })
}
export const getReceivers = ({ commit }, payload) => {
  firebaseDB.ref('data/dataReceivers/').on('value', snapshot => {
    const fromFBreceivers = snapshot.val()
    console.log(fromFBreceivers)
    const receiversUpdated = []
    for (const receiver in fromFBreceivers) {
      receiversUpdated.push({
        name: fromFBreceivers[receiver].name,
        tel: Number(fromFBreceivers[receiver].tel),
        apt: fromFBreceivers[receiver].apt,
        city: fromFBreceivers[receiver].city,
        street: fromFBreceivers[receiver].street,
        volunteer: fromFBreceivers[receiver].volunteer,
        matched: fromFBreceivers[receiver].matched
      })
    }
    commit('getReceivers', { receiversUpdated })
  })
}
export const registerVolunteer = ({ commit }, payload) => {
  firebaseDB.ref('data/dataVolunteers/').child(payload.tel).update({ name: payload.name, tel: payload.tel, city: payload.city, street: payload.street, apt: payload.apt, quantity: payload.quantity, receivers: null })
    .then(() => {
      commit('registerVolunteer', payload)
    })
    .catch(error => {
      console.log(error)
    })
}
export const registerReceiver = ({ commit }, payload) => {
  console.log(payload)
  firebaseDB.ref('data/dataReceivers/').child(payload.tel).update({ name: payload.name, tel: payload.tel, city: payload.city, street: payload.street, apt: payload.apt, voluntier: 'no volunteer' })
    .then(() => {
      commit('registerReceiver', payload)
    })
    .catch(error => {
      console.log(error)
    })
}
export const chosenReceiverTel = ({ commit }, payload) => {
  console.log(payload)
  commit('chosenReceiverTel', payload)
}
export const addReceiverTel = ({ commit, state }, payload) => {
  commit('chosenVolunteerTel', payload.chosenVolunteerTel)
  firebaseDB.ref('data/dataReceivers/' + payload.chosenReceiverTel + '/').update({ volunteer: payload.chosenVolunteerTel, matched: true })
    .then(volunteer => {
      const volunteers = state.volunteers.volunteersUpdated
      for (let i = 0; i < volunteers.length; i++) {
        if (volunteers[i].receivers) {
          const obj = volunteers[i].receivers
          for (const key in obj) {
            if (obj[key] === Number(payload.chosenReceiverTel)) {
              firebaseDB.ref('data/dataVolunteers/' + volunteers[i].tel + '/' + 'receivers').child(key).remove()
            }
          }
        }
      }
    })
    .then(volunteer => {
      firebaseDB.ref('data/dataVolunteers/' + payload.chosenVolunteerTel + '/' + 'receivers/').push(payload.chosenReceiverTel)
    })
    .catch(error => {
      console.log(error)
    })
}
