const { createApp } = Vue

createApp({
    data() {
        return {
            events: [],
            event: '',
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(amazingData => {
                this.events = amazingData.events
                this.event = this.events.find(event => event._id == this.eventId)

            })
            .catch(error => console.log(error))
    }
}).mount('#app')
