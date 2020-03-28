
export const getMatches = (state, payload) => {
  state.matches = payload
}
export const globalBtnsDisable = (state) => {
  state.globalBtns = false
}
// export const subscribeTelBtnDisable = (state) => {
//   state.subscribeBtnTel = false
// }
export const deletePlayer = (state, payload) => {
  const matchID = payload.playerData.matchID
  delete state.matches.matchesUpdated[matchID].teams[payload.playerData.team].players[payload.playerID]
  // let updatedPlayers = state.matches
  // const match = state.matches.find((project) => {
  //   return match.id === payload.matchID
  // })
  // const player = match.teams.payload.team.players.find((project) => {
  //   return player.tel === payload.myTel
  // })
}
export const registerPlayer = (state, payload) => {
  state.newPlayer = payload.newPlayer
  console.log(payload.newPlayer)
}
