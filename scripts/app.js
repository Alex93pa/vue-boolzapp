const app = new Vue({
    el: "#app",
    data: {
        userList = globalUsersList,
        activeUser = null
    },
    methods: {
        selectContact(index){
            this.contactUser = index;
        }
    },
    mounted(){
        const now = dayjs();
        this.formaattedDate = now.format("DD/MM/YYYY HH:mm:ss");
    },
})