import  store from  'store'
const USERKY = 'userky'
export  default {

    setUser(user){
        store.set(USERKY,user)
    },
    getUser(){
       return  store.get(USERKY) || {}
    },
    RemoveUser(){
        store.remove(USERKY)
    }
}