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
                    <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    align="center"
                    start-placeholder="Start Date"
                    end-placeholder="End Date"
                    @change="filter_astreoids_by_date" >
                    </el-date-picker>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
    <div class="container">
        <div class="main-container">
            <div class="row">
                <div class="col-md-12" v-show="dateRange === '' ">
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
                <div class="col-md-12" v-show="dateRange !== '' " v-for="(asteroid, index) in DateRangeNEO" :key="index">
                    <div class="asteroid-header">
                            <h3>{{index}}</h3>
                    </div>
                    <div class="asteroid-container" >

                        <div class="asteroid-icon">
                            <b-icon icon="globe" aria-hidden="true"></b-icon>
                        </div>
                        <div class="asteroid-info">
                            <div class="info-container">
                                <div class="" v-for="data in asteroid" :key="data">
                                        {{data.name}}
                                </div>
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
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/'
const API_KEY = 'api_key=Xad160VwZRCd3j8W6YINnQ4TOqt7CxaTSlgapweu'

export default {
  name: 'main',
    components: {  },

  data() {
      return{
          asteroids_arr: [],
          searchText: '',
          dateRange: '',
          DateRangeNEO: [],
      }
  },


created(){

    axios({
    url: BASE_URL + 'neo/browse?' + API_KEY,
    }).then((res) => {
        this.asteroids_arr = res.data.near_earth_objects;
    });
    
},

methods: {
    filter_astreoids_by_date(){
        let formatted_start_date = this.format_dates(this.dateRange[0]);
        let formatted_end_date = this.format_dates(this.dateRange[1]);

        let req_url = BASE_URL + 'feed?start_date=' + formatted_start_date + '&end_date=' + formatted_end_date + '&detailed=false&' + API_KEY;
        axios.get(req_url)
                .then((response) => {
                this.DateRangeNEO = response.data.near_earth_objects;

            });

    },

    format_dates(date_input){
        let month = date_input.getMonth();
        let year = date_input.getFullYear();
        let day = date_input.getDate();

        if(day.toString().length == 1){
            day = '0' + day;
        }

        if(month.toString().length == 1){
            month = '0'+ month;
        }

        let formatted_date = year + '-' + month + '-' + day ;
        return formatted_date;
    },

    clear(){

    }

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