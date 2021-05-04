const app = new Vue({
    el: "#app",
    data: {
        userList = globalUsersList,
        activeUser = null
    },
    methods: {
        onUserClick(onClickUser){
            this.activeUser = clickedUser
        }
    },
    mounted(){
        const now = dayjs();
        this.formaattedDate = now.format("DD/MM/YYYY HH:mm:ss");
    },
})