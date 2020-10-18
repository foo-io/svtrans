Vue.component('v-select', VueSelect.VueSelect);

const calculator = new Vue({
    el: '#calc',
    data: {
        shipping: {
            labels: {
                weight: 'Вес',
                length: 'Длина',
                width: 'Ширина',
                height: 'Высота'
            },
            units: {
                weight: {
                    decimal: '.',
                    thousands: ' ',
                    prefix: '',
                    suffix: ' кг.',
                    precision: 0,
                    masked: false
                },
                length: {
                    decimal: '.',
                    thousands: ' ',
                    prefix: '',
                    suffix: ' см.',
                    precision: 0,
                    masked: false
                },
                width: {
                    decimal: '.',
                    thousands: ' ',
                    prefix: '',
                    suffix: ' см.',
                    precision: 0,
                    masked: false
                },
                height: {
                    decimal: '.',
                    thousands: ' ',
                    prefix: '',
                    suffix: ' см.',
                    precision: 0,
                    masked: false
                }
            }
        },
        shippingElements: [
            {
                id: Math.random(),
                weight: '',
                length: '',
                width: '',
                height: ''
            }
        ],
        calculatorInsurance: false,
        calculatorInsuranceValue: '',
        calculatorDelivery: false,
        calculatorDeliveryValue: '',
        calculatorDeliveryWeightValue: '',
        calculatorDeliveryVolumeValue: '',
        calculatorResult: 'Выберите данные',
        calculatorDate: 'Даты',
        calculatorFrom: '',
        calculatorWhere: '',
        jsonData: [],
        jsonDataSrc: [],
        citiesFrom: [],
        citiesTo: [],
        selectedAirline: null,
        airlineAll: [
            {
                id: 1,
                name: 'Полярные авиалинии',
                code: 'POL',
                image: '../img/calculator/1.png',
                status: 'disabled'
            },
            {
                id: 2,
                name: 'Якутия',
                code: 'YAK',
                image: '../img/calculator/2.png',
                status: 'disabled'
            },
            {
                id: 3,
                name: 'Аэрофлот',
                code: 'AER',
                image: '../img/calculator/3.png',
                status: 'disabled'
            },
            {
                id: 4,
                name: 'Сибирь',
                code: 'SIB',
                image: '../img/calculator/4.png',
                status: 'disabled'
            },
            {
                id: 5,
                name: 'Сибирь',
                code: 'SIB',
                image: '../img/calculator/4.png',
                status: 'disabled'
            }
        ],
        availAirline: [],
        activeAirlines: [],
        currentPrice: null
    },
    methods: {
        addShippingElement: function ()
        {
            this.shippingElements.push({
                id: Math.random(),
                weight: '',
                length: '',
                width: '',
                height: ''
            })
        },
        delShippingElement: function (index)
        {
            this.shippingElements.splice(index, 1);
        },
        getAvailibleAirlines: function (arr)
        {
            this.activeAirlines = this.airlineAll.forEach(item => {
                item.status = 'disabled';

                arr.filter(s => {

                    if (s.indexOf(item.code) === 0)
                    {
                        item.status = 'active';

                    }
                })
            });
        },
        changeSelectedCities: function ()
        {
            let strCityFrom = this.calculatorFrom;
            let strCityWhere = this.calculatorWhere;
            let citiesTo = [];
            let availAirlineArray = [];

            let parseJsonFrom = this.jsonDataSrc.filter(items => items['cityFrom'] == strCityFrom);

            this.jsonData = parseJsonFrom;

            for (let i in parseJsonFrom)
            {
                let cityTo = parseJsonFrom[i]['cityTo'];
                citiesTo.push(cityTo);
                this.citiesTo = citiesTo.filter((item, index) => citiesTo.indexOf(item) === index)
            }

            let parseJsonTo = this.jsonData.filter(items => items['cityTo'] == strCityWhere);

            this.jsonData = parseJsonTo;

            for (let i in parseJsonTo)
            {
                let airline = parseJsonTo[i]['airline'];
                availAirlineArray.push(airline);
                this.getAvailibleAirlines(availAirlineArray);
                this.activeAirlines = availAirlineArray;
            }
        },
        getActiveAirlines: function ()
        {
            return this.activeAirlines;
        },
        getCurrentPrice: function ()
        {
            let currentJson = this.jsonData;
            let currentAirline = this.selectedAirline;
            let currentFrom = this.calculatorFrom;
            let currentWhere = this.calculatorWhere;
            let parseJsonPrice;

            if (currentAirline != null & currentFrom != null && currentWhere != null)
            {
                parseJsonPrice = currentJson[0]['value']
                parseJsonDate = currentJson[0]['days']
            }

            this.currentPrice = parseJsonPrice;
            this.calculatorDate = parseJsonDate;
        },
        changeAirlines: function ()
        {
            let currentJson = this.jsonData;

            let currentAirline = this.selectedAirline;
            // let currentFrom = (this.calculatorFrom != null) ? this.calculatorFrom : null;
            // let currentWhere = (this.calculatorWhere != null) ? this.calculatorWhere : null;

            let parseJsonAirs = currentJson.filter(items => {
                return items['airline'] == currentAirline;
            });

            if (parseJsonAirs.length == 0)
            {
                currentJson = this.jsonDataSrc;

                parseJsonAirs = currentJson.filter(items => {
                    return items['airline'] == currentAirline;
                });
            }
            this.jsonData = parseJsonAirs;
        },
        calculation: function ()
        {
            let cKG = this.shippingElements[0].weight;
            let cL = this.shippingElements[0].length / 100;
            let cW = this.shippingElements[0].width / 100;
            let cH = this.shippingElements[0].height / 100;
            let cT = this.currentPrice;
            let min = this.getMinWeight(); // НАДО ДОБАВИТЬ ПАРАМЕТР
            let gan = 1300; // налог?

            let getVKO = () => cL*cW*cH*167;
            let getRV = () => {
                let maxArr = [getVKO(), cKG, min];

                return Math.max(...maxArr);
            }
            let getOS = () => getRV()*cT+gan;

            this.calculatorResult = getOS().toFixed(2);
            // console.log(cT);
        },
        getMinWeight: function ()
        {
            let min = 10;

            if ( this.currentAirline == 'YAK' )
                min = 10;
            else if ( this.currentAirline == 'POL' )
                min = 20;
            else if ( this.currentAirline == 'AER' )
                min = 20;

            return min;
        }
    },
    watch: {
        calculatorInsuranceValue: function ()
        {
            if (this.calculatorInsuranceValue > 0)
            {
                this.calculatorInsurance = true;
            }
            else
            {
                this.calculatorInsurance = false;
            }
        },
        calculatorDeliveryVolumeValue: function ()
        {
            if (this.calculatorDeliveryWeightValue > 0 && this.calculatorDeliveryVolumeValue > 0)
            {
                this.calculatorDelivery = true;
            }
            else
            {
                this.calculatorDelivery = false;
            }
        },
        calculatorDeliveryWeightValue: function ()
        {
            if (this.calculatorDeliveryWeightValue > 0 && this.calculatorDeliveryVolumeValue > 0)
            {
                this.calculatorDelivery = true;
            }
            else
            {
                this.calculatorDelivery = false;
            }
        },
        calculatorFrom: function ()
        {
            this.jsonData = this.jsonDataSrc;
            this.selectedAirline = null;
            this.changeSelectedCities();

        },
        calculatorWhere: function ()
        {
            this.jsonData = this.jsonDataSrc;
            this.selectedAirline = null;
            this.changeSelectedCities();
        },
        availAirline: function (arr)
        {
            this.activeAirlines = this.getAvailibleAirlines(arr);
        },
        activeAirlines: function ()
        {
            let arr = this.activeAirlines;
            if (arr != null && arr.length == 1)
            {
                this.selectedAirline = arr[0];
            }
        },
        selectedAirline: function ()
        {
            this.changeAirlines();
            this.getCurrentPrice();
            this.calculation();
        },
        calculatorResult: function ()
        {
            if (this.calculatorResult == null)
            {
                this.calculatorResult = 'Выберите данные';
                this.calculatorDate = 'Даты';
            }
        },
        shippingElements: {
            deep: true,
            handler: function (after) {
                this.calculation();
            }
        }
    },
    mounted: function() {
        fetch('/data/data.json')
            .then(res => {
                if (res.ok)
                {
                    res.json().then(json => {
                        let citiesFrom = [];
                        let citiesTo = [];
                        let availAirlineArray = [];

                        this.jsonData = this.jsonDataSrc = json;

                        for (let i in json)
                        {
                            let cityFrom = json[i]['cityFrom'];
                            let cityTo = json[i]['cityTo'];
                            let airline = json[i]['airline'];

                            citiesFrom.push(cityFrom);
                            citiesTo.push(cityTo);
                            availAirlineArray.push(airline);

                            this.citiesFrom = citiesFrom.filter((item, index) => citiesFrom.indexOf(item) === index)
                            this.citiesTo = citiesTo.filter((item, index) => citiesTo.indexOf(item) === index)
                            this.availAirline = availAirlineArray.filter((item, index) => availAirlineArray.indexOf(item) === index)
                        }
                        this.activeAirlines = this.availAirline;
                    })
                }
            })
            .catch(err => console.log(err));

        // console.log(this.citiesFrom);
    },
});
