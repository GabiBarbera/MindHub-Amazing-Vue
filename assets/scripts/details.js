const { createApp } = Vue

createApp({
    data() {
        return {
            events: [],
            event: '',
            parameter: [],
            parameters: [],
            idparameters: [],
            objectEvents: null,
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(amazingData => {
                this.events = amazingData.events
                this.parameter = location.search
                this.parameters = new URLSearchParams(this.parameter)
                this.idparameters = this.parameters.get("parameter")
                this.objectEvents = this.events.find(idcards => idcards._id == this.idparameters)
                console.log(this.objectEvents);
            })
            .catch(error => console.log(error))
    }
}).mount('#app')
