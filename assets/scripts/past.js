const { createApp } = Vue

createApp({
    data() {
        return {
            events: [],
            category: [],
            filter: [],
            inputSearch: '',
            categoryCheck: [],
            inputChecked: [],
            pastEvents: [],
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(amazingData => {
                this.events = amazingData.events
                this.currentDate = amazingData.currentDate
                this.pastEvents = this.events.filter(event => event.date < this.currentDate)
                this.category = [... new Set(this.events.map(events => events.category))]
            })
            .catch(error => console.log(error))
    },
    computed: {
        crossFilter() {
            this.filter = this.pastEvents.filter(event => {
                return event.name.toLowerCase().includes(this.inputSearch.toLowerCase()) && (this.categoryCheck.includes(event.category) || this.categoryCheck.length == 0)
            })
        }
    }
}).mount('#app')
