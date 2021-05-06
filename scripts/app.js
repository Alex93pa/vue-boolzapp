const app = new Vue({
    el: "#app",
    data: {
        usersList : globalUsersList,
        activeUser : 0,
        searchText : "",
        newMessageText : "",
        // filteredData : []
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
            this.activeUser = user;
        },
        // onInput() {
        //     console.log("input");
        //     this.filteredData = this.usersList.filter
        // },
        formatTime(stringDate) {
            return moment(stringDate, "DD/MM/YYYY HH:mm:ss").format("HH:mm:ss")
        },
        sendMessage() {
            const newMessage = {
                date: moment().format("DD/MM/YYY HH:mm:ss"),
                text: this.newMessageText,
                status: 'sent'
            };
            this.activeUser.messages.push(newMessage);
            this.newMessageText = "";
        

            setTimeout(() => {
                const newRespMessage = {
                    date: moment().format("DD/MM/YYY HH:mm:ss"),
                    text: "Ok da " + this.activeUser.name,
                    status: 'received'
                }
                this.activeUser.messages.push(newRespMessage)
                this.scrollToBottom()
            }, 1000);
        },
        scrollToBottom() {
            const htmlElement = this.$refs.chatContainerToScroll

            htmlElement.scrollTop = htmlElement.scrollHeight
            }
        }
    },

    computed: {
        activeUserLastAccess() {
            if (!this.activeUser.messages) {
                return "";
            }
            const receivedMsgs = this.activeUser.messages.filter(msg => msg.status === 'received');
            const lastMsgDate = receivedMsgs[receivedMsgs.lenght - 1].date;
            return this.formatTime(lastMsgDate);
        },
        filderedUsersList() {

            return this.usersList.filter((element) => {
                // return element.name.toLowerCase().includes(this.searchText.toLowerCase());
                return element.name.toLowerCase().startsWith(this.searchText.toLowerCase());

            })
        }
    }
})