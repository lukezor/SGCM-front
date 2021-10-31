import $store from '~/store/userData'
import notification from '~/utils/notification.js'

function redirectToHome() {
    notification.sendNotification('Você não tem permissão para acessar essa página!', 'is-danger', 7000)
    $nuxt.$router.push({path: '/'});
}

export default async function ({ store, redirect }) {
    const userType = $store.state.user.user_type

    if (userType != 'MEDICO') {
        redirectToHome()
    }
}