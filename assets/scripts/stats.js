const { createApp } = Vue

createApp({
    data() {
        return {
            events: [],
            currentDate: "",
            pastEventCategory: [],
            upComingEventCategory: [],
            upComingEvents: [],
            pastEvents: [],
            percentage: [],
            revenues: "",
            percentageAssisstanceMajor: "",
            percentageAssisstanceMinor: "",
            percentageNameMinor: "",
            percentageNameMajor: "",
            nameMajorCapacity: "",
            majorCapacity: Number,
            pastCategory: [],
            upCategory: [],
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(amazingData => {
                this.events = amazingData.events
                this.currentDate = amazingData.currentDate
                this.upComingEvents = this.events.filter(event => event.date >= this.currentDate)
                this.pastEvents = this.events.filter(event => event.date < this.currentDate)
                const sortArray = Array.from(this.events).sort(function (a, b) {
                    return b.capacity - a.capacity
                })
                this.nameMajorCapacity = sortArray[0].name
                this.majorCapacity = sortArray[0].capacity.toLocaleString('de-DE')
                this.pastEvents.sort((a, b) => this.calculateHighPercentage(a.assistance, a.capacity) - this.calculateHighPercentage(b.assistance, b.capacity))
                this.percentageAssisstanceMajor = this.calculateHighPercentage(this.pastEvents[this.pastEvents.length - 1].assistance, this.pastEvents[this.pastEvents.length - 1].capacity).toFixed(2)
                this.percentageNameMajor = this.pastEvents[this.pastEvents.length - 1].name;
                this.percentageAssisstanceMinor = this.calculateHighPercentage(this.pastEvents[0].assistance, this.pastEvents[0].capacity)
                this.percentageNameMinor = this.pastEvents[0].name;
                this.pastCategory = [... new Set(this.pastEvents.map(event => event.category))]
                this.upCategory = [... new Set(this.upComingEvents.map(event => event.category))]
                this.upComingEventCategory = this.upCategory.map((categories) => {
                    let aux = {
                        category: categories
                    }
                    let categoryEvent = this.upComingEvents.filter(event => event.category == categories)
                    let revenue = categoryEvent.reduce((acc, act) => acc + (act.price * act.estimate), 0).toLocaleString('de-DE')
                    aux.revenue = revenue
                    let assistanceUp = categoryEvent.reduce((acc, act) => acc + (act.estimate / (act.capacity / 100)), 0) / categoryEvent.length
                    aux.assistanceUp = assistanceUp.toFixed()
                    return aux
                })
                this.pastEventCategory = this.pastCategory.map((categories) => {
                    let aux = {
                        category: categories
                    }
                    let categoryEvent = this.pastEvents.filter(event => event.category == categories)
                    let revenue = categoryEvent.reduce((acc, act) => acc + (act.price * act.assistance), 0).toLocaleString('de-DE')
                    aux.revenue = revenue
                    let assistancePast = categoryEvent.reduce((acc, act) => acc + (act.assistance / (act.capacity / 100)), 0) / categoryEvent.length
                    aux.assistancePast = assistancePast.toFixed()
                    return aux
                })

            })
            .catch(error => console.log(error))
    },
    methods: {
        calculateHighPercentage(assistance, capacity) {
            this.percentage = (assistance / capacity) * 100
            return this.percentage
        }
    }
}).mount('#app')
