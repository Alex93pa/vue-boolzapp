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
        
        formatTime(stringDate) {
            return moment(stringDate, "DD/MM/YYYY HH:mm:ss").format("HH:mm")
        },
        sendMessage() {
            const newMessage = {
                date: moment().format("DD/MM/YYY HH:mm:ss"),
                text: this.newMessageText,
                status: 'sent'
            };
            this.usersList[this.activeUser].messages.push(newMessage);
            this.newMessageText = "";
        

            setTimeout(() => {
                const newRespMessage = {
                    date: moment().format("DD/MM/YYY HH:mm:ss"),
                    text: "Campioni del mondo! " + this.usersList[this.activeUser].name,
                    status: 'received'
                };
                this.usersList[this.activeUser].messages.push(newRespMessage)
                this.scrollToBottom()
            }, 1000);
        },
        scrollToBottom() {
            const htmlElement = this.$refs.chatContainerToScroll

            htmlElement.scrollTop = htmlElement.scrollHeight
        },
        onMsgClick(message, event) {
            this.$set(message, "showPopup", true);

            event.currentTarget.focus();
        },
        onFocusLost(message) {
            this.$set(message, "showPopup", false);
        },
        onPopupClick(message){
            message.showPopup = false;
        },
        onDeleteClick(msgIndex) {
            this.usersList[this.activeUser].messages.splice(msgIndex, 1)
        },
        getLastMsg(messages) {
            if (messages.length === 0 ) {
                return " chat vuota"
            }
            const lastMsg = messages[messages.length - 1 ];
            let trimmedMsg = lastMsg.text.slice(0, 20)
            const formattedDate = this.formatTime(lastMsg.date)

            if(lastMsg.text.length > 20) {
                trimmedMsg += "...";
            }
            return trimmedMsg + " - " + formattedDate
        },
        activeUserLastAccess() {
        
            if (this.usersList[this.activeUser].messages.length == 0) {
                return "";
            }
            
            const receivedMsgs = this.usersList[this.activeUser].messages.filter((msg) => msg.status === 'received');
            
            const lastMsgDate = receivedMsgs[receivedMsgs.length - 1].date;
            
            return this.formatTime(lastMsgDate);
            }
        
    },

    computed: {
       
        filderedUsersList() {

            return this.usersList.filter((element) => {
                return element.name.toLowerCase().startsWith(this.searchText.toLowerCase());

            })
        }
    }
})