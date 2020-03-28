import firebaseDB from 'boot/firebase'

export const getMatches = ({ commit }, payload) => {
  firebaseDB.ref('matches/matchesData/').once('value', snapshot => {
    const fromFBmatches = snapshot.val()
    // const activeMatches = fromFBmatches.filter((match) =>
    //   new Date(match.date) > new Date()
    // )
    // console.log(snapshot.val())
    // console.log(activeMatches)
    const matchesUpdated = []
    for (const match of fromFBmatches) {
      // let matchIdInActiv = activeMatches.indexOf(match)
      const matchIdInTotal = fromFBmatches.indexOf(match)
      match.id = matchIdInTotal
      matchesUpdated.push(match)
      firebaseDB.ref('matches/matchesData/').child(matchIdInTotal).update({ id: matchIdInTotal })
      if (match.teams) {
        for (const team of match.teams) {
          const teams = match.teams
          const teamId = teams.indexOf(team)
          const matchID = matchIdInTotal
          console.log(matchID)
          if (team !== undefined) {
            const players = team.players
            for (const key in players) {
              // console.log(matchesUpdated)
              // console.log(matchIdInTotal)
              matchesUpdated[matchIdInTotal].teams[teamId].players[key].id = key
              // matchesUpdated[matchID].teams[teamId].players[key].tel = null
              // matchesUpdated[matchID].teams[teamId].players[key].email = null
              firebaseDB.ref('matches/matchesData/' + matchIdInTotal + '/' + 'teams/' + teamId + '/' + 'players').child(key).update({ id: key })
            }
          }
        }
      }
    }
    commit('getMatches', { matchesUpdated })
  })
}
export const globalBtnsDisable = ({ commit }) => {
  commit('globalBtnsDisable')
}
// export const subscribeTelBtnDisable = ({ commit }) => {
//   commit('subscribeTelBtnDisable')
// }
// export const sendMail = ({ commit }, payload) => {
//   let adress = payload.matchData.adress.replace(/[^а-яА-Я0-9]|_/g, '')
//   firebaseDB.ref('emails/' + payload.matchData.sport + '/' + payload.matchData.city + '/' + adress + '/').push(payload.email)
// }
export const subscribeTel = ({ commit }, payload) => {
  if (payload.viber === true) {
    firebaseDB.ref('telephones/' + payload.sport + '/' + payload.city + '/' + payload.tel).push('viber')
  }
  if (payload.telegram === true) {
    firebaseDB.ref('telephones/' + payload.sport + '/' + payload.city + '/' + payload.tel).push('telegram')
  }
  if (payload.whatsapp === true) {
    firebaseDB.ref('telephones/' + payload.sport + '/' + payload.city + '/' + payload.tel).push('whatsapp')
  }
  if (payload.sms === true) {
    firebaseDB.ref('telephones/' + payload.sport + '/' + payload.city + '/' + payload.tel).push('sms')
  }
  if (payload.sms === false && payload.whatsapp === false && payload.telegram === false && payload.viber === false) {
    firebaseDB.ref('telephones/' + payload.sport + '/' + payload.city + '/' + payload.tel).push('none')
  }
}
export const subscribeEmail = ({ commit }, payload) => {
  firebaseDB.ref('emails/' + payload.sport + '/' + payload.city + '/').push(payload.email)
}
export const sendMatch = ({ commit }, payload) => {
  firebaseDB.ref('findPlayer/' + payload.tel + '/').push(payload.matchData)
}
export const sendComment = ({ commit }, payload) => {
  const date = new Date()
  firebaseDB.ref('comments/' + date + '/').push(payload)
}
export const deletePlayer = ({ commit, state }, payload) => {
  const matches = state.matches.matchesUpdated
  const match = matches.find((match) => {
    return match.id === payload.matchID
  })
  const players = Object.values(match.teams[payload.team].players)
  const player = players.find((player) => {
    return player.randomID === payload.myRandom
  })
  if (player) {
    firebaseDB.ref('matches/matchesData/' + payload.matchID + '/' + 'teams/' + payload.team + '/' + 'players/' + player.id).remove()
  }
  commit('deletePlayer', {
    playerData: payload,
    playerID: player.id
  })
}
export const registerPlayer = ({ commit }, payload) => {
  // const newPlayerState = {
  //   name: payload.newPlayer.name,
  //   profi: payload.newPlayer.profi,
  //   age: payload.newPlayer.age,
  //   randomID: payload.newPlayer.random
  // }
  const newPlayerConf = {
    name: payload.newPlayer.name,
    tel: payload.newPlayer.tel,
    email: payload.newPlayer.email,
    profi: payload.newPlayer.profi,
    age: payload.newPlayer.age,
    randomID: payload.newPlayer.random
  }
  const adress = payload.match.adress.replace(/[^а-яА-Я0-9]|_/g, '')
  const date = payload.match.date.replace(/[^\w]|_/g, '')
  const time = payload.match.time.replace(/[^\w\s]|_/g, '')
  // должен быть newPlayerState вместо newPlayerConf в строке ниже
  firebaseDB.ref('matches/matchesData/' + payload.matchIndex + '/' + 'teams/' + payload.teamIndex + '/' + 'players/').push(newPlayerConf)
  firebaseDB.ref('playerData/' + payload.match.sport + '/' + payload.match.city + '/' + adress + '/' + date + '/' + time + '/' + 'teams/' + payload.teamIndex + '/' + 'players/').push(newPlayerConf)
    .then(() => {
      commit('registerPlayer', payload)
    })
    .catch(error => {
      console.log(error)
    })
}
