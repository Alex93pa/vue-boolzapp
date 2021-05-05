const app = new Vue({
    el: "#app",
    data: {
        usersList : globalUsersList,
        activeUser : 0,
        searchText : ""
    },
    methods: {
        selectContact(index){
            this.activeUser = index
        },
        getAvatarPath(userAvatar) {
            return `../imgs/avatar${userAvatar}.jpg`
        },
        chatOpen(){
            this.isChatOpen = true;
        },
        onUserClick(user) {
            this.selectedUser = user
        },
        onInput() {

        },
        formatTime(stringDate) {
            return moment(stringDate, "DD/MM/YYYY HH:mm:ss").format("HH:ss")
        }
    },

    computed: {
        selectedUserLastAccess() {
            if (!this.selectedUser.messages) {
                return "";
            }

            const receivedMsgs = this.selectedUser.messages.filter((msg) => msg.status === 'received');
            const lastMsgDate = receivedMsgs[receivedMsgs.lenght - 1].date;

            return this.formatTime(lastMsgDate);
        }
    }


})