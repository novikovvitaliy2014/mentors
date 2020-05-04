
export const getVolunteers = (state, payload) => {
  state.volunteers = payload
}
export const getReceivers = (state, payload) => {
  state.receivers = payload
}
export const deletePlayer = (state, payload) => {
  const matchID = payload.playerData.matchID
  delete state.matches.matchesUpdated[matchID].teams[payload.playerData.team].players[payload.playerID]
}
export const registerVolunteer = (state, payload) => {
  state.newVolunteer = payload
}
export const registerReceiver = (state, payload) => {
  state.newReceiver = payload
}
export const chosenReceiverTel = (state, payload) => {
  state.chosenReceiverTel = payload
}
export const chosenVolunteerTel = (state, payload) => {
  state.chosenVolunteerTel = payload
}
export const testReceiverTel = (state, payload) => {
  state.newVol = payload.chosenVolunteerTel
}
