<template>
    <div class="wrapper">
    <div class="header">
        <b-navbar type="light" variant="light">
            <b-navbar-nav style="align-items: center">
                <b-nav-item href="#">Home</b-nav-item>
                    <b-nav-form>
                        <b-form-input class="mr-sm-2" placeholder="Search Astroids" v-model="searchText" ></b-form-input>
                    </b-nav-form>
                <b-nav-item>
                    <date-range-picker
                            ref="picker"
                            :opens="center"
                            :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY' }"
                            :singleDatePicker="range"
                            :timePicker= false
                            :showWeekNumbers= false
                            :showDropdowns= false
                            :autoApply= true
                            v-model="dateRange"
                            @update="updateValues"
                            @toggle="checkOpen"
                            :linkedCalendars= false
                            :dateFormat="dateFormat"
                    >
                        <template v-slot:input="picker" style="min-width: 350px;">
                            {{ picker.startDate | date }} - {{ picker.endDate | date }}
                        </template>
                    </date-range-picker>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
    <div class="container">
        <div class="main-container">
            <div class="row">
                <div class="col-md-12">
                    <div class="asteroid-container" v-for="asteroid in itemsSearched" :key="asteroid.id">
                        <div class="asteroid-icon">
                            <b-icon icon="globe" aria-hidden="true"></b-icon>
                        </div>
                        <div class="asteroid-info" >
                            <div class="info-container">
                                <div class="name">
                                    Name:{{asteroid.name}}
                                </div>
                                <div class="">
                                    İs hazardous: {{asteroid.is_potentially_hazardous_asteroid}}
                                </div>
                            </div>
                            <div class="fav-container">
                                <b-icon icon="heart"></b-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios';
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/'
const API_KEY = '?api_key=Xad160VwZRCd3j8W6YINnQ4TOqt7CxaTSlgapweu'

export default {
  name: 'main',
    components: { DateRangePicker },

  

  data() {
      return{
          asteroids_arr: [],
          searchText: '',
          dateRange: '',
          
      }
  },


created(){

    axios({
    url: BASE_URL + 'neo/browse' + API_KEY,
    }).then((res) => {
        this.asteroids_arr = res.data.near_earth_objects;
    });
    
},

methods: {

},

  computed : {
      itemsSearched : function(){
        var self = this;
        if( this.searchText == ''){
          return this.asteroids_arr;
        }
        return this.asteroids_arr.filter(function(item){
          return item.name.indexOf(self.searchText) >= 0;
        });
      }
  },

}
</script>