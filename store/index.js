export const state = () => ({
    openMenu: false
})

export const mutations = {
    changeMenuState(state) {
        state.openMenu = !state.openMenu
    }
}   
