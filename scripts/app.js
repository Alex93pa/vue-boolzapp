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
        
        // onInput() {
        //     console.log("input");
        //     this.filteredData = this.usersList.filter
        // },
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
                    text: "Ok da " + this.usersList[this.activeUser].name,
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
                // return element.name.toLowerCase().includes(this.searchText.toLowerCase());
                return element.name.toLowerCase().startsWith(this.searchText.toLowerCase());

            })
        }
    }
})