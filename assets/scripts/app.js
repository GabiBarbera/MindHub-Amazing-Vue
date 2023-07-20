const { createApp } = Vue

createApp({
    data() {
        return {
            events: [],
            category: [],
            filter: [],
            eventId: 0,
            inputSearch: '',
            categoryCheck: [],
            inputChecked: [],
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(amazingData => {
                this.events = amazingData.events
                this.category = [... new Set(this.events.map(events => events.category))]
                this.eventId = this.events._id
            })
            .catch(error => console.log(error))
    },
    computed: {
        crossFilter() {
            this.filter = this.events.filter(event => {
                return event.name.toLowerCase().includes(this.inputSearch.toLowerCase()) && (this.categoryCheck.includes(event.category) || this.categoryCheck.length == 0)
            })
        }
    }
}).mount('#app')

